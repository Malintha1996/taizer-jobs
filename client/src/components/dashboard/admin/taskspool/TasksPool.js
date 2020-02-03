import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {loadTaskspool} from '../../../../store/actions/taskAction'
import IncompletedTab from './IncompletedTabPannel'
import CompletedTab from './CompletedTabPannel'



class TasksPool extends Component{
    componentDidMount(){
        this.props.loadTaskspool()
    }
   render(){
     const {auth}=this.props
     const {taskspool}=this.props
     if(!auth.isLoggedIn) {
       return (<Redirect to='/signin'></Redirect>)
     }else{
      
      return(
        <div>
          <Grid container spacing={3} alignItems='center' >
           <Grid  item xs={12} sm={6}>
             <IncompletedTab tasks={taskspool.incompletedTasks}></IncompletedTab>
           </Grid>
           <Grid  item xs={12} sm={6}>
             <CompletedTab tasks={taskspool.completedTasks}></CompletedTab>
           </Grid>
          </Grid>
        </div>
      )
     }
   }
}
const mapStateToProps=(state)=>{
  return{
    auth:state.auth,
    taskspool:state.tasks.taskspool
  }
}
const mapDispatchToProps=(dispatch)=>{
    return{
      loadTaskspool:()=>dispatch(loadTaskspool())
    }
 }
export default connect(mapStateToProps,mapDispatchToProps)(TasksPool);
