import { Route, Switch } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth/Auth.page';
import Home from './pages/Home/Home.page';

function App() {
  return (
      <>
        <Switch>
          <Route exact path="/register" component={Auth} />
          <Route exact path="/signin" component={Auth} />
          <Route exact path="/" component={Home} />
        </Switch>
      </>
  );
}

export default App;
