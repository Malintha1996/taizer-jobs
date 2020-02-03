import React,{Component} from 'react'
import {connect} from 'react-redux'
import {loadAssignedTasks} from '../../../store/actions/taskAction'
import Task from  './TaskTemp'
import FList from '../../layout/FList'



class AssignedTasks extends Component{
   
   componentDidMount(){
    this.props.loadAssignedTasks()
   }
   render(){
        const {tasks}=this.props
        const tasksitemslist=()=>tasks.assignedTaskItems.map(task => {
        return (
          <div key={task.id}>
            <Task task={task}></Task>
          </div>
       )
     })

     return(

          <div >
            <FList taskslist={tasksitemslist}></FList>
          </div>
          
     )
   }
    
   
}

const mapStateToProps=(state)=>{
  return{
    tasks:state.tasks
  }
}

const mapDispatchToProps=(dispatch)=>{
   return{
     loadAssignedTasks:()=>dispatch(loadAssignedTasks())
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(AssignedTasks);