import React from 'react';
import ButtonUi from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  buttonPrimary: {
    'background-color': '#c4ccdc',
    'margin-left': '5px',
  },
};

const Button = (props) => {
  return (
    <ButtonUi onClick={props.onClick} variant="contained" className={props.classes.buttonPrimary} >
      { props.children ? props.children : 'Button' }
    </ButtonUi>
  );
};

export default withStyles(styles)(Button);
