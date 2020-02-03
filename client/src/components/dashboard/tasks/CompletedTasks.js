import React,{Component} from 'react'
import {connect} from 'react-redux'
import {loadCompletedTasks} from '../../../store/actions/taskAction'
import CompletedTask from  './CompletedTaskTemp'
import FList from '../../layout/FList'



class CompletedTasks extends Component{
   
   componentDidMount(){
    this.props.loadCompletedTasks()
   }
   render(){
        const {tasks}=this.props
        const tasksitemslist=()=>tasks.completedTaskItems.map(task => {
        return (
          <div key={task.id}>
            <CompletedTask task={task}></CompletedTask>
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
     loadCompletedTasks:()=>dispatch(loadCompletedTasks())
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(CompletedTasks);