import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getReviewers} from '../../../store/actions/taskAction'
import ReviewerTemp from './ReviwersTemp'
import FList from '../../layout/FList'
import ReviewersTable from './Filter'
import { Typography } from '@material-ui/core'



class ReviewersTemp extends Component{
   
   componentDidMount(){
     this.props.getReviewers()
   }
   render(){
        const {reviewers}=this.props
        const reviewerslist=()=>reviewers.map(reviewer => {
        return (
          reviewer.link=<Typography>chfdchf</Typography>
        )
      
     })
     return(

          <div >
            <ReviewersTable reviewers={reviewers}></ReviewersTable>
          </div>
          
     )
   }
    
   
}

const mapStateToProps=(state)=>{
  return{
    reviewers:state.tasks.reviewers
  }
}

const mapDispatchToProps=(dispatch)=>{
   return{
     getReviewers:()=>dispatch(getReviewers())
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(ReviewersTemp);