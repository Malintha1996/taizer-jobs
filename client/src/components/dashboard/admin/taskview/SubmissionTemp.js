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
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { typography } from '@material-ui/system';
import { deepOrange, deepPurple,green,red,yellow} from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DoneIcon from '@material-ui/icons/Done';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PersonIcon from '@material-ui/icons/Person';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';

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
export default function SubmissionTemplate(props) {
  const classes = useStyles();
  return (
     <Paper mb={1}>
      <ListItem button component={RouterLink} to={{pathname:'/submissionview',state:{submissionId:props.submission._id,taskId:props.taskId,submission:props.submission}}} key={props.submission._id} divider>
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
               <Chip icon={<PersonIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Reviewer:{props.submission.user.firstname} {props.submission.user.lastname}</Typography>} size="small" /> 
              </Box>
              <Box mb={1}> 
              <Chip icon={<MailIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Reviewer Email:{props.submission.user.email}</Typography>} size="small" /> 
             </Box>
             <Box mb={1}> 
               <Chip icon={<PhoneIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Reviewer Mobile:{props.submission.user.phone}</Typography>} size="small" /> 
             </Box>
              <Box mb={1}> 
               <Chip icon={<EventAvailableIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Submitted On:{props.submission.submittedDate}</Typography>} size="small" /> 
              </Box>
              <Box mb={1}> 
               <div align="center">
                {props.submission.acceptance ?  <Chip color={green[500]} className={classes.greenAvatar} label={<Typography component="subtitle1"  variant="subtitle2" >Accepted</Typography>} size="medium" /> :<div>{props.submission.rejected ? <Chip color={red[500]} className={classes.redAvatar} label={<Typography component="subtitle1"  variant="subtitle2" >Rejected</Typography>} size="medium" />:<Chip color={red[500]} className={classes.yellowAvatar} label={<Typography component="subtitle1"  variant="subtitle2" >Not accepted</Typography>} size="medium" />}</div>  } 
               </div>
               </Box>
               </Typography>
            </React.Fragment>
          }
        /> 
        <ListItemAvatar>
        <div align="center">
         {props.submission.acceptance ? 
          <Avatar alignItemsFlexEnd className={classes.greenAvatar}><CheckIcon/></Avatar>    
         : <div>{props.submission.rejected ? <Avatar alignItemsFlexEnd className={classes.redAvatar}><ClearIcon/></Avatar>:<Avatar alignItemsFlexEnd className={classes.yellowAvatar}><PriorityHighIcon/></Avatar>}</div> }
          </div>
       </ListItemAvatar>    
      </ListItem>
      </Paper>
  );
}