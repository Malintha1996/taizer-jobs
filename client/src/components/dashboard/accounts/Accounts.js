import React,{Component} from 'react';
import {connect} from 'react-redux'
import AccountsTemp from './AccountsTemp'
import {addaccount} from '../../../store/actions/authActions'
import AddAccount from './AddAccount'




class Accounts extends Component{
  
   componentDidMount(){
   }
   render(){
     return(
       <div> 
          <AccountsTemp accounts={this.props.accounts}/>
          <AddAccount/>
       </div>
     )
   }
}

const mapDispatchToProps=(dispatch)=>{
    return{
    }
 }
 const mapStateToProps=(state)=>{
   return{
     user:state.auth.user,
     accounts:state.auth.accounts
   }
 }
 export default connect(mapStateToProps,mapDispatchToProps) (Accounts);