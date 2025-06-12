import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import pages or components
import ChatArea from "./components/Chat/ChatArea";
import Header from "./components/Chat/Header";

// Add Login, Register, or Dashboard components if available
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";





function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Home or default route */}
        <Route path="/" element={<ChatArea />} />

        {/* Define other routes like Login/Register if needed */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>

      {/* Global Toast Notification Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </Router>
  );
}

export default App;
