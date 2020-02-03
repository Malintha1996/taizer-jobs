import React,{Component} from 'react'
import {connect} from 'react-redux'
import {LoadTasks} from '../../../store/actions/taskAction'
import Task from  './TaskTemp'
import FList from '../../layout/FList'

class Tasks extends Component{
   
   componentDidMount(){
    this.props.LoadTasks()
   }
   render(){
        const {tasks}=this.props
        console.log(tasks,"vgfbv")
        const taskslist=()=>tasks.taskitems.map(task => {
        return (
        <div key={task.id}>
          <Task task={task}></Task>
        </div>
       )
      })

     return(

          <div >
            <FList taskslist={taskslist}></FList>
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
     LoadTasks:()=>dispatch(LoadTasks())
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(Tasks);