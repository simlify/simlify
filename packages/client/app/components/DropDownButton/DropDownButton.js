import React from 'react';
import Button from 'components/Button';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

import './DropDownButton.scss';

function renderPopper(isOpen, anchorEl, props, handleMenuClick) {
  return(
    <Popper
      open={isOpen}
      keepMounted
      transition
      disablePortal
      placement="bottom-end"
      anchorEl={anchorEl}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
        >
          <Paper id="menu-list-grow">
            <MenuList>
              {
                props.items &&
                props.items.map((item, index) => <MenuItem onClick={handleMenuClick(index)}>{item}</MenuItem>)
              }
            </MenuList>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}

export default function DropDownButton(props) {
  const [isOpen, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleToggle = (event) => {
    setOpen(prev => !prev);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if(isOpen) setOpen(false);
  };

  const handleMenuClick = (index) => (event) => {
    if (props.onClick) props.onClick(index);
    handleClose(event);
  }

  return (
    <div className={`dropDownButton ${props.className || ''}`}>
      <ClickAwayListener onClickAway={handleClose}>
        <div>
          <Button onClick={handleToggle}>
            { props.children || 'Menu' }
          </Button>
          {
            isOpen && renderPopper(isOpen, anchorEl, props, handleMenuClick)
          }
        </div>
      </ClickAwayListener>
    </div>
  );
}