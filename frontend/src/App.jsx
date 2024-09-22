import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WodList from "./components/WodList";
import WodForm from "./components/WodForm";
import Home from "./components/Home";
import Wods from "./components/Wods";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/wods" element={<Wods />} />
          <Route path="/add" element={<WodForm />} />
          <Route path="/edit/:id" element={<WodForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
