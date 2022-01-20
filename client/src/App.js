import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Details from './components/Details';
import BreedCreate from './components/BreedCreate';
import Jake from './components/Jake';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}></Route>
          <Route exact path='/home' component={Home}></Route>
          <Route path='/home/:id' component={Details} />
          <Route path='/breed' component={BreedCreate} />
          <Route path='/Jake' component={Jake} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
