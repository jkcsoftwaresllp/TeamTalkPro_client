import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import ChatPage from "./components/Chat/ChatPage"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" />} /> {/* default route */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/chat" element={<ChatPage />} />
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
