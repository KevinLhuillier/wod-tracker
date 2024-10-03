import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWod, updateWod } from "../redux/wodSlice";

const WodForm = () => {
  // const [name, setName] = useState("");
  // const [type, setType] = useState("AMRAP");
  // const [description, setDescription] = useState("");
  // const navigateTo = useNavigate();
  // const { id } = useParams();

  const [name, setName] = useState("");
  const [type, setType] = useState("AMRAP");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { id } = useParams();
  const wods = useSelector((state) => state.wods.wods);

  // useEffect(() => {
  //   if (id) {
  //     axios
  //       .get(`http://localhost:8080/api/wods/${id}`)
  //       .then((response) => {
  //         setName(response.data.name);
  //         setType(response.data.type);
  //         setDescription(response.data.description);
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // }, [id]);

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchWods());
  //   }
  // }, [status, dispatch]);

  useEffect(() => {
    if (id) {
      const wod = wods.find((w) => w.id == id);
      if (wod) {
        setName(wod.name);
        setType(wod.type);
        setDescription(wod.description);
      }
    }
  }, [id, wods]);

  // const saveWod = (event) => {
  //   event.preventDefault();
  //   const wod = { name, type, description };

  //   if (id) {
  //     axios
  //       .put(`http://localhost:8080/api/wods/${id}`, wod)
  //       .then(() => navigateTo("/"))
  //       .catch((error) => console.error(error));
  //   } else {
  //     axios
  //       .post("http://localhost:8080/api/wods", wod)
  //       .then(() => navigateTo("/"))
  //       .catch((error) => console.error(error));
  //   }
  // };

  const saveWod = (event) => {
    event.preventDefault();
    const wod = { id, name, type, description };

    if (id) {
      dispatch(updateWod(wod)).then(() => navigateTo("/"));
    } else {
      dispatch(addWod(wod)).then(() => navigateTo("/"));
    }
  };

  return (
    <div className="container">
      <h1 className="center-align">{id ? "Edit" : "Add"} WOD</h1>
      <form onSubmit={saveWod}>
        <div className="input-field">
          <label className="active">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          {/* <label>Type</label> */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="browser-default"
            required
          >
            <option value="AMRAP">AMRAP</option>
            <option value="EMOM">EMOM</option>
            <option value="FOR_TIME">For Time</option>
          </select>
        </div>
        <div className="input-field">
          <label className="active">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="materialize-textarea"
            required
            data-length="5000"
          />
        </div>
        <button type="submit" className="btn waves-effect waves-light">
          Save
        </button>
      </form>
    </div>
  );
};

export default WodForm;
