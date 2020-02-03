import React  from 'react';
import {connect} from 'react-redux'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';
import SignIn from './components/auth/signin/SignIn';
import SignUp from './components/auth/signup/SignUp';
import PrimarySearchAppBar from './components/layout/navbar/AppBar'
import Task from './components/task/Task'
import LogInAdmin from './components/dashboard/admin/Login';
import AdminDashboard from './components/dashboard/admin/AdminDashboard';
import ProfileComponent from './components/profile/profilecomponent';
import ProfileComponentAdmin from './components/profile/adminprofile';
import {Link as RouterLink} from 'react-router-dom'
import SubmissionView from './components/dashboard/admin/taskview/Submission'
import ClaimsComponent from './components/dashboard/admin/claimscomponent'
import User from './components/dashboard/admin/user/user'


import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerIcon from '@material-ui/icons/Power';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import {getUser} from './store/actions/authActions'
import {Typography} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddTask from './components/dashboard/admin/AddTask';
import TasksPool from './components/dashboard/admin/taskspool/TasksPool'
import TaskAdmin from './components/dashboard/admin/taskview/Task'
import {ProtectedRoute} from './components/auth/protectedroute'
import {PrivateRoute} from './components/auth/protectedroute'
import auth from './components/auth/auth'
import Message from './components/layout/snackbar/Message'
import Reset from './components/auth/reset/Reset'
import ResetPwd from './components/auth/reset/ResetPwd'
import Accounts from './components/dashboard/accounts/Accounts'
import Customer from './components/chat/Messages'
import Support from './components/chat/MessageAdmin'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

/*styles*/
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  margin: {
    margin: theme.spacing(2),
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    border: 0.5,
    borderRadius: 6,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShiftAuthout:{
    marginLeft:0
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft:0,
    
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '@media (min-width: 780px)' : {
      marginLeft:drawerWidth
    },
    '@media (max-width: 400px)' : {
      marginLeft:0
    }
    

    
  },
  contentShiftAuthout:{
    marginLeft:0
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
}));


