import React, { useState }  from 'react';
import PropTypes, { bool } from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {closeMessage} from '../../../store/actions/messageActions'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

  
  const useStyles2 = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));


const  Message=(props)=> {

    const classes = useStyles1();
    const variant=props.status
    const message=props.message
    const Icon = variantIcon[variant];


    const handleClose=(event,reason)=> {
      props.closeMessage()
    }

    return (
      <div>
            <Snackbar
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
              }}
              open={props.show}
              ContentProps={{
                  'aria-describedby': 'message-id',
              }}
              autoHideDuration={6000}
              onClose={handleClose}
            >
            <SnackbarContent
              className={clsx(classes[variant], '')}
              aria-describedby="client-snackbar"
              message={
                <span id="client-snackbar" className={classes.message}>
                  <Icon className={clsx(classes.icon, classes.iconVariant)} />
                  {message}
                </span>
              }
              action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon className={classes.icon} />
                </IconButton>,
              ]}
           />
          </Snackbar>
     </div>
    );
  }
  const mapStateToProps=(state)=>{
    return{
       message:state.message.message,
       show:state.message.show,
       status:state.message.status
    }
  }

const mapDispatchToProps=(dispatch)=>{
  return{
    closeMessage:()=>dispatch(closeMessage())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Message)