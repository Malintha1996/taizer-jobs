import React,{Component} from 'react'
import {connect} from 'react-redux'
import {loadClaims} from '../../../store/actions/taskAction'
import ClaimTemp from  './claimtemp'
import FList from '../../layout/FList'



class Claim extends Component{
   
   componentDidMount(){
    this.props.loadClaims()
   }
   render(){
        const {claims}=this.props
        const claimslist=()=>claims.map(claim => {
        return (
          <div key={claim.id}>
            <ClaimTemp claim={claim}></ClaimTemp>
          </div>
       )
     })
     return(

          <div >
            <FList taskslist={claimslist}></FList>
          </div>
          
     )
   }
    
   
}

const mapStateToProps=(state)=>{
  return{
    claims:state.tasks.claims
  }
}

const mapDispatchToProps=(dispatch)=>{
   return{
     loadClaims:()=>dispatch(loadClaims())
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(Claim);