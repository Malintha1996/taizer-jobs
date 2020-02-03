import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux'
import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { red,green} from '@material-ui/core/colors';
import {changePointValue} from '../../../store/actions/taskAction'


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
  redtext:{
    color:red[500]
  },
  redAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: red[500],
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
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

const ChangeForm=(props)=> {  
    const classes = useStyles();
    
    return (
    <div>
     
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><Typography className={classes.redtext}>Change Unit Value</Typography></DialogTitle>
        <DialogContent>
        <form onSubmit={props.handleSave}>
        <TextField
        autoFocus
        margin="dense"
        id="value"
        label="Value in $"
        type="text"
        fullWidth
        required
        
       />
      
      <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
         Change
        </Button>
     </form>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      
      </Dialog>
    </div>
  );
}
const PointValue=(props)=>{
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  };
  function handleSave(e){
      e.preventDefault()
      props.changePointValue(e.target.elements.value.value)
      setOpen(false);
  }
    return (
        <div>
        <Box mt={3}>
        <Grid container justify="center">
        <Chip
           label={<Typography component="h7"  variant="h7">Point value: {props.pointValue} $ </Typography>}
           className={classes.chip}
           color="secondary"
        />
        </Grid>
        <div align="center">
        <Button variant="contained" className={classes.greenAvatar} onClick={handleClickOpen}>Change Value</Button>
        </div>
        </Box>
        <ChangeForm open={open} handleClose={handleClose} handleSave={handleSave}/>
        </div>
    )
}


const mapDispatchToProps=(dispatch)=>{
   return{
     changePointValue:(newval)=>dispatch(changePointValue(newval))
   }
}
const mapStateToProps=(state)=>{
  return{
    pointValue:state.tasks.pointValue
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (PointValue);