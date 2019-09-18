import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  paper: {
    padding: '20px',
    margin: '10px',
    'background-color': '#FFF',
    'border-radius': '4px',
  },
};

const PaperComp = (props) => {
  return (
    <Paper className={`paper ${props.classes.paper} ${props.className}`} elevation={props.elevation || 2}>
      {props.children ? props.children : 'class names'}
    </Paper>
  );
};

export default withStyles(styles)(PaperComp);
