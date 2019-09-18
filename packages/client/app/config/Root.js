import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';

// Views for routing
import NotFound from '../view/NotFound';
import Simulator from '../view/Simulator';

import '../assets/scss/main.scss';

const MainLayout = props => (
  <div className="mainLayout">
    {props.children}
  </div>
);

const Root = () => {
  return (
    <Router>
      <div style={{display: 'flex', flexFlow: 'column', height: '100vh'}}>
        <Header id="header" />
        <MainLayout>
          <Switch>
            <Route exact path="/simulator" component={Simulator} />
            <Route component={NotFound} status={404} />
          </Switch>
        </MainLayout>
      </div>
    </Router>
  );
};

export default Root;
