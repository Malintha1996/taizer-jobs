import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Logout} from '../../../store/actions/authActions'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Link from '@material-ui/core/Link'
import ColorLensIcon from '@material-ui/icons/ColorLens';
const SignedInAppBar=(props)=>{
     return(
      <div>
        <IconButton  color="primary">
          <Badge color="secondary">
           <Link component={NavLink} color="inherit" to='/dashboard'> <ColorLensIcon/></Link>   
         </Badge>
         </IconButton>
         <IconButton  color="primary">
           <Badge color="secondary">
           <Link component={NavLink} color="inherit" onClick={props.logout} to='/'><ExitToAppRoundedIcon/></Link>   
         </Badge>
        </IconButton>
       </div>
     )  
} 

const mapDispatchToProps=(dispatch)=>{
  return{
    logout:()=>dispatch(Logout())
  }
}

export default connect(null,mapDispatchToProps) (SignedInAppBar);