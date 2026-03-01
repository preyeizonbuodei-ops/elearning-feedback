import { useEffect, useState } from "react";

function Modal({ message, type, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      // Auto-close after 6 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // wait for fade-out animation
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message || !visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center animate-fadeIn">
        <h2 className="text-lg font-bold mb-4">
          {type === "success" ? "Success" : "Error"}
        </h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default Modal;
