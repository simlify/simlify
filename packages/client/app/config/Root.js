import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

// Redux store
import { store } from '../store';

// Components
import Notifier from 'components/Notifier';

// Views for routing
import NotFound from 'view/NotFound';
import Simulator from 'view/Simulator';

import 'assets/scss/main.scss';

const MainLayout = props => (
  <div className="mainLayout">
    {props.children}
  </div>
);

const Root = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider autoHideDuration={2000}>
        <Notifier />
        <Router>
          <div style={{display: 'flex', flexFlow: 'column', height: '100vh'}}>
            <MainLayout>
              <Switch>
                <Redirect exact from="/" to="/app/simulator" />
                <Route exact path="/app/simulator" component={Simulator} />
                <Route component={NotFound} status={404} />
              </Switch>
            </MainLayout>
          </div>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
};

export default Root;
