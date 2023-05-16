import React, { useState, useEffect } from "react";
import "./Chat.css";
import { ChatSidebar, ChatBox } from "../../components/chat";
import { ChatContext } from "../../contexts/ChatContext";
import { ChatPartnerContext } from "../../contexts/ChatPartnerContext";
import {
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [back, setBack] = useState(true);

  const [chats, setChats] = useState([]);
  const { currentUser } = React.useContext(ChatContext);
  const { dispatch } = React.useContext(ChatPartnerContext);
  

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    const getContacts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/booking/booking-paid`,
          {
            headers: {
              authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          }
        );
        const book_list = response.data.booking_list;
        book_list.forEach(async (item) => {
          const combinedId =
            currentUser.uid > item.tutor_uid
              ? currentUser.uid + item.tutor_uid
              : item.tutor_uid + currentUser.uid;

          const learner_check = await getDoc(
            doc(db, "userChats", currentUser.uid)
          );
          if (!learner_check.exists()) {
            await setDoc(doc(db, "userChats", currentUser.uid), {});
          }

          const tutor_check = await getDoc(
            doc(db, "userChats", item.tutor_uid)
          );
          if (!tutor_check.exists()) {
            await setDoc(doc(db, "userChats", item.tutor_uid), {});
          }

          const res = await getDoc(doc(db, "chats", combinedId));

          if (!res.exists()) {
            //create a chat in chats collection
            await setDoc(doc(db, "chats", combinedId), { messages: [] });

            //create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
              [combinedId + ".userInfo"]: {
                latest_message: "",
                profile_pic: item.profile_pic,
                uid: item.tutor_uid,
                username: item.tutor_name,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", item.tutor_uid), {
              [combinedId + ".userInfo"]: {
                latest_message: "",
                profile_pic: currentUser.profile_picture,
                uid: currentUser.uid,
                username: currentUser.first_name + " " + currentUser.last_name,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    };

    getContacts();

    currentUser.uid && getChats();
  }, [
    currentUser.first_name,
    currentUser.last_name,
    currentUser.profile_picture,
    currentUser.uid,
  ]);

  const handleData = (chats) => {
    try {
      const sortedChat = Object.entries(chats)?.sort(
        (a, b) => b[1].date - a[1].date
      );
      const chatData = sortedChat.map((map) => map[1].userInfo);
      return chatData;
    } catch (error) {
      return [];
    }
  };

  const handleOnClickChat = (partner) => {
    dispatch({ type: "CHANGE_USER", payload: partner });
    setUser(partner);
    setOpen(true);
    setBack(false);
  };

  return (
    <div className="chat_container">
      <div className="wrapper">
        <ChatSidebar
          back={back}
          data={handleData(chats)}
          onClickChat={(e) => handleOnClickChat(e)}
        />
        <ChatBox
          back={back}
          open={open}
          data={user}
          onClickBack={() => setBack(true)}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default Chat;
