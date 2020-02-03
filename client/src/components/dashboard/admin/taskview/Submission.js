import {connect} from 'react-redux'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {Link as RouterLink} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { deepOrange, deepPurple,green,red,yellow,amber} from '@material-ui/core/colors';
import DoneIcon from '@material-ui/icons/Done';
import StarIcon from '@material-ui/icons/Star';
import PersonIcon from '@material-ui/icons/Person';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import Image from 'material-ui-image'
import {acceptSubmission,rejectSubmission} from '../../../../store/actions/taskAction'
import Spinner from 'react-spinner-material';



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  liststyle:{
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  box:{
   //padding: theme.spacing(3, 2),
   minWidth:400,
   maxWidth:800,
   padding: theme.spacing(3, 2),
   float:'left',
  },
  chip: {
    margin: theme.spacing(2),
    padding:theme.spacing(2,2,2),
  },
  orangetext:{
    color:deepOrange[500]
  },
  orangetext:{
    color:green[500]
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
  yellowAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: amber[500],
  },
  paper: {
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  orangetext:{
    color:deepOrange[500]
  },
  greentext:{
    color:green[500]
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
  }
}));

const  SubmissionView=(props)=> {
  const classes = useStyles();
  const [openSpinner, setOpenSpinner ]= React.useState(false);
  var submission
  if(props.submission){
    submission=props.submission
  }
  else{
    submission= props.location.state.submission
  }
  const prooflist=()=>submission.proof.map((proof,index) => {
    return (
       <Box mb={1}>
         <Link href={proof} ><MailIcon></MailIcon> {"image".concat(index)}</Link>
        </Box>
   )
  })
  function acceptSub(){
     setOpenSpinner(true)
     props.acceptSubmission(submission.taskId,submission._id)
     setTimeout(function(){
      setOpenSpinner(false)
     }, 6000);
  }
  function rejectSub(){
    setOpenSpinner(true)
    props.rejectSubmission(submission.taskId,submission._id)
    setTimeout(function(){
      setOpenSpinner(false)
    }, 6000);
  }
  return (
    <div>
    <div align="center">
    <Spinner size={50} spinnerColor={green[500]} spinnerWidth={2} visible={openSpinner} />
   </div>
    <Paper className={classes.paper}>
      <Typography>Proof</Typography>
      <Box mt={2} mb={2}>
        {prooflist}
      </Box>
      <Grid container justify="flex-start" spacing={1}>
        <Grid item sm={12} xs={12}>
            <List>{prooflist}</List>
        </Grid>
        <Grid item sm={12} xs={12}>
          <Chip icon={<PersonIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Reviewer:{submission.user.firstname} {submission.user.lastname}</Typography>} size="small" /> 
        </Grid>
        <Grid item sm={12} xs={12}> 
          <Chip icon={<MailIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Reviewer Email:{submission.user.email}</Typography>} size="small" /> 
        </Grid>
        <Grid item sm={12} xs={12}>
          <Chip icon={<PhoneIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Reviewer Mobile:{submission.user.phone}</Typography>} size="small" /> 
        </Grid>
        <Grid item sm={12} xs={12}>
          <Chip icon={<EventAvailableIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Submitted On:{submission.submittedDate}</Typography>} size="small" /> 
        </Grid>
      </Grid>
      <Box mt={2}>
      <Grid container justify="center">
        <Grid item sm={12} xs={12}>
          <Button variant="contained" color="primary" component={RouterLink} to={{pathname:'/user',state:{userId:submission.user._id}}}>view reviewer</Button>
        </Grid>
      </Grid>
      </Box>
      <div align="center">
      {!submission.acceptance && !submission.rejected ? 
       <div>
      <Button  variant="contained" color="secondary" onClick={acceptSub} >
        Accept Submission
      </Button>  <Button  variant="contained" color="secondary" onClick={rejectSub} >
      Reject Submission
    </Button> </div> : <div>{submission.acceptance && !submission.rejected? <div><Chip   className={classes.greenAvatar} label={<Typography component="subtitle1" variant="subtitle2" >Accepted</Typography> }/> <Button  variant="contained" color="secondary" onClick={rejectSub} >
    Reject Submission
  </Button></div>: <div><Chip className={classes.redAvatar}  label={<Typography component="subtitle1" variant="subtitle2" >Rejected</Typography>}/> <Button  variant="contained" color="secondary" onClick={acceptSub} >
  Accept Submission
</Button></div> }</div>}
    </div>
 
    </Paper>
    </div>
  )
}
const mapStateToProps=(state)=>{
  return{
    submission:state.tasks.submission,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    rejectSubmission:(taskId,submissionId)=>dispatch(rejectSubmission(taskId,submissionId)),
    acceptSubmission:(taskId,submissionId)=>dispatch(acceptSubmission(taskId,submissionId))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SubmissionView);
