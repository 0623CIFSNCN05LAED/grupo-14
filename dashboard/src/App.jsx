import "./App.css";
import { Link, Routes, Route } from "react-router-dom"; /* usamos Routes en vez de Switch por la version del dom */
import Dashboard from "./components/Dashboard";
import Home from "./views/Home";

function App() {
  return (
    <>
      <Link to="/" exact="true">Home</Link>
      <Link to="/dashboard">Dashboard</Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* usamos element en vez de component por la version del dom */}
      </Routes>
    </>
  );
}

export default App;
