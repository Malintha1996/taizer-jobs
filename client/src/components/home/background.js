import React, { Component } from 'react'
import { Paper, Typography, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange,orange,amber, green,deepPurple,indigo } from '@material-ui/core/colors';
import Slide from '@material-ui/core/Slide';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import StarsIcon from '@material-ui/icons/Stars';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  liststyle:{
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  paper1:{
   
      //backgroundImage: `url(${"/img/guys.png"})`,
      backgroundRepeat:'no-repeat',
      backgroundPosition:"center",
      backgroundSize:"cover",
      display: 'flex',
      height: '70vh',
      width: '100vw',
      marginLeft:0,
      marginTop:0,
      backgroundColor:indigo[500]

      
  },
  paper2:{
   
    //backgroundImage: `url(${"/img/guys.png"})`,
    backgroundRepeat:'no-repeat',
    backgroundPosition:"center",
    backgroundSize:"cover",
    display: 'flex',
    height: '70vh',
    width: '100vw',
    marginLeft:0,
    marginTop:0,
    backgroundColor:orange[500]

    
},
paper3:{
  height: 'auto',
  width: 'auto',
  marginTop:'15vh',
  marginLeft:'15vh',
  color:'#fff',
  backgroundColor:'transparent',
  boxShadow:'none'

},
header:{
  height:'auto',
  backgroundColor:deepOrange[500],
  padding: theme.spacing(3, 2),

},
banner1:{
  backgroundColor:green[500],
  padding:theme.spacing(3),
  color:"#fff",
  justifySelf:'center',
  marginRight:theme.spacing(4),
  marginBottom:theme.spacing(4)
},
banner2:{
  backgroundColor:orange[500],
  padding:theme.spacing(3),
  color:"#fff",
  justifySelf:'center',
  marginRight:theme.spacing(4),
  marginBottom:theme.spacing(4)
},
banner3:{
  backgroundColor:indigo[500],
  padding:theme.spacing(3),
  color:"#fff",
  justifySelf:'center',
  marginRight:theme.spacing(4),
  marginBottom:theme.spacing(4)
},
banner4:{
  justifySelf:'center',
  marginRight:theme.spacing(4),
  marginBottom:theme.spacing(4)
},
bannerholder:{
  marginTop:theme.spacing(4),
  marginLeft:theme.spacing(3),
  marginRight:theme.spacing(3),
  display:"felx",
  spacing:4
}
,
  toppaper:{
    marginTop:10,
    opacity: 0.8,
},
div:{
  opacity:1,
},
  logo:{
   
   // backgroundImage: `url(${"/img/guys.png"})`,
    backgroundRepeat:'no-repeat',
    backgroundPosition:"center",
    backgroundSize:"cover",
    height: '45%',
    width: '50%',
    display:"flex",
    flexDirection:"column",
    marginLeft:0,
    marginTop:10
    
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
  img:{
      minHeight:'40vh',
      maxHeight:'30vh',
      minWidth:'60vw',
      maxWidth:'45vw',
      marginTop:12,
  
  },
  imgspec:{
    minHeight:'40vh',
    maxHeight:'30vh',
    minWidth:'60vw',
    maxWidth:'45vw',
    marginTop:0,
    marginLeft:'20vw',
    border:0,
    borderRadius:20,
    opacity:0.8

},
  imgholder:{
    flexDirection: "column",
    disply:"felx",
    alignSelf:"center",
    justify:"center"
  
  }
}));
export default function Background(props){
    const classes = useStyles();
    const TopFive=()=>props.homeDetails.topFive.map((user,index) => {
      return (
        <Typography variant="h6">{user}</Typography>
    )})
    return(
       <div>
       <div className={classes.paper1}  >
         <Grid container  justify="center" > 
           <Grid item justify="center" >
              <div align="center">
                <img src={'/img/icons.png'} className={classes.img}></img>
                <img src={'/img/earn.jpg'} className={classes.img}></img>
              </div>
           </Grid>
          </Grid>
       </div>
       <div className={classes.paper2}  >
       <Box>
         <Grid container justify="center" > 
           <Grid justify='center' alignContent="center" item>
             <Paper elevation={4} className={classes.paper3} >
              <Typography  variant="h4">We are TaizerReviews providing reviewing services accross many platforms.</Typography>     
            </Paper>
           </Grid>
          </Grid>
       </Box>
       </div>
       
       <Box width={1} mt={3} mr={3} ml={3}>
       <div align="center">
       <Grid container justify="center"  >
           <Grid item xs={12} sm={3} className={classes.banner1}>
            <div align="center">
              <PeopleIcon/>
              <Typography component="div" variant="h4">Active Reviewers</Typography>
              <Typography  component="div" variant="h4">{props.homeDetails.numberOfReviewers}</Typography>
            </div>
           </Grid>
           <Grid item xs={12} sm={3} className={classes.banner2}>
             <div align="center">
              <AssignmentTurnedInIcon/>
              <Typography component="div" variant="h4">Total Completed Tasks</Typography>
              <Typography  component="div" variant="h4">{props.homeDetails.numberOfTasksCompleted}</Typography>
            </div>
           </Grid>
           <Grid item xs={12} sm={3} className={classes.banner3}>
            <div align="center">
              <Avatar className={classes.orangeAvatar}><StarsIcon/></Avatar>
              <Typography component="div" variant="h4">Total Points Distributed</Typography>
              <Typography  component="div" variant="h4">{props.homeDetails.numberOfPointsDistributed}</Typography>
            </div>
           </Grid>
        </Grid>
        </div>
        </Box>
        <Box width={1} mt={3} mr={3} ml={3}>
        <Grid container  justify="center" >
         <Grid item xs={12} sm={3} className={classes.banner4} > 
          <Paper >
             <div align="center">
               <Box><Grid className={classes.header}><StarsIcon/><Typography variant="h6" >Top Reviewers</Typography></Grid></Box>
               <Box className={classes.root}><TopFive/></Box>
              </div>
         </Paper>
         </Grid>
         </Grid>
        </Box>
       </div>
    )   
}
