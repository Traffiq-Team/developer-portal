import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthRoute from '../components/AuthRoute';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Configuration from '../pages/Configuration';
import CreateApp from '../pages/CreateApp';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home/login" />
        </Route>
        <Route exact path="/home/:formType" component={Home} />
        <AuthRoute exact path="/dashboard" component={Dashboard} />
        <AuthRoute exact path="/app/:appName" component={Configuration} />
        <AuthRoute exact path="/create" component={CreateApp} />
      </Switch>
    </Router>
  );
}

export default App;
