import React,{Component,useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { Container, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { deepOrange,amber, green,deepPurple } from '@material-ui/core/colors';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

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
  }));

const AccountsTemp=(props)=>{
      const  classes=useStyles()
      const Accounts=()=>props.accounts.map(account => {
        var platpic="/img/platforms/".concat(account.platform).concat("/logo.png")
        return (
        <div >
        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} component="a" className={classes.link} href={account.profilelink}>
        <ListItem button  >
         <ListItemIcon><Avatar src={platpic}></Avatar></ListItemIcon>
         <ListItemText primary={account.username} />
        </ListItem>
        </Link>
        </div>
       )
      })
      return(
        <div>
        <Grid container alignItems='center' 	direction='column'> 
        <Grid item xs={12} sm={8}>
        <Paper  className={classes.root}>
          <div align="center">
            <Chip
            size='medium'
            label={<Typography component="h4" variant="h5">Plugged In Accounts</Typography>}
            color="primary"
            className={classes.chip}
          />
          </div>
          <List className={classes.liststyle}>
            <Accounts/>
          </List>
     </Paper>
     </Grid>
     </Grid>
        </div>
      )
}
const mapStateToProps=(state)=>{
  return{
  }
}
export default connect(mapStateToProps,null)(AccountsTemp);
