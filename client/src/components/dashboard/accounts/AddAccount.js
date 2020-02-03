import React,{Component} from 'react';
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withTheme,makeStyles} from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Message from '../../layout/snackbar/Message'
import Grid from '@material-ui/core/Grid'
import AssignmentIcon from '@material-ui/icons/Assignment';
import {addaccount} from '../../../store/actions/authActions'
import AddIcon from '@material-ui/icons/Add';

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
             Add New Account
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
  >  Add Account
  </Button>
  )
}
const AvatarTemp=()=>{
  const classes = useStyles();
   return ( <Avatar   className={classes.avatar}>
    <AddIcon/> 
  </Avatar>)
}




class AddAccount extends Component{   
    state={
      platform:'',
      username:'',
      profilelink:''
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.addaccount(this.state)
        this.setState({
          'platform':'',
          'username':'',
          'profilelink':''
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
              type="text"
              id="username"
              label="Username"
              name="username"
              value={this.state.username}
              autoComplete="username"
              onChange={this.handleChange}
            />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="text"
                id="profilelink"
                label="Profile Link"
                name="profilelink"
                value={this.state.profilelink}
                autoComplete="profilelink"
                onChange={this.handleChange}
              />
        
            <SubButttonTemp></SubButttonTemp>
            </form>
            </div>
            
            </Paper>
            <div>
            </div>
            </Grid>
            </Grid>
       </div>
     )
   }
}

const mapDispatchToProps=(dispatch)=>{
   return{
     addaccount:(newAccount)=>dispatch(addaccount(newAccount))
   }
}
const mapStateToProps=(state)=>{
  return{
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (withTheme(AddAccount));