import React,{Component} from 'react'
import {LoadTask} from '../../store/actions/taskAction'
import {assignUserToTask} from '../../store/actions/taskAction'
import {connect} from 'react-redux'
import { Container} from '@material-ui/core';
import PaperSheet from './TaskTemp'
import {getUser} from '../../store/actions/authActions'
import {submitProofTask} from '../../store/actions/taskAction'
import Loader from 'react-loader-spinner'


class Task extends Component{
    componentDidMount(){
        const taskId={
          taskId: this.props.location.state.taskId
        }
        this.props.LoadTask(taskId)
        this.props.getUser() 
    }
    handleSubmitProof=(files)=>{
      this.props.submitProofTask(files,this.props.tasks.task._id)   
    }
    render(){
      const {tasks}=this.props
      const {user}=this.props
      const task=tasks.task
      const taskCompletionStatusObject = task.submittedList.filter(function(obj) {
        return obj.userId === user._id;
      });
      var taskCompletionStatus=false
      var taskAcceptance=false
      var taskRejection=false
      if(taskCompletionStatusObject.length!=0){
         taskCompletionStatus=true
         taskAcceptance=taskCompletionStatusObject[0].acceptance
         taskRejection=taskCompletionStatusObject[0].rejection
      }
      return(
        <div>
         <Container maxWidth="m">
           <PaperSheet taskAcceptance={taskAcceptance} taskRejection={taskRejection} taskCompletionStatus={taskCompletionStatus}  handleSubmitProof={this.handleSubmitProof}  task={task}></PaperSheet>
           </Container>
        </div>  

      )
    }
}
const mapStateToProps=(state)=>{
    return{
      tasks:state.tasks,
      user:state.auth.user
    }
}
const mapDispatchToProps=(dispatch)=>{
     return{
       LoadTask:(taskId)=>dispatch(LoadTask(taskId)),
       getUser:()=>dispatch(getUser()),
       submitProofTask:(files,taskId)=>dispatch(submitProofTask(files,taskId))
     }
}
export default connect(mapStateToProps,mapDispatchToProps)(Task)