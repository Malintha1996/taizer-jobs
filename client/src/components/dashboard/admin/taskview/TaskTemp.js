import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Avatar, IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DoneIcon from '@material-ui/icons/Done';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import StarsIcon from '@material-ui/icons/Stars';
import FormDialog  from '../../../layout/Dialog/simpledialog'
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import { deepOrange,amber, green,deepPurple,grey,red} from '@material-ui/core/colors';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import SubmissionsTab from './SubmissionTabPannel'
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import Fab from '@material-ui/core/Fab';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExtendDeadlineForm from  './extenddeadlineform'
import DeleteTaskform from './deletetaskform'
import Spinner from 'react-spinner-material'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3,2),
    overflow:'hidden'
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  inline: {
    display: 'inline',
  },
  descpaper:{
    padding: theme.spacing(3, 2),
    width:'98%'
  },
  chip: {
    margin: theme.spacing(1),
  },
  desc:{
    padding:theme.spacing(3,2),
    backgroundColor:grey[200],
    overflow:'hidden'
  },
  typo:{
    '@media (min-width: 780px)' : {
        fontSize:18,
      },
      '@media (max-width: 400px)' : {
         fontSize:12
      }
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
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
  redAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: red[500],
  },
  orangetext:{
    color:deepOrange[500]
  },
  greentext:{
    color:deepOrange[500]
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color:deepOrange[500]
  },
}));

export default function PaperSheet(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [deleteopen, setDeleteOpen] = React.useState(false);
  const [openSpinner, setOpenSpinner ]= React.useState(false);
  function handleClickOpen() {
    setOpen(true);
  }
  function handleDeleteClickOpen(){
    setDeleteOpen(true)
  }
  function handleClose() {
    setOpen(false);
  };
  function handleDeleteClose() {
    setDeleteOpen(false);
  };
  const avatar=("/img/platforms/".concat(props.task.platform)).concat("/logo.png")  
  function handlePauseClick(e) {
    props.handlePauseTask(true,props.task._id) 
  }
  function handleResumeClick(e) {
    props.handlePauseTask(false,props.task._id) 
  }
  function handleExtendDeadline(e){
    e.preventDefault()
    props.handleExtendDeadline(e.target.elements.deadline.value,props.task._id)
    setOpen(false)
    setOpenSpinner(true)
    setTimeout(function(){
      setOpenSpinner(false)
    },3000);
  }
  function handleDeleteTask(e){
    props.handleDeleteTask(props.task._id)
    setDeleteOpen(false)
    setOpenSpinner(true)
    setTimeout(function(){
      setOpenSpinner(false)
    },3000);
  }

  return (
    <div>
    <div align="center">
    <Spinner size={50} spinnerColor={green[500]} spinnerWidth={2} visible={openSpinner} />
   </div>
    <Grid container  spacing={3}>
      <Grid  item xs={12} sm={6}>
      <Paper className={classes.root}>
      <div align="center">
       <Avatar alt={props.task.platform} src={avatar} className={classes.bigAvatar} />
       <Typography align="center" component="h4" variant="h5">{props.task.title}</Typography>
      </div>
      <Grid className={classes.desc}>
        <Box>
          <Typography variant="h6" >Task description</Typography>
          </Box>
          <Box>
          <Typography
          component="span"
          variant=""
          className={classes.inline}
          color="textPrimary"
         >
          {props.task.description}
        </Typography>
      </Box>
      <Box >
      <div align="center">
      <Fab variant="extended" color="primary" aria-label="delete" size="small" className={classes.fab}>
       <a href={props.task.taskLink}>Go to Task</a> 
      </Fab>
      </div>
      </Box>
      </Grid>
      <div align="center">
        <Box mb={1} mt={1}> 
         <Chip icon={<MailIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Client Email: {props.task.client.email}</Typography>} size="small" /> 
        </Box>
        <Box mb={1}> 
         <Chip icon={<PersonIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Client Name: {props.task.client.name}</Typography>} size="small" /> 
        </Box>
         {props.clientContact ? <Box mb={1}> 
          <Chip icon={<ContactPhoneIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Client Contact: {props.task.client.contact}</Typography>} size="small" /> 
        </Box>:null}
       <Box mb={1}> 
         <Chip icon={<CalendarTodayIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Added on: {props.task.addedDate}</Typography>} size="small" /> 
       </Box>
       <Box mb={1}> 
        <Chip icon={<EventBusyIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Ends on: {props.task.deadline}</Typography>} size="small" /> 
       </Box>
       <Box mb={1}>
          <Chip icon={<CloudUploadIcon/>} color="secondary" label={<Typography component="h7" variant="subtitle2" >Number of Submissions: {props.task.numberOfSubmissions}</Typography>} size="small" /> 
       </Box>
       <Box mb={1}>
          <Chip icon={<CheckIcon/>} color="secondary" label={<Typography component="h7" variant="subtitle2" >Number of Accepted Submissions: {props.task.numberOfAcceptedSubmissions}</Typography>} size="small" /> 
       </Box>
       <Box mb={1}>
        <Chip icon={<ClearIcon/>} color="secondary" label={<Typography component="h7" variant="subtitle2" >Number of Rejected Submissions: {props.task.numberOfRejectedSubmissions}</Typography>} size="small" /> 
       </Box>
      <Box mb={1}>
        <Chip icon={<AddIcon/>} color="secondary" label={<Typography component="h7" variant="subtitle2" >Number of Submissions required: { props.task.numberOfSubmissionsRequired-props.task.numberOfAcceptedSubmissions}</Typography>} size="small" /> 
      </Box>
      <Box mb={1}>
          <Chip icon={<StarsIcon/>} color="secondary" label={<Typography component="h7" variant="subtitle2" >Allocated Points: {props.task.pointsAllocated}</Typography>} size="small" /> 
      </Box>
      
      <Box mb={1}>
      { props.task.completionStatus ? <Typography variant="h5" className={classes.greentext}>This task has been successfuly completed!</Typography>:
      <div>
      <Typography className={classes.orangetext}>This task hasn't been completed yet!</Typography>
      <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Danger Zone</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      <Grid container justify="center">
      {props.task.paused ? 
         <Grid item sm={4} xs={12}>
          <Box>
            <Typography className={classes.orangetext} >Task is paused</Typography>
          </Box>
           <Box>
            <Button variant="contained" className={classes.greenAvatar} onClick={handleResumeClick}>Resume Task</Button>
          </Box>
          </Grid>:
          <Grid item sm={4} xs={12}> 
           <Button  variant="contained" className={classes.orangeAvatar} onClick={handlePauseClick}>Pause Task</Button>
           </Grid>
       }
       <Grid item sm={4} xs={12}>
       <Box>
        <Button variant="contained" className={classes.greenAvatar} onClick={handleClickOpen}>Extend Deadline</Button> 
       </Box>
       </Grid>
       <Grid item sm={4} xs={12} >
       <Box>
        <Button variant="contained" className={classes.redAvatar} onClick={handleDeleteClickOpen}>Delete Task</Button> 
      </Box>
      </Grid>
      </Grid>
      </ExpansionPanelDetails>
     </ExpansionPanel>  
     </div>
      }
        </Box>
      </div>
    </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <SubmissionsTab ></SubmissionsTab>
      </Grid>
      </Grid>
      <ExtendDeadlineForm handleClose={handleClose} open={open} handleExtendDeadline={handleExtendDeadline}/>
      <DeleteTaskform handleClose={handleDeleteClose} open={deleteopen} handleDeleteTask={handleDeleteTask}/>
    </div>
  );
}

