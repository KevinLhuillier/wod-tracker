import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-800 shadow-md">
      <div className="p-4 text-white text-2xl font-bold">
        <i className="fas fa-chart-line"></i> Wod Tracker
      </div>
      <ul className="mt-6">
        <li>
          <Link
            to={`/`}
            className="flex items-center text-white p-3 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-home w-6"></i>
            <span className="ml-2">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/wods`}
            className="flex items-center text-white p-3 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-dumbbell w-6"></i>
            <span className="ml-2">WODs</span>
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center text-white p-3 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-circle-check w-6"></i>
            <span className="ml-2">Goals</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center text-white p-3 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-trophy w-6"></i>
            <span className="ml-2">Skills</span>
          </a>
        </li>
        <li>
          <div className="flex items-center text-white p-3 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out">
            <i className="fas fa-sign-out-alt w-6"></i>
            <button className="ml-2" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
