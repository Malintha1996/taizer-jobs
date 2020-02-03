import React,{Component} from 'react'
import {connect} from 'react-redux'
import CompletedTask from  './CompletedTaskTemp'

import FList from '../../../layout/FList'
import { Container } from '@material-ui/core';


class CompletedTasks extends Component{
   render(){
        const completedTasks=this.props.tasks
        const tasksitemslist=()=>completedTasks.map(task => {
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


export default  CompletedTasks