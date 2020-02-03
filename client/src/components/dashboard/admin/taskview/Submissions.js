import React,{Component} from 'react'
import {connect} from 'react-redux'
import {loadSubmissionsofTask} from '.././../../../store/actions/taskAction'

import FList from '../../../layout/FList'
import SubmissionTemplate from './SubmissionTemp'
import {acceptSubmission,rejectSubmission} from '../../../../store/actions/taskAction'

class Submissions extends Component{
   render(){   
        const {submissions}=this.props
        const submissionsList=()=>submissions.map(submission => {
        return (
        <div key={submissions._id}>
          <SubmissionTemplate  submission={submission}></SubmissionTemplate>
        </div>
    
       )
      })
     return(

          <div >
            <FList taskslist={submissionsList}></FList>
          </div>
          
     )
   }
    
   
}

const mapStateToProps=(state)=>{
  return{
    submissions:state.tasks.submissionsoftask,
  }
}

const mapDispatchToProps=(dispatch)=>{
   return{
     loadSubmissions:(taskId)=>dispatch(loadSubmissionsofTask(taskId)),

   }
}
export default connect(mapStateToProps,mapDispatchToProps)(Submissions);