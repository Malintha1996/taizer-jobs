import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';


const useStyles = makeStyles(theme => ({
  root: {
    width:'100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FixedSizeList height={700} width="100%" itemSize={46} itemCount={1}>
         {props.taskslist}
      </FixedSizeList>
    </div>
  );
}