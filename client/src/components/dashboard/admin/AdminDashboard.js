import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { Container } from '@material-ui/core';
import ReviewersTab from './ReviewersTab'
import PointValue from './pointvalue'
import {loadHomeDetails} from '../../../store/actions/taskAction'

class AdminDashboard extends Component{
   componentDidMount(){
      this.props.loadHomeDetails()
   }
   render(){
     const {auth}=this.props
     if(!auth.isLoggedIn && !this.props.usertype==="admin") {
       return (<Redirect  to='/signin'></Redirect>)
     }else{
      return(
        <div>
        <Container> 
          <ReviewersTab/>
          <PointValue pointVal={this.props.PointValue}/>
        </Container> 
        </div>
      )
     }
   }
}
const mapStateToProps=(state)=>{
  return{
    auth:state.auth,
    usertype:state.auth.user.usertype,
    pointValue:state.tasks.home.pointValue
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    loadHomeDetails:()=>dispatch(loadHomeDetails())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AdminDashboard);
