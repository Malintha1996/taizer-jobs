import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux'

import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Typography, Box} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid'
import { userInfo } from 'os';


const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});
function StyledRadio(props) {
    const classes = useStyles();
  
    return (
      <Radio
        className={classes.root}
        disableRipple
        onChange={props.paymentMethodChange}
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

export function AllowUserForm(props) {  

   return (
    <div>
     
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Allow User</DialogTitle>
        <DialogContent>
        <Box>
        <Typography color="error">Are you sure that you want to allow this user</Typography> 
       </Box>
         <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit"  onClick={props.handleAllowUser} color="primary">
           Confirm
          </Button>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      
      </Dialog>
    </div>
  );
}

export function BanUserForm(props) {  

    return (
     <div>
      
       <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
         <DialogTitle id="form-dialog-title">Ban User</DialogTitle>
         <DialogContent>
        <Box>
         <Typography color="error">Are you sure that you want to ban this user</Typography> 
        </Box>
         <Button onClick={props.handleClose} color="primary">
             Cancel
           </Button>
           <Button type="submit" onClick={props.handleBanUser} color="primary">
            Confirm
           </Button>
         </DialogContent>
         <DialogActions> 
         </DialogActions>
       
       </Dialog>
     </div>
   );
 }
export function AddPointsForm(props) {  

    return (
     <div>
       <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
         <DialogTitle id="form-dialog-title">Add points</DialogTitle>
         <DialogContent>
           <form onSubmit={props.handleAddPoints}>
           <TextField
           autoFocus
           margin="dense"
           id="amount"
           label="Amount"
           type="number"
           placeholder="points"
           fullWidth
           required
          />
         
         <Button onClick={props.handleClose} color="primary">
             Cancel
           </Button>
           <Button type="submit" color="primary">
             Add
           </Button>
        </form>
         </DialogContent>
         <DialogActions>
           
         </DialogActions>
       
       </Dialog>
     </div>
   );
 }


