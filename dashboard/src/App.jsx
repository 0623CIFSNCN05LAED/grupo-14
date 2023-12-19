import './App.css'
import Dashboard from './components/Dashboard'
import {Link, Switch, Route} from "react-router-dom"


function App() {

  return (
    <>
      <Link to="/dashboard" exact="true">Dashboard</Link>
      <Switch>
      <Route path="/dashboard"  />

      </Switch>

      <Dashboard />
    </>
  );
}

export default App