function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


 
function App(props){
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  
     return(
   
      <BrowserRouter>
       <div className="App">
       <React.Fragment>
       <CssBaseline />
       <HideOnScroll {...props}>
        <div><PrimarySearchAppBar func={handleDrawerOpen} open={open}></PrimarySearchAppBar></div> 
       </HideOnScroll>
      </React.Fragment>
      

     
      {auth.isAuthenticatedreviewer() ? <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
     >
     <div className={classes.drawerHeader}>
       <IconButton onClick={handleDrawerClose}>
         {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
       </IconButton>
     </div>
     <Divider />
     <List>  
        <Link></Link>
         <ListItem button >
         {props.picture ? <Avatar  alt="Remy Sharp" src={props.picture} className={classes.bigAvatar} />:<Avatar  alt="Remy Sharp" src='/img/profile.png' className={classes.bigAvatar}/>}
           <Typography component="h5" variant="h6">{props.user.firstname}  {props.user.lastname}</Typography>
         </ListItem>
     </List>
     <Divider />
     <List>
       <Link style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} className={classes.link} to='/profile'>
         <ListItem button  >
            <ListItemIcon><SettingsIcon/></ListItemIcon>
            <ListItemText primary="Profile" />
         </ListItem>
       </Link>
       <Link style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} className={classes.link} to='/dashboard'>
       <ListItem button  >
          <ListItemIcon><ColorLensIcon/></ListItemIcon>
          <ListItemText primary="Dashboard" />
       </ListItem>
     </Link>
     <Link style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} className={classes.link} to='/accounts'>
     <ListItem button  >
        <ListItemIcon><PowerIcon/></ListItemIcon>
        <ListItemText primary="Accounts" />
     </ListItem>
   </Link>
       
     </List>
   </Drawer> :<div>{auth.isAuthenticatedAdmin() ? <Drawer
   className={classes.drawer}
   variant="persistent"
   anchor="left"
   open={open}
   classes={{
     paper: classes.drawerPaper,
   }}
  >
  <div className={classes.drawerHeader}>
    <IconButton onClick={handleDrawerClose}>
      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </IconButton>
  </div>
  <Divider />
  <List>  
     <Link></Link>
      <ListItem button >
      {props.picture ? <Avatar  alt="Remy Sharp" src={props.picture} className={classes.bigAvatar} />:<Avatar  alt="Remy Sharp" src='/img/profile.png' className={classes.bigAvatar}/>}
        <Typography component="h5" variant="h6">{props.user.firstname}  {props.user.lastname}</Typography>
      </ListItem>
  </List>
  <Divider />
  <List>
    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} className={classes.link} to='/adminprofile'>
      <ListItem button  >
         <ListItemIcon><SettingsIcon/></ListItemIcon>
         <ListItemText primary="Profile" />
      </ListItem>
    </Link>
    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} className={classes.link} to='/dashboardadmin'>
    <ListItem button  >
       <ListItemIcon><ColorLensIcon/></ListItemIcon>
       <ListItemText primary="Dashboard" />
    </ListItem>
  </Link>
  <Link style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} className={classes.link} to='/addnewtasktemp'>
  <ListItem button  >
     <ListItemIcon><AssignmentIcon/></ListItemIcon>
     <ListItemText primary="Add New Task" />
  </ListItem>
   </Link>
   <Link style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} className={classes.link} to='/taskspool'>
  <ListItem button  >
     <ListItemIcon><AssignmentIcon/></ListItemIcon>
     <ListItemText primary="Tasks Pool" />
  </ListItem>
   </Link>
   <Link style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} className={classes.link} to='/claims'>
  <ListItem button  >
     <ListItemIcon><MonetizationOnIcon/></ListItemIcon>
     <ListItemText primary="Claims" />
  </ListItem>
   </Link>
  
   </List>
   </Drawer> : null}</div>}
  
     <div className={classes.drawerHeader} />
     <main
     className={clsx(classes.content, (auth.isAuthenticatedAdmin()|auth.isAuthenticatedreviewer()) ? {[classes.contentShift]: open, }: {[classes.contentShiftAuthout]: open, })}
      >
      <Switch>
        <Route  exact path='/' component={Home}/>
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path='/reset' component={Reset} />
        <Route path='/resetnewpwd/:token' component={ResetPwd} />
        <Route path='/support' component={Support}/>
        <Route path='/message' component={Customer} />
        <ProtectedRoute path='/dashboard'  component={Dashboard} />
        <ProtectedRoute path='/task'  component={Task} />
        <ProtectedRoute path='/accounts'  component={Accounts} />
        <Route path='/protectedloginadmin' component={LogInAdmin} />
        <PrivateRoute path='/dashboardadmin'  component={AdminDashboard} />
        <ProtectedRoute path='/profile'  component={ProfileComponent}/>
        <PrivateRoute path='/addnewtasktemp'  component={AddTask}/>
        <PrivateRoute path='/adminprofile'  component={ProfileComponentAdmin}/>
        <PrivateRoute path='/taskspool'  component={TasksPool}/>
        <PrivateRoute path='/taskview'  component={TaskAdmin}/>
        <PrivateRoute path='/submissionview' component={SubmissionView} />
        <PrivateRoute path='/claims' component={ClaimsComponent} />
        <PrivateRoute path='/user' component={User} />
     </Switch>
     <Message/>
      </main>
      </div>
      </BrowserRouter>    
     )
}
const mapStateToProps=(state)=>{
  return{
    user:state.auth.user,
    isLoggedIn:state.auth.isLoggedIn,
    loggedIndetails:{admin:state.auth.loggedInadmin,
            reviewer:state.auth.loggedInreviewer},
    picture:state.auth.picture
 
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    getUser:()=>dispatch(getUser()),

    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)

/*   <ListItem button>
       <ListItemIcon> 
        <Badge  badgeContent={1} color="primary">
          <MailIcon />
        </Badge>
       </ListItemIcon>
       <ListItemText primary="Messages" />
     </ListItem>*/

     