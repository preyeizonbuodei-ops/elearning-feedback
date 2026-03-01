import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import '../Pages/comment.css'

function Comment() {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const location = useLocation();

  // Get username passed from Register page via navigate state
  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send comment to backend
      const response = await axios.post("http://localhost:4000/api/auth/comment", {
        username,
        comment,
      });

      if (response.status === 200) {
        alert("Comment submitted successfully!");
        setComment(""); // clear text box
      } else {
        alert(response.data.message || "Failed to submit comment");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-indigo-900 to-black px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Hello {username ? username : "User"} 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Your Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your feedback here..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
