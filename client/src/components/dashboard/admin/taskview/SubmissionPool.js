import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FullWidthTabs from '../../layout/Tab/TabPannel'
import SubmissionsTab from '../../layout/Tab/SubmissionTabPannel'


class SubmissionPool extends Component{
 
   render(){
     const {auth}=this.props
     if(!auth.isLoggedIn) {
       return (<Redirect to='/signin'></Redirect>)
     }else{
      return(
        <div>
          <Grid container spacing={3} alignItems='center' >
           <Grid  item xs={12} sm={6}>
             <SubmissionsTab></SubmissionsTab>
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
export default connect(mapStateToProps,null)(SubmissionPool);
