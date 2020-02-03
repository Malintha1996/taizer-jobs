import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DoneIcon from '@material-ui/icons/Done';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import StarsIcon from '@material-ui/icons/Stars';
import FormDialog  from '../layout/Dialog/simpledialog';
import { deepOrange,amber, green,deepPurple,grey} from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Loader from 'react-loader-spinner'
import Spinner from 'react-spinner-material';


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
  }
}));

export default function PaperSheet(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [openSpinner, setOpenSpinner ]= React.useState(false);
  const [filesnew, setFilesnew] = React.useState([]);
  const [src, setSrc] = React.useState('');
  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleSave(e) {
      setOpen(false)
      setOpenSpinner(true)
      props.handleSubmitProof(files) 
      setTimeout(function(){
        setOpenSpinner(false)
      }, 6000);
  }
  function handleChange(images){
    var newfiles=[]
    images.forEach((image,index)=>{
      if(index===images.length-1){
        setFiles(newfiles)
      }
      var reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload=(e)=>{
       
       newfiles.push(e.target.result)
      }
   })
  }
  const avatar=("/img/platforms/".concat(props.task.platform)).concat("/logo.png")  
  return (
    <div>
      <div align="center">
       <Spinner size={50} spinnerColor={green[500]} spinnerWidth={2} visible={openSpinner} />
      </div>
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
          variant="body2"
          className={classes.inline}
          color="textPrimary"
         >
          {props.task.description}
        </Typography>
      </Box>
      <Box>
      <div align="center">
      <Fab variant="extended" color="primary" aria-label="delete" size="small" className={classes.fab}>
       <a href={props.task.taskLink}>Go to Task</a> 
      </Fab>
      </div>
      </Box>
      </Grid>
       <Grid justifyContent="center" container display="flex" >
       <Box mb={1} mt={2} mr={0.5}> 
        <Chip justifyContent="flex-end" icon={<HourglassEmptyIcon/>} color="primary" label={<Typography component="subtitle1" variant="subtitle2" >Expires on:{props.task.deadline}</Typography>} size="small" /> 
       </Box>
       <Box  mt={2} mr={0.5}>
         <Chip icon={<DoneIcon/>}color="primary" label={<Typography component="h7" variant="subtitle2" >Submissions:{props.task.numberOfSubmissions}</Typography>} size="small" /> 
       </Box>
       <Box  mt={2} mr={0.5}>
          <Chip icon={<LockOpenIcon/>} color="secondary" label={<Typography component="h7" variant="subtitle2" >Available spots:{props.task.numberOfSubmissionsRequired-props.task.numberOfAcceptedSubmissions}</Typography>} size="small" /> 
       </Box>
       <Box  mt={2} mr={0.5}>
        <Chip icon={<StarsIcon/>} color="secondary" label={<Typography component="h7" variant="subtitle2" >Points:{props.task.pointsAllocated}</Typography>} size="small" /> 
       </Box>
       </Grid> 
       <Box mt={3}>
         <div align="center">
          {props.taskAcceptance ?   
          <Box> 
          <Grid container justify="center">
          <Grid xs={12} sm={6}> 
          <Chip
          label={<Typography component="h7" variant="h7">You have successfully completed this Task! </Typography>}
          className={classes.chip}
          color="secondary"
         />
        </Grid>
        <Grid  xs={12} sm={6}>
         <Typography className={classes.orangetext}>You gained {props.task.pointsAllocated} points</Typography>
        </Grid>
        </Grid> 
     </Box>:<Box mt={3}>{props.taskRejection ? 
           <Grid container justify="center">
           <Grid item xs={12} sm={6}>
                <Chip
                  label={<Typography component="h6" variant="h6">Sorry Your Submission has been rejected!</Typography>}
                  className={classes.chip}
                  color="primary"
                />
           </Grid>
           </Grid>
           :<Box mt={3}>{props.taskCompletionStatus ? 
            <Grid container justify="center">
             <Grid item xs={12} sm={6}>
             <Chip
              label={<Typography component="h6" variant="h6">Your Submission is being reviewed</Typography>}
              color="primary"
             /> 
            </Grid>
          </Grid>  :<Button  variant="contained" color="secondary" onClick={handleClickOpen} >
         Submit Proof
        </Button>}</Box>}</Box>}
        </div>
        </Box>
      </Paper>
      <FormDialog open={open} handleSave={handleSave} handleChange={handleChange} handleClose={handleClose}></FormDialog>
    </div>
  );
}