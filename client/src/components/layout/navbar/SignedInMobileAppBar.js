import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Logout} from '../../../store/actions/authActions'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link'
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import ColorLensIcon from '@material-ui/icons/ColorLens';
const SignedInMobileAppBar=(props)=>{

     return(
        <div>
        <MenuItem>
        <IconButton color="primary">
          <Link component={NavLink} to='/dashboard'><ColorLensIcon/></Link>
        </IconButton>
       </MenuItem>
       <MenuItem>
       <IconButton color="primry">
         <Link component={NavLink} onClick={props.logout} to='/'><ExitToAppRoundedIcon/></Link>
       </IconButton>
      </MenuItem>
      </div>
     )
   
} 

const mapDispatchToProps=(dispatch)=>{
  return{
    logout:()=>dispatch(Logout())
  }
}
export default connect(null,mapDispatchToProps) (SignedInMobileAppBar);