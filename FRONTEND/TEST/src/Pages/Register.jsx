import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let newErrors = { ...errors };
    if (name === "username" && value.trim()) delete newErrors.username;
    if (name === "email" && /\S+@\S+\.\S+/.test(value)) delete newErrors.email;
    if (name === "password" && value) delete newErrors.password;
    setErrors(newErrors);
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post("https://elearning-feedback-backend.onrender.com/api/auth/signin", formData);

      if (response.status === 201) {
        setMessage("Registered successfully!");
        setMessageType("success");
        navigate("/comment", { state: { username: formData.username } });
      } else {
        setMessage(response.data.message || "Registration failed");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.message || "Registration failed");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-indigo-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          E-Learning Team
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-gray-200 font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white"
            />
            {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-200 font-medium mb-2">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-200 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register Me"}
          </button>
        </form>
      </div>

      {/* Modal dialog */}
      <Modal
        message={message}
        type={messageType}
        onClose={() => setMessage(null)}
      />
    </div>
  );
}

export default Register;
