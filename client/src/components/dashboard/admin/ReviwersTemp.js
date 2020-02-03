import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Link as RouterLink} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { deepOrange, green,red,yellow} from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';


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
  typo:{
    '@media (min-width: 780px)' : {
        fontSize:18,
      },
      '@media (max-width: 400px)' : {
         fontSize:12
      }
  }

}));
export default function ReviwerTemp(props) {
  const classes = useStyles();
  return (
     <Paper container>
      <ListItem button component={RouterLink} to={{pathname:'/reviewer',state:{userId:props.email}}} key={props.user.email} divider>
        <ListItemAvatar>
         {props.profilepic ? <Avatar alt="" src={props.user.profilepic} />: <Avatar alt="" src="/img/profile.png" />} 
        </ListItemAvatar>
        <ListItemText>
            <Box><Typography className={classes.typo} >{props.user.name}</Typography></Box>
            <Box><Typography className={classes.typo}  >{props.user.email}</Typography></Box>
            <Box><Typography className={classes.typo} >{props.user.phone}</Typography></Box>
       </ListItemText>
       </ListItem>
      </Paper>
  );
}