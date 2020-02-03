import React,{Component} from 'react';
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withTheme,makeStyles} from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import {addNewTask} from '../../../store/actions/taskAction'
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Message from '../../layout/snackbar/Message'
import Grid from '@material-ui/core/Grid'
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    //position: 'center',
   // marginLeft: theme.spacing(22),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
   },
   header: {
    marginTop: theme.spacing(8),
    //align:'center'
   },
 }))


const HeaderTemp=()=>{
 const classes = useStyles();
 return(<Typography component="h1" variant="h5" className={classes.header}>
             Add Task
       </Typography>)
}


const SubButttonTemp=()=>{
  const classes = useStyles();
  return(
    <Button 
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    className={classes.button}
  >  Create New Task
  </Button>
  )
}
const AvatarTemp=()=>{
  const classes = useStyles();
   return ( <Avatar   className={classes.avatar}>
    <AssignmentIcon/> 
  </Avatar>)
}




class AddTaskTemp extends Component{   
    state={
      title:'',
      platform:'platform',
      description:'',
      clientEmail:'',
      numberOfSubmissionsRequired:0,
      deadline:'',
      clientName:'',
      clientContact:'',
      gain:'',
      taskLink:''
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.addNewTask(this.state)
        this.setState({
          'title':'',
          'platform':'platform',
          'description':'',
          'clientEmail':'',
          'numberOfSubmissionsRequired':0,
          'deadline':'',
          'clientName':'',
          'clientContact':'',
          'gain':'',
          'taskLink':''
        })
        
          
    }
    handleChange=(e)=>{
      this.setState({
        [e.target.id]:e.target.value
      })
    }
    handleChangeSelect=(e)=>{
      this.setState({
        [e.target.name]:e.target.value
      }) 
    }
   render(){
     return(
       <div>  
        <Grid container alignItems='center' 	direction='column'> 
        <Grid item xs={12} sm={6}>
         <Paper style={{padding:20}}
          >
          
         <div align="center" display="flex"   flexDirection="column" mt={1}>
          <AvatarTemp></AvatarTemp>
           <HeaderTemp></HeaderTemp>
         </div>
         <div mt={2}>
            <form onSubmit={this.handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Task title"
                name="title"
                autoComplete="title"
                autoFocus
                onChange={this.handleChange}
              />
              <TextField
                    onChange={this.handleChangeSelect}
                    value={this.state.platform}
                    select
                    fullWidth
                    id='platform'
                    name='platform'
                    label='platform'
                    required
                    margin="normal"
                    variant="outlined"
                    >
                    <MenuItem value={"facebook"}> 
                     <Chip
                    avatar={<Avatar src={'/img/platforms/facebook/logo.png'}></Avatar>}
                    label="Facebook"
                    clickable
                    color="primary"
                   />
                  </MenuItem>
                  <MenuItem value={"twitter"}> 
                     <Chip
                    avatar={<Avatar src={'/img/platforms/twitter/logo.png'}></Avatar>}
                    label="Twitter"
                    clickable
                    color="primary"
                   />
                  </MenuItem>
                  <MenuItem value={"youtube"}> 
                     <Chip
                    avatar={<Avatar src={'/img/platforms/youtube/logo.png'}></Avatar>}
                    label="YouTube"
                    clickable
                    color="primary"
                   />
                  </MenuItem>
                  <MenuItem value={"fiverr"}> 
                     <Chip
                    avatar={<Avatar src={'/img/platforms/fiverr/logo.png'}></Avatar>}
                    label="Fiverr"
                    clickable
                    color="primary"
                   />
                  </MenuItem>
                  <MenuItem value={"ebay"}> 
                   <Chip
                    avatar={<Avatar src={'/img/platforms/ebay/logo.png'}></Avatar>}
                    label="Ebay"
                    clickable
                    color="primary"
                    />
                  </MenuItem> 
                 <MenuItem value={"google"}> 
                     <Chip
                    avatar={<Avatar src={'/img/platforms/google/logo.png'}></Avatar>}
                    label="Google"
                    clickable
                    color="primary"
                   />
                </MenuItem>
              </TextField>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows="4"
                name="description"
                label="Description"
                id="description"
                autoComplete="description"
                onChange={this.handleChange}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="text"
                id="taskLink"
                label="Link to Task"
                name="taskLink"
                autoComplete="tasklink"
                onChange={this.handleChange}
              />
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              id="clientEmail"
              label="Client Email"
              name="clientEmail"
              autoComplete="client email"
              onChange={this.handleChange}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            id="clientName"
            label="Client Name"
            name="clientName"
            autoComplete="client_name"
            onChange={this.handleChange}
           />
           <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="number"
            id="clientContact"
            label="Client Contact Number"
            name="clientContact"
            autoComplete="0934903"
            onChange={this.handleChange}
           />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="numberOfSubmissionsRequired"
            label="Number of Siubmissions Required"
            name="numberofSubmissionsRequired"
            autoComplete={0}
            onChange={this.handleChange}
            type="number"
           />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="pointsAllocated"
            label="Points Allocated"
            name="pointsAllocated"
            autoComplete={0}
            onChange={this.handleChange}
            type="text"
           />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="gain"
            label="Gain"
            name="gain"
            autoComplete={0}
            onChange={this.handleChange}
            type="text"
           />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            InputLabelProps={{ shrink: true }} 
            id="deadline"
            label="Task Deadline"
            name="taskDeadline"
            autoComplete={0}
            
            onChange={this.handleChange}
            type="date"
          />
       
            <SubButttonTemp></SubButttonTemp>
            </form>
            </div>
            
            </Paper>
            </Grid>
            </Grid>
       </div>
     )
   }
}

const mapDispatchToProps=(dispatch)=>{
   return{
     addNewTask:(newTask)=>dispatch(addNewTask(newTask))
   }
}
const mapStateToProps=(state)=>{
  return{
    tasks:state.tasks
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (withTheme(AddTaskTemp));