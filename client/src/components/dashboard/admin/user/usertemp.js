import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import { deepOrange,grey,green,red} from '@material-ui/core/colors';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {AllowUserForm,BanUserForm,AddPointsForm} from './forms'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  descpaper:{
    padding: theme.spacing(3, 2),
    width:'98%'
  },
  orangetext:{
    color:deepOrange[500]
  },
  typo:{
    '@media (min-width: 780px)' : {
        fontSize:18,
      },
      '@media (max-width: 400px)' : {
         fontSize:12
      }
  },
  desc:{
    padding:theme.spacing(2),
    backgroundColor:grey[200]
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

export default function UserTemp(props) {
  const classes = useStyles();
  const [openBan, setOpenBan] = React.useState(false);
  const [openAllow, setOpenAllow] = React.useState(false);
  const [openAddPoints, setOpenAddPoints] = React.useState(false);
  function handleAllowUserClick() {
    setOpenAllow(true);
  }

  function handleClose() {
    setOpenBan(false);
    setOpenAllow(false);
    setOpenAddPoints(false);
  }
  function handleBanUserClick(e) {
      setOpenBan(true)
  }
  function handleOpenAddPointsClick(){
      setOpenAddPoints(true)
  }
  function handleAllowUser(){
      props.handleAllowUser()
      setOpenAllow(false)
  }
  function handleBanUser(){
      props.handleBanUser()
      setOpenBan(false)
  }
  function handleAddPoints(e){
      setOpenAddPoints(false)
      e.preventDefault()
      props.handleAddPoints(e.target.elements.amount.value)

  }
  return (
   <div>
    <Paper className={classes.root}>
      <Box>
        <Grid justify="flex-start" container display="flex" >
        <Grid item sm={12} xs={12}>
            <Avatar src={"/img/platforms/facebook/logo.png"} className={classes.bigAvatar} />
        </Grid>
       <Grid item xs={12} sm={12}>
        <Typography component="subtitle1" variant="subtitle1" >Name: {props.user.firstname.concat(" ").concat(props.user.lastname)}</Typography>
       </Grid>
       <Grid item xs={12} sm={12}>
        <Typography component="subtitle1" variant="subtitle1" >Email: {props.user.email}</Typography>
       </Grid>
       <Grid item xs={12} sm={12}>
        <Typography component="subtitle1" variant="subtitle1" >Phone: {props.user.phone}</Typography>
       </Grid>
       <Grid item xs={12} sm={12}>
        <Typography component="subtitle1" variant="subtitle1" >Address: {props.user.address}</Typography>
       </Grid>
       <Grid item xs={12} sm={12}>
        <Typography component="subtitle1" variant="subtitle1" >Country: {props.user.country}</Typography>
       </Grid>
       <Grid item xs={12} sm={12}>
       <Typography component="subtitle1" variant="subtitle1" >Postal-code: {props.user.postalcode}</Typography>
      </Grid>
       <Grid item xs={12} sm={12}>
        <Typography component="subtitle1" variant="subtitle1" >Current Point Balance: {props.user.gainedPoints}</Typography>
       </Grid>
       <Grid item xs={12} sm={12}>
        <Typography component="subtitle1" variant="subtitle1" >completed Tasks: {props.user.completedTasks}</Typography>
       </Grid>
       </Grid>
       </Box>
       <Box mt={3}>
            {props.user.banned ?   
            <Grid container justify="center">
                <Grid xs={12} sm={12}> 
                    <Chip
                        label={<Typography component="h7" variant="h7">User is banned! </Typography>}
                        className={classes.redAvatar}
                    />
                </Grid>
           </Grid> :null }
        </Box>
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
                {props.user.banned ? 
                <Grid item sm={4} xs={12}>
                    <Box>
                     <Typography className={classes.orangetext} >User is banned</Typography>
                    </Box>
                    <Box>
                     <Button variant="contained" className={classes.greenAvatar} onClick={handleAllowUserClick}>Allow User</Button>
                    </Box>
                    </Grid>:
                    <Grid item sm={4} xs={12}> 
                      <Button  variant="contained" className={classes.orangeAvatar} onClick={handleBanUserClick}>Ban User</Button>
                    </Grid>
                }
                <Grid item sm={4} xs={12}>
                    <Box>
                    <Button variant="contained" className={classes.greenAvatar} onClick={handleOpenAddPointsClick}>Add or Remove points</Button> 
                    </Box>
                </Grid>
                </Grid>
            </ExpansionPanelDetails>
       </ExpansionPanel>  
      </Paper>
      <AddPointsForm handleClose={handleClose} open={openAddPoints} handleAddPoints={handleAddPoints}/>
      <BanUserForm handleClose={handleClose} open={openBan} handleBanUser={handleBanUser}/>
      <AllowUserForm open={openAllow}   handleAllowUser={handleAllowUser} handleClose={handleClose} />
    </div>
  );
}