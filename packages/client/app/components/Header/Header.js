import React from 'react';
import Menu from '../Menu';

import './Header.scss';
import Logo from '../../assets/images/logo.svg';

const Header = () => {
  return (
    <div className="header">
      <Logo />
      <Menu items={['Import Flow', 'Export Flow']} />
    </div>
  );
}

export default Header;
