import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Firstpage from './Firstpage';
import Secondpage from './Secondpage';
import history from './history';
import NotWelcome from '../organisms/NotWelcome';
import Mainpage from './Mainpage';
export default () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Firstpage} />
      <Route path="/secondpage" component={Secondpage} />
      <Route path="/error" component={NotWelcome} />
      <Route path="/main" component={Mainpage} />
    </Switch>
  </Router>
);
