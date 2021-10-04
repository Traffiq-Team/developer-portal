import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import AuthRoute from '../components/AuthRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <AuthRoute path="/dashboard/:appName" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
