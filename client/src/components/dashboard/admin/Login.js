import React,{Component} from 'react';
import {LogIn} from '../../../store/actions/authActions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withTheme,makeStyles} from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link' ;
import {Link as RouterLink}  from 'react-router-dom';

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
   // marginLeft: theme.spacing(20),
    align:'center'
   },
 }))

const Copyright=()=>{
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link  to="/">
        Taizer
      </Link>
      {new Date().getFullYear()}
    </Typography>
  )
};
const AvatarTemp=()=>{
  const classes = useStyles();
   return ( <Avatar   className={classes.avatar}>
    <LockOutlinedIcon />
  </Avatar>)
}
const FormTemp=()=>{
  const classes = useStyles();
  return(<div className={classes.Form}>
    </div>)
}
const HeaderTemp=()=>{
 const classes = useStyles();
 return(<Typography component="h1" variant="h5" className={classes.header}>
             Sign in
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
  >  Sign In
  </Button>
  )
}
class LogInAdmin extends Component{   
    state={
      email:'',
      password:'',
    }
    handleSubmit=(e)=>{
      console.log(this.state)
        e.preventDefault()
        this.props.login(this.state)
    }
    handleChange=(e)=>{
      this.setState({
        [e.target.id]:e.target.value
      })
    }
   render(){
     const {auth}=this.props
     if(auth.isLoggedIn) {
      return (<Redirect to='/dashboardadmin'></Redirect>)
     }
     return(
       <div  >
       <Container component="main" maxWidth="xs">
       <CssBaseline />
        <div align="center" display="flex"    flexDirection="column" mt={8}>
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <SubButttonTemp></SubButttonTemp>
                <Grid container>
                  <Grid item xs>
                   <Link href="#" variant="body2">
                     Forgot password?
                  </Link>
                  </Grid>
                  <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
                  </Grid>
                </Grid>
            </form>
            </div>
          <Box mt={15}>
               {Copyright}
          </Box>
          <div>
             {auth.authError ? <p>{auth.authError}</p>:null}
          </div>
         </Container>
       </div>
     )
   }
}

const mapDispatchToProps=(dispatch)=>{
   return{
     login:(credentials)=>dispatch(LogIn(credentials))
   }
}
const mapStateToProps=(state)=>{
  return{
    auth:state.auth
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (withTheme(LogInAdmin));


