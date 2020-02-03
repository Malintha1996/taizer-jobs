import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Tasks from './tasks/Tasks';
import AssignedTasks from './tasks/AssignedTasks'
import { Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import FullWidthTabs from '../layout/Tab/TabPannel'
import FullWidthTabsCompleted from '../layout/Tab/TabPannelCompleted';


class Dashboard extends Component{
 
   render(){
     const {auth}=this.props
     if(!auth.isLoggedIn) {
       return (<Redirect to='/signin'></Redirect>)
     }else{
      return(
        <div>
          <Grid container spacing={3}>
           <Grid  item xs={12} sm={6}>
             <FullWidthTabs></FullWidthTabs>
           </Grid>
           <Grid item xs={12} sm={6}>
             <FullWidthTabsCompleted></FullWidthTabsCompleted>
           </Grid>
          </Grid>
        </div>
      )
     }
   }
}
const mapStateToProps=(state)=>{
  return{
    auth:state.auth
  }
}
export default connect(mapStateToProps,null)(Dashboard);
