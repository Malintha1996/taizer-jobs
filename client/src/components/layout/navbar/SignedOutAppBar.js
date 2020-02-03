import React from 'react';
import {NavLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';

const SignedOut=()=>{

     return(
       <div>
          <IconButton  color="primary">
            <Badge color="secondary">
             <Link component={NavLink} color="inherit" to='/signin'><AccountCircleIcon/></Link>   
            </Badge>
          </IconButton>
          <IconButton  color="primary">
           <Badge color="secondary">
            <Link component={NavLink}  color="inherit"  to='/signup'><AssignmentRoundedIcon/></Link>   
           </Badge>
          </IconButton>
        </div>
     )
   
}

export default SignedOut;