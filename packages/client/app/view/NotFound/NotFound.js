import React from 'react';
import Paper from 'components/Paper';

import './NotFound.scss';

const NotFound = () => {
  window.scrollTo(0, 0);

  return (
    <div className="notFound">
      <Paper classes={{ paper: 'notFound__card' }}>
        <h2>Page Not Found</h2>
        <div>Apparently we are missing a site you are searching for.</div>
      </Paper>
    </div>
  );
};

export default NotFound;
