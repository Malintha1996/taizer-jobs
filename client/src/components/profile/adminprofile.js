import React,{Component} from 'react';
import {connect} from 'react-redux'
import AdminProfileTemp from './adminprofiletemp'
import {getUser,changeProfilePic} from '../../store/actions/authActions'

class ProfileComponent extends Component{
  
   componentDidMount(){
       this.props.getUser()   
   }
   handleChangeProfilePic=(files)=>{
    this.props.changeProfilePic(files[0])
   }

   render(){
       const {user}=this.props
     return(
       <div> 
          <AdminProfileTemp handleChangeProfilePic={this.handleChangeProfilePic} user={user} picture={this.props.picture} />
       </div>
     )
   }
}

const mapDispatchToProps=(dispatch)=>{
    return{
      getUser:(credentials)=>dispatch(getUser(credentials)),
      changeProfilePic:(picture)=>dispatch(changeProfilePic(picture))
    }
 }
 const mapStateToProps=(state)=>{
   return{
     user:state.auth.user,
     picture:state.auth.picture
   }
 }
 export default connect(mapStateToProps,mapDispatchToProps) (ProfileComponent);