import Menu from "./Menu";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchWods, deleteWod } from "../redux/wodSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wods = useSelector((state) => state.wods.wods);
  const status = useSelector((state) => state.wods.status);
  const error = useSelector((state) => state.wods.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWods());
    }
  }, [status, dispatch]);

  return (
    // Container principal
    <div className="flex flex-no-wrap">
      <Menu />
      {/* Contenu principal */}
      <div className="w-full h-full p-6 overflow-auto">
        <div className="flex items-center mb-6">
          <p className="mr-4 text-2xl font-semibold text-gray-800">
            Votre Suivi
          </p>
          <button
            className="bg-black p-2 rounded-full text-white transition-transform transform duration-100  hover:bg-white hover:text-black border-black border-2"
            onClick={() => navigate("/addWod")}
          >
            Add WOD
          </button>
        </div>
        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
            <div className="flex items-center">
              <div className="text-black">
                <i className="fa-solid fa-clock fa-2x"></i>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Skill to work
                </h2>
                <p className="text-gray-500">Handstand walk</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
            <div className="flex items-center">
              <div className="text-black">
                <i className="fa-solid fa-ranking-star fa-2x"></i>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  RX Index
                </h2>
                <p className="text-gray-500">56 %</p>
              </div>
            </div>
          </div>

          <div className="flex  justify-between bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
            <div className="flex items-center">
              <div className="text-black">
                <i className="fa-solid fa-gauge-simple-high fa-2x"></i>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Current Goal
                </h2>
                <p className="text-gray-500">450/1000 Burpees</p>
              </div>
            </div>
            <div className="text-right">
              <p>Start: 2024/07/01</p>
              <p className="text-red-400 font-bold">End: 2024/07/31</p>
            </div>
          </div>
        </div>
        {/* Wod History  */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-black font-bold">Workouts History</h2>
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p>{error}</p>}
          <ul>
            {wods.map((wod) => (
              <li key={wod.wodId} className="border-b-2 flex p-4">
                <h3 className="pr-2">{wod.typeWod}</h3>
                <div> - {wod.formatWod}</div>
                <Link
                  to={`/edit/${wod.wodId}`}
                  className="ml-4 hover:text-blue-500"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <button
                  className="ml-4 hover:text-red-500"
                  onClick={() => dispatch(deleteWod(wod.wodId))}
                >
                  <i className="fa-solid fa-circle-minus"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
