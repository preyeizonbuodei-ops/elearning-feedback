import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // ✅ change "/" to whatever route you want
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-indigo-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-lg rounded-lg p-6 sm:p-8 text-center">
        <h1 className="text-3xl font-extrabold text-white mb-6">🎉 Thank You!</h1>
        <p className="text-gray-200">Your comment has been submitted successfully.</p>
        <p className="text-gray-400 mt-4">Redirecting in 5 seconds...</p>
      </div>
    </div>
  );
}

export default ThankYou;
