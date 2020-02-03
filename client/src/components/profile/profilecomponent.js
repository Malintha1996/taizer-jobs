import React,{Component} from 'react';
import {connect} from 'react-redux'
import ProfileTemp from './profiletemp'
import {getUser,changeProfilePic} from '../../store/actions/authActions'
import { getPerformance } from '../../store/actions/taskAction';
import { loadHomeDetails } from '../../store/actions/taskAction';
import { claimPoints } from '../../store/actions/taskAction';

class ProfileComponent extends Component{
  
   componentDidMount(){
       this.props.getUser()
       this.props.getPerformance()
       this.props.loadHomeDetails()
       
   }
   handleChangeProfilePic=(files)=>{
    console.log(files)
    this.props.changeProfilePic(files[0])
   }
   handleClaimPoints=(obj)=>{
     this.props.claimPoints(obj)
   }

   render(){
       const {user}=this.props
       const {performance}=this.props
     return(
       <div> 
          <ProfileTemp handlePointsClaim={this.handleClaimPoints} handleChangeProfilePic={this.handleChangeProfilePic} user={user} picture={this.props.picture} performance={performance}  accounts={this.props.accounts}/>
       </div>
     )
   }
}

const mapDispatchToProps=(dispatch)=>{
    return{
      getUser:(credentials)=>dispatch(getUser(credentials)),
      getPerformance:()=>dispatch(getPerformance()),
      changeProfilePic:(picture)=>dispatch(changeProfilePic(picture)),
      loadHomeDetails:()=>dispatch(loadHomeDetails()),
      claimPoints:(obj)=>dispatch(claimPoints(obj)),
    }
 }
 const mapStateToProps=(state)=>{
   return{
     user:state.auth.user,
     performance:state.tasks.performance,
     picture:state.auth.picture,
     accounts:state.auth.accounts,
     pointval:state.tasks.home.pointValue
   }
 }
 export default connect(mapStateToProps,mapDispatchToProps) (ProfileComponent);
