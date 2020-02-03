import React,{Component} from 'react'
import {LoadTask} from '../../../../store/actions/taskAction'
import {assignUserToTask} from '../../../../store/actions/taskAction'
import {connect} from 'react-redux'
import { Container,Paper,Typography, Button} from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {green} from '@material-ui/core/colors'
import PaperSheet from './TaskTemp'
import {getUser} from '../../../../store/actions/authActions'
import {submitProofTask} from '../../../../store/actions/taskAction'
import {togglePause,extendDeadline,deleteTask} from '../../../../store/actions/taskAction'
import {Redirect} from 'react-router-dom'



class TaskAdmin extends Component{
   

    componentDidMount(){
        const taskId={
          taskId: this.props.location.state.taskId
        }
        this.props.LoadTask(taskId)
        this.props.getUser()
    }
    pauseTask=(status,taskId)=>{
      this.props.togglePause(status,taskId)
    }
    hanldeExtendDeadline=(deadline,taskId)=>{
      this.props.extendDeadline(deadline,taskId)
    }
    handleDeleteTask=(taskId)=>{
      this.props.deleteTask(taskId)
    }
    render(){
      if(this.props.tasks.task.deleted) {
        return (<Redirect to='/taskspool'></Redirect>)
       }
      const {tasks}=this.props
      const task=tasks.task
      return(
        <div>
           <PaperSheet handleDeleteTask={this.handleDeleteTask} handlePauseTask={this.pauseTask}  handleExtendDeadline={this.hanldeExtendDeadline} task={task}></PaperSheet>
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
       togglePause:(status,taskId)=>dispatch(togglePause(status,taskId)),
       extendDeadline:(deadline,taskId)=>dispatch(extendDeadline(deadline,taskId)),
       deleteTask:(taskId)=>dispatch(deleteTask(taskId))
     }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskAdmin)