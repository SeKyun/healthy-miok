import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Firstpage from './Firstpage';
import Secondpage from './Secondpage';
import history from './history';
import NotWelcome from '../organisms/NotWelcome';
export default () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Firstpage} />
      <Route path="/secondpage" component={Secondpage} />
      <Route path="/error" component={NotWelcome} />
    </Switch>
  </Router>
);
