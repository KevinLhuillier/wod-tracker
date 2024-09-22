import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 shadow-md">
      <div className="p-4 text-white text-2xl font-bold">
        <i className="fas fa-chart-line"></i> Wod Tracker
      </div>
      <ul className="mt-6">
        <li className="mb-4">
          <Link
            to={`/`}
            className="flex items-center text-white p-3 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-home w-6"></i>
            <span className="ml-2">Home</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to={`/wods`}
            className="flex items-center text-white p-3 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-dumbbell w-6"></i>
            <span className="ml-2">WODs</span>
          </Link>
        </li>
        <li className="mb-4">
          <a
            href="#"
            className="flex items-center text-white p-3 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-circle-check w-6"></i>
            <span className="ml-2">Goals</span>
          </a>
        </li>
        <li className="mb-4">
          <a
            href="#"
            className="flex items-center text-white p-3 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-trophy w-6"></i>
            <span className="ml-2">Skills</span>
          </a>
        </li>
        <li className="mb-4">
          <a
            href="#"
            className="flex items-center text-white p-3 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-sign-out-alt w-6"></i>
            <span className="ml-2">Log out</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
