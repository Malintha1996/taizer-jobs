import React from 'react';
import {NavLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

const SignedOut=()=>{

     return(
       <div>
       <MenuItem>
       <IconButton  color="primary">
       <Badge color="secondary">
         <Link component={NavLink} to='/signin'><AccountCircleIcon/></Link>
        </Badge>
       </IconButton>
      </MenuItem>
      <MenuItem>
      <IconButton  color="primry">
       <Badge color="secondary">
       <Link component={NavLink} to='/signup'><AssignmentRoundedIcon/></Link>
       </Badge>
      </IconButton>
     </MenuItem>
        </div>
     )
   
}

export default SignedOut;