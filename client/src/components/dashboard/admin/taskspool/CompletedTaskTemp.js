import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import {Link as RouterLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { typography } from '@material-ui/system';
import { deepOrange, deepPurple,green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DoneIcon from '@material-ui/icons/Done';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';
import StarsIcon from '@material-ui/icons/Stars';

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
  greenAvatar: {
    margin: 10,
    padding:1,
    color: '#fff',
    backgroundColor: green[500],
  },
  orangetext:{
    color:deepOrange[500]
  },
  greentext:{
    color:green[500]
  },
  chip: {
    margin: theme.spacing(1),
  },
}));
export default function Task(props) {
  const classes = useStyles();
  const avatar=("/img/platforms/".concat(props.task.platform)).concat("/logo.png")  
  return (
     <Paper mb={1}>
      <ListItem button component={RouterLink} to={{pathname:'/taskview',state:{taskId:props.task._id}}} key={props.task._id} divider>
        <ListItemAvatar>
          <Avatar alt="" src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={<React.Fragment>
            <Typography
              align="justify"
              component="h5"
              variant="h6"
              className={classes.inline}
              color="textPrimary"
             >
             {props.task.title}
            </Typography></React.Fragment>} 
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              <Box mb={1}> 
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
               <Chip icon={<EventBusyIcon/>} color="secondary" label={<Typography component="subtitle1" variant="subtitle2" >Ended on: {props.task.deadline}</Typography>} size="small" /> 
              </Box>
              <Box mb={1}>
                  <Chip icon={<OfflinePinIcon/>} color="secondary" label={<Typography component="h7" variant="subtitle2" >Number of Submissions: {props.task.numberofReviewersAssigned}</Typography>} size="small" /> 
              </Box>
              <Box mb={1}>
                  <Chip icon={<StarsIcon/>} color="secondary" label={<Typography component="h7" variant="subtitle2" >Allocated Points: {props.task.pointsAllocated}</Typography>} size="small" /> 
              </Box>
              </Typography>
            </React.Fragment>
          }
        />
        
         <ListItemAvatar>
          <div align="center">
            <Avatar alignItemsFlexEnd className={classes.greenAvatar}>${props.task.gain}</Avatar>    
            <Typography className={classes.greentext}>Gain</Typography>
           </div>
         </ListItemAvatar>
   
       
      </ListItem>
      </Paper>
  );
}