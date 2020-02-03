import React,{Component} from 'react'
import {connect} from 'react-redux'
import InCompletedTask from  './IncompletedTaskTemp'
import FList from '../../../layout/FList'
import { Container } from '@material-ui/core';


class InCompletedTasks extends Component{
   render(){
        const incompletedTasks=this.props.tasks
        const tasksitemslist=()=>incompletedTasks.map(task => {
        return (
          <div key={task.id}>
            <InCompletedTask task={task}></InCompletedTask>
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


export default  InCompletedTasks