import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { deepOrange,green,red,yellow} from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DoneIcon from '@material-ui/icons/Done';
import CheckIcon from '@material-ui/icons/Done';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PaymentProofForm from './paymentproofform'
import {payClaim} from '../../../store/actions/taskAction'
import Spinner from 'react-spinner-material';


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
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  orangetext:{
    color:deepOrange[500]
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
  redAvatar:{
    margin: 10,
    color: '#fff',
    backgroundColor: red[500]
  },
  yellowAvatar:{
    margin: 10,
    color: '#fff',
    backgroundColor: yellow[500]
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

}));

const ClaimTemp=(props)=>{
  const classes = useStyles(); 
  const [open, setOpen ]= React.useState(false);
  const [openSpinner, setOpenSpinner ]= React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [file,setFile]=React.useState([]);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  };
  function handleSave(e){
    setOpen(false)
    setOpenSpinner(true)
    props.payClaim(file,props.claim)
    setTimeout(function(){
      setOpenSpinner(false)
      window.location.reload(1);
    }, 12000);
  }
  function handleChangePay(files){
    var reader = new FileReader();
    files.forEach((image)=>{
     reader.readAsDataURL(image)
     reader.onload=(e)=>{
      setFile(e.target.result)
     }
  })
  }
  return (
    <div>
    <div align="center">
     <Spinner size={50} spinnerColor={green[500]} spinnerWidth={2} visible={openSpinner} />
    </div>
    <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
      id="panel1bh-header"
    >
      <Typography className={classes.heading}>{props.claim.user.name}</Typography>
      <Typography className={classes.secondaryHeading}>{props.claim.requestedDate}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <ListItem>
      <ListItemText
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
            <Box mb={1}> 
              <Typography component="subtitle1" variant="subtitle1" >Email: {props.claim.user.email}</Typography>
            </Box>
            <Box mb={1}> 
              {props.claim.user.phone ? <Typography component="subtitle1" variant="subtitle1" >Phone: {props.claim.user.phone}</Typography>:null}
            </Box>
            <Box mb={1}> 
              <Typography component="subtitle1" variant="subtitle1" >Requested Date: {props.claim.requestedDate}</Typography>
            </Box>
            { props.claim.claimDetails.method==="bankdeposit" ?
            <div>
              <Box mb={1}> 
                <Typography component="subtitle1" variant="subtitle1" >Payment Method: Bank Deposit</Typography> 
              </Box>
              <Box mb={1}> 
                <Typography component="subtitle1" variant="subtitle1" >Account Owner's Name: {props.claim.claimDetails.name}</Typography> 
              </Box>
              <Box mb={1}> 
               <Typography component="subtitle1" variant="subtitle1" >Bank: {props.claim.claimDetails.bankname}</Typography> 
              </Box>
              <Box mb={1}> 
               <Typography component="subtitle1" variant="subtitle1" >Account Number: {props.claim.claimDetails.accountnum}</Typography> 
             </Box>
             <Box mb={1}> 
               <Typography component="subtitle1" variant="subtitle1" >Amount: {props.claim.claimDetails.currency} $</Typography> 
             </Box>
            </div>
            :
            <div>
              <Box mb={1}> 
                <Typography component="subtitle1" variant="subtitle2" >Payment Method: Reload</Typography> 
              </Box>
              <Box mb={1}> 
               <Typography component="subtitle1" variant="subtitle2" >Phone Number:{props.claim.claimDetails.mobilenumber}</Typography>
              </Box>
              <Box mb={1}> 
               <Typography component="subtitle1" variant="subtitle1" >Amount: {props.claim.claimDetails.currency} $</Typography> 
              </Box>
            </div>
         }
         </Typography>
         </React.Fragment>
        } 
       />
      <ListItemAvatar>
          <div align="center">   
             <Button variant="contained" onClick={handleClickOpen} color="secondary">Pay</Button>
           </div>
      </ListItemAvatar>  
    </ListItem>
    </ExpansionPanelDetails>
  </ExpansionPanel>
  <PaymentProofForm open={open} handleChange={handleChangePay} handleClose={handleClose}  handleSave={handleSave}/>
 
  </div>
  );
}
const mapDispatchToProps=(dispatch)=>{
  return{
    payClaim:(files,claim)=>dispatch(payClaim(files,claim))
}
}
export default connect(null,mapDispatchToProps) (ClaimTemp);