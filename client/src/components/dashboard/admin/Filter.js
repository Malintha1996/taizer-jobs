import React from 'react';
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import {Link as RouterLink} from 'react-router-dom';
import { deepOrange} from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  link:{
    textDecoration: 'none'
  },
  button: {
    margin: theme.spacing(1),
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
}));

export default function ReviewersTable(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    columns: [
      { title: 'User', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Phone', field: 'phone' },
      { title: 'Completed Tasks', field: 'completedTasks' },
      { title: 'Earned Points', field: 'gainedPoints' },
    ],
    data: [
    ],
  });

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={props.reviewers}
      actions={[
        {
          icon: 'save',
          tooltip: 'Save User',
        }
      ]}
      components={{
        Action: props => (
          <IconButton
            className={classes.button}
            component={RouterLink}
            to={{pathname:'/user',state:{userId:props.data.userId}}}
          >
          <VisibilityIcon></VisibilityIcon>
          </IconButton>
        ),
      }}
    />
  );
}