import axios from 'axios'
import ls from 'local-storage'

export const LoadTasks=()=>{
    return (dispatch,getState)=>{
        var token=ls.get('authtoken')
        axios.get('users/gettasksofreviewer',{ headers: { Authorization:token } })
        .then(function (response) {
         if(response.data.success){
             dispatch({type:'TASK_SUCCESS',tasks:response.data.tasks});
         }
         else{
             dispatch({type:'TASK_ERROR',msg:response.data.msg});
         }
         
        });
        
    }
}

export const LoadTask=(taskId)=>{
    return (dispatch,getState)=>{
        var token=ls.get('authtoken')
        axios.post('users/loadtask',taskId,{ headers: { Authorization:token } })
        .then(function (response) {
         if(response.data.success){
             dispatch({type:'GET_TASK_SUCCESS',task:response.data.task,submissions:response.data.submissions});
         }
         else{
             dispatch({type:'GET_TASK_ERROR',msg:response.data.msg});
         }        
        });
        
    }
}

//enroll
export const assignUserToTask=(taskId)=>{
    return ((dispatch,getState)=>{
        var token=ls.get('authtoken')
        axios.post('users/assignusertotask',taskId,{ headers: { Authorization:token } })
        .then(function (response) {
         if(response.data.success){
             Promise.all([dispatch({type:'ASSIGN_USER_SUCCESS',data:response.data.task}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})])
         }
         else{
             Promise.all([dispatch({type:'ASSIGN_USER_ERROR',data:response.data.msg}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"})])
         }
        })
    })
} 

export const loadAssignedTasks=()=>{
    return ((dispatch,getState)=>{
        var token=ls.get('authtoken')
        axios.get('users/getassignedtasks',{ headers: { Authorization:token } })
        .then(function (response) {
         if(response.data.success){
             dispatch({type:'GET_ASSIGN_TASKS_SUCCESS',data:response.data.tasks});
         }
         else{
             dispatch({type:'GET_ASSIGN_TASKS_ERROR',data:response.data.msg});
         }
        })
    })
} 

export const loadCompletedTasks=()=>{
    return ((dispatch,getState)=>{
        
        var token=ls.get('authtoken')
        axios.get('users/completedtasks',{ headers: { Authorization:token } })
        .then(function (response) {
         if(response.data.success){
             dispatch({type:'GET_COMPLETED_TASKS_SUCCESS',data:response.data.tasks});
         }
         else{
             dispatch({type:'GET_COMPLETED_TASKS_ERROR',data:response.data.msg});
         }
        })
    })
} 

export const loadFullyCompltedTasks=()=>{
    return ((dispatch,getState)=>{
        
        var token=ls.get('authtoken')
        axios.get('users/getfullycompltedtasks',{ headers: { Authorization:token } })
        .then(function (response) {
         if(response.data.success){
             dispatch({type:'GET_FULLY_COMPLETED_TASKS_SUCCESS',data:response.data.tasks});
         }
         else{
             dispatch({type:'GET_FULLY_COMPLETED_TASKS_ERROR',data:response.data.msg});
         }
        })
    })
} 

export const addNewTask=(task)=>{
    return ((dispatch,getState)=>{
        var token=ls.get('authtoken')
        axios.post('users/addtask',task,{ headers: { Authorization:token } })
        .then(function (response) {
         if(response.data.success){
             Promise.all([dispatch({type:'ADD_NEW_TASK_SUCCESS',data:response.data.task}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})])
         }
         else{
             Promise.all([dispatch({type:'ADD_NEW_TASK_ERROR',data:response.data.msg}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"})])
         }
        })
    })
} 

export const loadSubmissionsofTask=(taskId)=>{
    var token=ls.get('authtoken')
    return (dispatch,getState)=>{
        axios.post('users/loadsubmissionsoftask',{taskId:taskId},{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            dispatch({type:'LOAD_SUBMISSIONS_OF_TASK_SUCCESS',submissions:response.data.submissions});
           }
           else{
            dispatch({type:'LOAD_SUBMISSIONS_OF_TASK_ERROR',msg:response.data.msg});
           
           }
        });
    }
}


export const loadTaskspool=()=>{
    var token=ls.get('authtoken')
    return (dispatch,getState)=>{
        axios.get('users/taskspool',{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            dispatch({type:'LOAD_TASKS_POOL_SUCCESS',incompletedTasks:response.data.incompletedTasks,completedTasks:response.data.completedTasks});
           }
           else{
            dispatch({type:'LOAD_TASKS_POOL_ERROR',msg:response.data.msg}); 
           }
        });
    }
}



export const claimPoints=(obj)=>{
    var token=ls.get('authtoken')
    return (dispatch,getState)=>{
        axios.post('users/claimpoints',obj,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            Promise.all([dispatch({type:'CLAIM_POINTS_SUCCESS',msg:response.data.msg}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})]) 
           }
           else{
            Promise.all([dispatch({type:'CLAIM_POINTS_ERROR',data:response.data.msg}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"})])
           }
        });
    }
}
export const payClaim=(file,claim)=>{
    var token=ls.get('authtoken')
    var obj={
      file:file,
      payObj:claim
    }
    return (dispatch,getState)=>{
        axios.post('users/payclaim',obj,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            Promise.all([dispatch({type:'PAY_CLAIM_SUCCESS',msg:response.data.msg}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})]) 
           }
           else{
            Promise.all([dispatch({type:'PAY_CLAIM_ERROR',msg:response.data.msg}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"})])
           }
        });
    }
}
export const changePointValue=(value)=>{
    var token=ls.get('authtoken')
    var obj={
       value:value
    }
    return (dispatch,getState)=>{
        axios.post('users/setpointvalue',obj,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            Promise.all([dispatch({type:'CHANGE_POINT_VALUE_SUCCESS',value:response.data.value}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})]) 
           }
           else{
            Promise.all([dispatch({type:'CHANGE_POINT_VALUE_ERROR',msg:response.data.msg}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"})])
           }
        });
    }
}




export const loadClaims=()=>{
    var token=ls.get('authtoken')
    return (dispatch,getState)=>{
        axios.get('users/loadclaims',{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
              dispatch({type:'LOAD_CLAIMS_SUCCESS',msg:response.data.msg,claims:response.data.claims})
           }
           else{
             dispatch({type:'LOAD_CLAIMS_ERROR',data:response.data.msg})
           }
        });
    }
}


export const rejectSubmission=(taskId,submissionId)=>{
    var token=ls.get('authtoken')
    return (dispatch,getState)=>{
        var rejectparams={
            taskId:taskId,
            submissionId:submissionId
        }
        axios.post('users/rejectsubmission',rejectparams,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            Promise.all([dispatch({type:'REJECT_SUBMISSION_SUCCESS',msg:response.data.msg,submission:response.data.submission}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})]) 
           }
           else{
            Promise.all([dispatch({type:'REJECT_SUBMISSION_ERROR',msg:response.data.msg}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"})]) 
           }
        });
    }
}

export const acceptSubmission=(taskId,submissionId)=>{
    var token=ls.get('authtoken')
    return (dispatch,getState)=>{
        var acceptparams={
            taskId:taskId,
            submissionId:submissionId
        }
        axios.post('users/acceptsubmission',acceptparams,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            Promise.all([dispatch({type:'ACCEPT_SUBMISSION_SUCCESS',msg:response.data.msg,submission:response.data.submission}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})]) 
           }
           else{
            Promise.all([dispatch({type:'ACCEPT_SUBMISSION_ERROR',msg:response.data.msg}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"})]) 
           }
        });
    }
}


export const submitProofTask=(files,taskId)=>{
    return (dispatch,getState)=>{
        var filesdata={
            files:files,
            taskId:taskId
        }
        var token=ls.get('authtoken')
        axios.post('users/submitprooftask',filesdata,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            Promise.all([dispatch({type:'PROOF_TASK_SUBMIT_SUCCESS',msg:response.data.msg,task:response.data.task,submission:response.data.submission}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})]) 
           }
           else{
            Promise.all([dispatch({type:'PROOF_TASK_SUBMIT_ERROR',msg:response.data.msg}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"})]) 
           }
        });
       
    }
 }

 export const getPerformance=()=>{
    var token=ls.get('authtoken')
    return (dispatch,getState)=>{
        axios.get('users/getperformance',{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            dispatch({type:'GET_PERFORMANCE_SUCCESS',points:response.data.points,count:response.data.count});
           }
           else{
            dispatch({type:'GET_PERFORMANCE_ERROR',msg:response.data.msg}); 
           }
        });
    }
 }
 export const getReviewers=()=>{
    var token=ls.get('authtoken')
    return (dispatch,getState)=>{
        axios.get('users/getreviewers',{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            dispatch({type:'GET_REVIEWERS_INFO_SUCCESS',reviewers:response.data.reviewers});
           }
           else{
            dispatch({type:'GET_REVIEWERS_INFO_ERROR',msg:response.data.msg}); 
           }
        });
    }
 }


 export const loadHomeDetails=()=>{
    return (dispatch,getState)=>{
        axios.get('users/gethomedetails')
        .then(function (response) {
           if(response.data.success){
            dispatch({type:'GET_HOME_DETAILS_SUCCESS',data:response.data.data});
           }
           else{
            dispatch({type:'GET_HOME_DETAILS_ERROR',msg:response.data.msg}); 
           }
        });
    }
 }
 //danger zone

 export const togglePause=(stat,taskId)=>{
    return (dispatch,getState)=>{
        var toggle={
            status:stat,
            taskId:taskId
        }
        var token=ls.get('authtoken')
        axios.post('users/togglepause',toggle,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            Promise.all([dispatch({type:'TOGGLE_PAUSE_SUCCESS',task:response.data.task}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})]); 
           }
           else{
            Promise.all([dispatch({type:'TOGGLE_PAUSE_ERROR',msg:response.data.msg}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"})]); 
           }
        });
       
    }
 }

 export const extendDeadline=(deadline,taskId)=>{
    return (dispatch,getState)=>{
        var data={
            deadline:deadline,
            taskId:taskId
        }
        var token=ls.get('authtoken')
        axios.post('users/extenddeadline',data,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
              

            Promise.all([dispatch({type:'EXTEND_DEADLINE_SUCCESS',task:response.data.task}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})]); 
           }
           else{
            Promise.all([dispatch({type:'EXTEND_DEADLINE_ERROR',msg:response.data.msg}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"})]); 
           }
        });
       
    }
 }
 export const deleteTask=(taskId)=>{
    return (dispatch,getState)=>{
        var data={
            taskId:taskId
        }
        var token=ls.get('authtoken')
        axios.post('users/deletetask',data,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            var newtask= response.data.task
            newtask.deleted=true
            console.log(newtask)
            Promise.all([dispatch({type:'DELETE_TASK_SUCCESS',task:newtask}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})]); 
           }
           else{
            Promise.all([dispatch({type:'DELETE_TASK_ERROR',msg:response.data.msg}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"})]); 
           }
        });
       
    }
 }




