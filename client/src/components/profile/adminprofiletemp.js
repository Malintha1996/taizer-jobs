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
import { deepOrange,amber, green,deepPurple } from '@material-ui/core/colors';
import DoneIcon from '@material-ui/icons/Done';
import StarIcon from '@material-ui/icons/Star';
import FormDialog  from '../layout/Dialog/profilepicdialog';
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
}));

export default function AdminProfileTemp(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSpinner, setOpenSpinner ]= React.useState(false);
  const [files, setFiles] = React.useState([]);
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  function handleSave(e) {
    setOpen(false)
    setOpenSpinner(true)
    props.handleChangeProfilePic(files)
    setTimeout(function(){
      setOpenSpinner(false)
    }, 5000);
    
  }
  function handleChange(images){
      var reader = new FileReader();
       images.forEach((image)=>{
        reader.readAsDataURL(image)
        reader.onload=(e)=>{
         files.push(e.target.result)
        }
     })
  }
  return (
    <div>
    <div align="center">
    <Spinner size={50} spinnerColor={green[500]} spinnerWidth={2} visible={openSpinner} />
   </div>
      <Paper  className={classes.root}>
             <div align="center">
               {props.picture ? <Avatar  alt="Remy Sharp" src={props.picture} className={classes.bigAvatar} />:<Avatar  alt="bjk" src='/img/profile.png' className={classes.bigAvatar}/>}
               <Button  variant="contained" color="secondary" onClick={handleClickOpen} >
                  Change Profile Picture
               </Button>
               <List className={classes.liststyle}>
                   <ListItem>
                     <ListItemAvatar>
                       <Avatar>
                         <AccountCircleIcon/>
                       </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography component="div" variant="h6">{props.user.firstname+" "+props.user.lastname}</Typography>}  />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                     <ListItemAvatar>
                       <Avatar>
                         <EmailIcon/>
                       </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography component="div" variant="h6">{props.user.email}</Typography>}  />
                  </ListItem>
                </List>
             </div> 
        </Paper>
      <FormDialog open={open} handleSave={handleSave} handleChange={handleChange} handleClose={handleClose}></FormDialog>
    </div>
  );
}