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
import { Typography } from '@material-ui/core';
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

function PointsClaimForm(props) {  
    const [method, setMethod] = React.useState('bankdeposit');
    const [amount,setAmount]= React.useState(0);
    const pointVal=props.pointval
    const handleAmountchange=(e)=>{
        setAmount(e.target.value)
    }
    const paymentMethodChange=(e)=>{
        setMethod(e.target.value)
    }

   return (
    <div>
     
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Claim points</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Points claiming requires minimum amounts as follows,
            Reload: 100 points
            Bankdeposit: 500 points
            Paypal: 500 points
          </DialogContentText>
          <form onSubmit={props.pointsClaim}>
          <TextField
          autoFocus
          margin="dense"
          id="amount"
          label="Amount"
          type="number"
          max={props.performance.points}
          placeholder="points"
          onChange={handleAmountchange}
          fullWidth
          required
         />
         <div align="center">
            <Chip color="secondary" label={<Typography varient="h5">Value : {amount * pointVal} $</Typography>}/>
         </div>
         <FormControl component="fieldset">
            <FormLabel component="legend">Claiming Method</FormLabel>
            <RadioGroup defaultValue="bankdeposit" aria-label="Payment method" name="method" id="method">
                <FormControlLabel value="bankdeposit" control={<StyledRadio paymentMethodChange={paymentMethodChange} />} label="Bank deposit" />
                <FormControlLabel value="reload" control={<StyledRadio paymentMethodChange={paymentMethodChange} />} label="Reload" />
                <FormControlLabel value="paypal" control={<StyledRadio paymentMethodChange={paymentMethodChange} />} label="PayPal" />
            </RadioGroup>
          </FormControl>
       
          { method==="bankdeposit" ? 
           <div>
           <TextField
            margin="dense"
            id="bankname"
            label="Bank"
            type="text"
            fullWidth
            required
          />
           <TextField
            margin="dense"
            id="name"
            label="Account owner's name"
            type="text"
            fullWidth
            required
          />
         <TextField
            margin="dense"
            id="accountnumber"
            label="Account Number"
            type="number"
            fullWidth
            required
          />
        </div>: 
        <div>
        { method==="reload" ?
        <TextField
          margin="dense"
          id="mobilenumber"
          label="Mobile Number"
          type="number"
          fullWidth
          required
       /> :<div>
       {method==="paypal" ? <div>
       <TextField
          margin="dense"
          id="paypalemail"
          label="Paypal Email"
          type="email"
          fullWidth
          required
       /> 
       <TextField
          margin="dense"
          id="paypalcountry"
          label="Paypal Country"
          type="text"
          fullWidth
          required
        />
         </div> : null}
        </div>}
        </div>
        }
        <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
           Claim
          </Button>
       </form>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      
      </Dialog>
    </div>
  );
}
const mapStateToProps=(state)=>{
    return{
      pointval:state.tasks.home.pointValue,
      performance:state.tasks.performance,
      earnedPoints:state.auth.user.gainedPoints
    }
  }

 export default connect(mapStateToProps,null) (PointsClaimForm);
