import React from 'react';
import Button from '@material-ui/core/Button';
import MenuUi from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './Menu.scss';

export default function Menu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (itemNumber) => () => {
    if(props.itemClicked) props.itemClicked(itemNumber);
    handleClose();
  }

  return (
    <div className="menu">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Menu
      </Button>
      <MenuUi
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          props.items && props.items.map((item, index) => <MenuItem onClick={handleMenuClick(index)}>{item}</MenuItem>)
        }
      </MenuUi>
    </div>
  );
}