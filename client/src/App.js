import { Route, Switch } from 'react-router-dom';
import Auth from './pages/Auth/Auth.page';
import Home from './pages/Home/Home.page';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.component"

import './App.css';

function App() {

  return (
      <>
        <Switch>
          <Route exact path="/register" component={Auth} />
          <Route exact path="/signin" component={Auth} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </>
  );
}

export default App;
