import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Comment() {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("Guest");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const location = useLocation();
  const navigate = useNavigate(); // ✅ correct usage

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setMessage("Comment cannot be empty");
      setMessageType("error");
      return;
    }
    if (!username || username === "Guest") {
      setMessage("You must be logged in to comment");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post("https://elearning-feedback-backend.onrender.com/api/auth/comment", {
        username,
        comment,
      });

      if (response.status === 200) {
        setComment(""); // clear text box
        navigate("/thankyou"); // ✅ redirect to ThankYou page
      } else {
        setMessage(response.data.message || "Failed to submit comment");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.message || "Something went wrong");
      setMessageType("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-indigo-900 to-black px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md shadow-lg rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          Welcome, {username} 👋
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Drop your comment. What do you think about the E-Learning?
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your feedback here..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Comment;
