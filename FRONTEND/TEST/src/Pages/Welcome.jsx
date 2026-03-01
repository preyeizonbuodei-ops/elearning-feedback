import '../Pages/welcome.css'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate();

  const handleRoute = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-indigo-900 to-black px-6">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">
        Welcome 👋
      </h1>
      <p className="text-gray-300 text-base md:text-lg max-w-xl text-center mb-6">
        This is from the E-learning Feedback team. Please click the Register button 
        to create an account with us and leave a comment on what you think. 
        It means a lot to us 🙏
      </p>
      <button
        onClick={() => handleRoute('/register')}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
      >
        Register
      </button>
    </div>
  );
}

export default HomePage;
