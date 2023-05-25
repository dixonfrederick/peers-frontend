import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const getTutor = async (token, callback) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/tutor_form/tutor/data`,
    {
      headers: {
        Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
      },
    }
  );
  callback(response.data?.tutor);
};
export const getCurrentUser = async (callback) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token")
          )}`,
        },
      }
    );
    callback(response.data.user);
  } catch (err) {
    console.error(err);
  }
};

export function dateFormat(datetime) {
  let date = new Date(datetime);
  let day = date.getUTCDate();
  let month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1;
  let year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function timeFormat(datetime) {
  let date = new Date(datetime);
  return date.toLocaleTimeString();
}

export function toTimestamp(datetime) {
  let date = new Date(datetime);
  return dayjs(date).format("ddd, MMM D, YYYY hh:m A")
}

export function currencyFormat(num) {
  return (
    "Rp" + String(num).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  );
}

export function showSuccessToast(msg) {
  toast.success(msg || "Success!", {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

export function showErrorToast(msg) {
  toast.error(msg || "Something went wrong. Try again later!", {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}


export const getTutorIncome = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/booking/tutor-income`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token")
          )}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return {};
  }
}
