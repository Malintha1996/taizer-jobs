import React,{Component} from 'react'
import {connect} from 'react-redux'
import {addPoints,loadUser, banUser} from '../../../../store/actions/authActions'
import UserTemp from './usertemp'

class User extends Component{
    userId=''
    componentDidMount(){
        let data={
          userId: this.props.location.state.userId
        }
        this.userId=this.props.location.state.userId
        this.props.loadUser(data)
    }
    handleAddPoints=(amount)=>{

      let obj={
        userId:this.userId,
        amount:amount
      }
      this.props.addPoints(obj)
    }
    handleBanUser=()=>{
      let data={
        status:true,
        userId:this.userId
       
      }
      this.props.banUser(data)
    }
    handleAllowUser=()=>{
      let data={
            status:false,
            userId:this.userId
            
      }
      this.props.banUser(data)
    }
    render(){
      const {user}=this.props
      console.log(user)
      return(
        <div>
           <UserTemp handleBanUser={this.handleBanUser} handleAddPoints={this.handleAddPoints} handleAllowUser={this.handleAllowUser} user={user}></UserTemp>
        </div>  

      )
    }
}
const mapStateToProps=(state)=>{
    return{
      user:state.auth.userobj
    }
}
const mapDispatchToProps=(dispatch)=>{
     return{
       loadUser:(userId)=>dispatch(loadUser(userId)),
       addPoints:(data)=>dispatch(addPoints(data)),
       banUser:(data)=>dispatch(banUser(data)),
     }
}
export default connect(mapStateToProps,mapDispatchToProps)(User)