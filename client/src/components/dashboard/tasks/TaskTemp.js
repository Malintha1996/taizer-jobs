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
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DoneIcon from '@material-ui/icons/Done';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

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
  }
}));
export default function Task(props) {
  const classes = useStyles();
  const avatar=("/img/platforms/".concat(props.task.platform)).concat("/logo.png")  
  return (
     <Paper mb={1}>
      <ListItem button component={RouterLink} to={{pathname:'/task',state:{taskId:props.task._id}}} key={props.task._id} divider>
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
               <Chip icon={<HourglassEmptyIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Expires on:{props.task.deadline}</Typography>} size="small" /> 
              </Box>
              <Box mb={1}>
                 <Chip icon={<DoneIcon/>}color="primary" label={<Typography component="h7" variant="subtitle2" >Submissions:{props.task.numberOfSubmissions}</Typography>} size="small" /> 
              </Box>
              <Box>
                  <Chip icon={<LockOpenIcon/>} color="secondary" label={<Typography component="h7" variant="subtitle2" >Available spots:{props.task.numberOfSubmissionsRequired-props.task.numberOfAcceptedSubmissions}</Typography>} size="small" /> 
              </Box>
              </Typography>
            </React.Fragment>
          }
        />
         <ListItemAvatar>
          <div align="center">
            <Avatar alignItemsFlexEnd className={classes.orangeAvatar}>{props.task.pointsAllocated}</Avatar>
            <Typography component="h6" variant="h6" className={classes.orangetext} >Points</Typography>
           </div>
         </ListItemAvatar>
      </ListItem>
      </Paper>
  );
}