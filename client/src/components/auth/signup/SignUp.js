import React,{Component} from 'react';
import {connect} from 'react-redux'
import {register} from '../../../store/actions/authActions';
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {makeStyles} from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
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
    //marginLeft: theme.spacing(22),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  header: {
    marginTop:theme.spacing(8)
    //marginLeft: theme.spacing(20),
   },
}));
const Copyright=()=>{
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        Taizer
      </Link>{' '}
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

const HeaderTemp=()=>{
 const classes = useStyles();
 return(<Typography component="h1" variant="h5" className={classes.header}>
             Sign Up
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
    className={classes.submit}
  >
    Sign Up
  </Button>
  )
}
class SignUp extends Component{
    state={
      email:'',
      password:'',
      firstname:'',
      lastname:'',
      address:'',
      country:'',
      postalcode:''
    }
    handleSubmit=(e)=>{
      e.preventDefault()
      console.log(this.state)
      this.props.signup(this.state)
    }
    handleChange=(e)=>{
      console.log(this.state)
      this.setState({
        [e.target.id]:e.target.value
      })
    }
    handleChangeEmail=(e)=>{
      this.setState({
        [e.target.id]:e.target.value.toLowerCase()
      })
    }
   render(){
     const signupError=this.props.signupError
     const countries= ["","Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
	,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
	,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
	,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
	,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
	,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
	,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
	,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
	,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
	,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
	,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
	,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
	,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
	,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay"
	,"Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
     if(!signupError) {
      return <Redirect to='/signin'/>
      
     }return(
       
      <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div align="center" display="flex"    flexDirection="column" mt={8}>
        <AvatarTemp></AvatarTemp>
        <HeaderTemp></HeaderTemp>
      </div>
        <form onSubmit={this.handleSubmit} >
          <Grid container spacing={2}>
           <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                onChange={this.handleChangeEmail}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                autoComplete="lname"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                rows="4"
                multiline
                id="address"
                label="Address"
                autoComplete="address"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                select
                required
                fullWidth
                value={this.state.country}
                id="country"
                label="Country"
                autoComplete="country"
                SelectProps={{
                  native: true,
                }}
                onChange={this.handleChange}
              >
              {countries.map(option => (
                <option  value={option}>
                  {option}
                </option>
              ))}
              </TextField>
           </Grid>
           <Grid item xs={12} sm={6}>
           <TextField
             variant="outlined"
             required
             fullWidth
             id="postalcode"
             label="Postal Code"
             type="number"
             autoComplete="postal-code"
             onChange={this.handleChange}
           />
         </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Mobile Number"
                type="number"
                id="phone"
                autoComplete="XXX-XXXXXXX"
                onChange={this.handleChange}
              />
              </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
            </Grid>
            <SubButttonTemp></SubButttonTemp>
            <Grid  container justify="">
             <Grid item>
              <Link component={RouterLink} to="/signin" variant="body2">
               Already have an account? Sign in
             </Link>
            </Grid>
          </Grid>
        </form>
      <Box mt={5}>
       {Copyright}
      </Box>
    </Container>
     )
   }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    signup:(data)=>dispatch(register(data))
  }
}
const mapStateToProps=(state)=>{
  return{
    signupError:state.auth.signupError,
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (SignUp);


