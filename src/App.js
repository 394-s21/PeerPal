import './App.css';
// import {firebase} from './firebase';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Signin from './components/Signin'; 
import Home from './components/Home'; 
function App() {
  return (
    <Router>
      <div className = "App">
        <Switch>
          <Route exact path = "/">
            <Signin/>
          </Route>
          <Route path="/home">
            <Home /> 
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
