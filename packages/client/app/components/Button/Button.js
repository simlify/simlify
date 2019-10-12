import React from 'react';
import ButtonUi from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
};

const Button = (props) => {
  return (
    <ButtonUi variant="contained" className="MuiButton-sizeSmall" {...props} >
      { props.children ? props.children : 'Button' }
    </ButtonUi>
  );
};

export default withStyles(styles)(Button);
