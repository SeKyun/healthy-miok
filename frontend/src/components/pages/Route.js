import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Firstpage from './firstpage/Firstpage';
import Secondpage from './secondpage/Secondpage';
import history from './history';
import NotWelcome from '../organisms/notwelcome/NotWelcome';
import Mainpage from './mainpage/Mainpage';
import {
  Bloodsugar,
  Bloodpressure,
  Weight,
  Insulin,
  Treatment,
  Exercise,
  Foods,
  Stressandhappy,
  Todayjob,
} from './buttonMenu';

export default () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Firstpage} />
      <Route path="/secondpage" component={Secondpage} />
      <Route path="/error" component={NotWelcome} />
      <Route path="/main" component={Mainpage} />
      <Route path="/bloodSugar" component={Bloodsugar} />
      <Route path="/bloodPressure" component={Bloodpressure} />
      <Route path="/weight" component={Weight} />
      <Route path="/insulin" component={Insulin} />
      <Route path="/treatment" component={Treatment} />
      <Route path="/exercise" component={Exercise} />
      <Route path="/foods" component={Foods} />
      <Route path="/stressAndHappy" component={Stressandhappy} />
      <Route path="/todayJob" component={Todayjob} />
    </Switch>
  </Router>
);
