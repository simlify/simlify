import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import Root from 'config/Root';

WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif'],
  },
});

ReactDOM.render(<Root />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('config/Root', () => {
    const newApp = require('config/Root').default;
    render(newApp);
  });
}
