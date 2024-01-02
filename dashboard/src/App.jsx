import "./App.css";
import {
  Routes,
  Route,
} from "react-router-dom"; /* usamos Routes en vez de Switch por la version del dom */
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Products from "./views/Products";
import Categories from "./views/Categories";
import Users from "./views/Users";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/products"
          element={<Products />}
        />
        <Route
          path="/categories"
          element={<Categories />}
        />
        <Route
          path="/users"
          element={<Users />}
        />
      </Routes>
    </>
  );
}

export default App;
