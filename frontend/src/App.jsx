import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WodForm from "./components/WodForm";
import Home from "./components/Home";
import Wods from "./components/Wods";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wods"
            element={
              <ProtectedRoute>
                <Wods />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addWod"
            element={
              <ProtectedRoute>
                <WodForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <WodForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
