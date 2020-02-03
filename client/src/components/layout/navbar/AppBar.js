import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SignedInAppBar from './SignedInAppBar';
import SignedOutAppBar from './SignedOutAppBar';
import SignedInMobileAppBar from './SignedInMobileAppBar';
import SignedOutMobileAppBar from './SignedOutMobileAppBar';
import {connect} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import auth from '../../auth/auth'
import {Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link'

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
    drawerPaper: {
    width: drawerWidth,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
   appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background:'transparent',
    boxShadow: 'none',
 
  },
   appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background:'transparent',
    boxShadow: 'none'
  
  },
  appBarShiftAuthout:{
    marginLeft:0
  }, 
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
   toolbar: theme.mixins.toolbar,
    content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  image:{
   
  }
   
}));

const   PrimarySearchAppBar=(props)=> {
  const classes = useStyles();
  const links=(auth.isAuthenticatedAdmin() | auth.isAuthenticatedreviewer()) ? (<SignedInAppBar/>):(<SignedOutAppBar/>)
  const mobilelinks=(auth.isAuthenticatedAdmin() | auth.isAuthenticatedreviewer()) ? (<SignedInMobileAppBar/>):(<SignedOutMobileAppBar/>)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  
   

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    {mobilelinks}
    </Menu>
  );
 

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <AppBar  className={clsx(classes.appBar,(auth.isAuthenticatedAdmin()|auth.isAuthenticatedreviewer()) ? {[classes.appBarShift]: props.open, }: {[classes.appBarShiftAuthout]: props.open, })}>
        <Toolbar>
        {auth.isAuthenticatedAdmin() | auth.isAuthenticatedreviewer()  ? <IconButton
            edge="start"
            
            color="primary"
            aria-label="open drawer"
            onClick={props.func}
          > <MenuIcon />
          </IconButton>:null}
          <Link component={RouterLink} to='/'><img src="/img/logo/job1.png" alt="TaizerReviews" height="50" width="280"/></Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
                <div className="container">
                   {links}
               </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      
    </div>
  );
}
const mapStateToProps=(state)=>{
    return{
     
    }
  }
  export default connect(mapStateToProps,null)(PrimarySearchAppBar);