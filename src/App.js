import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import Chat from "./pages/Chat.jsx";
import FindTutor from "./pages/FindTutor.jsx";
import NotFound from "./pages/NotFound";
import TutorDashboard from "./pages/TutorDashboard";
import { AuthContext } from './contexts/AuthContext';


function App() {

  const {state} = React.useContext(AuthContext);

  return (
      <div className="App">
        <Router>
          {!state.isAuthenticated ? (
            <Routes>
              <Route path="/" element={
                <Dashboard/>
              } />
              <Route path="/register" element={
                // TODO(Raka): Change the Dashboard Page to Register Page
                <Dashboard />
              } />
              <Route path="/login" element={
                // TODO(Azka): Change the Dashboard Page to Login Page
                <Dashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          ) : (
              <Routes>
                <Route path="/" element={
                  <Sidebar>
                    <FindTutor />
                  </Sidebar>} />
                <Route
                  path="/chat" element={
                    <Sidebar>
                      <Chat />
                    </Sidebar>} />
                <Route path="/tutor" element={
                  !state.isTutor ?
                  // TODO(Azka): Change the Dashboard Page to Registrate as Tutor Page
                    <Dashboard /> :
                    <Sidebar>
                      <TutorDashboard />
                    </Sidebar>
                } /> :
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
        </Router>
      </div>
  );
}

export default App;
