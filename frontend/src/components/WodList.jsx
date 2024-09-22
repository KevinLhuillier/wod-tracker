import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchWods, deleteWod } from "../redux/wodSlice";
import DownloadButton from "./DownloadButton";

const WodList = () => {
  // const [wods, setWods] = useState([]);
  const dispatch = useDispatch();
  const wods = useSelector((state) => state.wods.wods);
  const status = useSelector((state) => state.wods.status);
  const error = useSelector((state) => state.wods.error);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/wods")
  //     .then((response) => setWods(response.data))
  //     .catch((error) => console.error(error));
  // }, []);

  // const deleteWod = (id) => {
  //   axios
  //     .delete(`http://localhost:8080/api/wods/${id}`)
  //     .then(() => setWods(wods.filter((wod) => wod.id !== id)))
  //     .catch((error) => console.error(error));
  // };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWods());
    }
  }, [status, dispatch]);

  return (
    <div className="container">
      <h1 className="center-align">WODs</h1>
      <div className="row">
        <Link
          to="/add"
          className="btn-floating btn-large waves-effect waves-light red"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>{error}</p>}
      <ul className="collection">
        {wods.map((wod) => (
          <li key={wod.id} className="collection-item">
            <div>
              {wod.name} ({wod.type}) - {wod.description}
              <Link
                to={`/edit/${wod.id}`}
                // className="secondary-content btn-flat"
                className="secondary-content btn waves-effect waves-light"
              >
                <i className="material-icons">edit</i>
              </Link>
              <button
                // className="secondary-content btn-flat"
                className="secondary-content btn waves-effect waves-light"
                // onClick={() => deleteWod(wod.id)}
                onClick={() => dispatch(deleteWod(wod.id))}
              >
                <i className="material-icons">delete</i>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <DownloadButton/>
    </div>
  );
};

export default WodList;
