
const initState={
      taskitems:[],
      assignedTaskItems:[],
      completedTaskItems:[],
      taskError:null,
      task:{
          _id:'',
          title:'',
          description:'',
          deadline:'',
          submittedList:[],
          selectedList:[{
              _id:'',
               proof:[],
               acceptance:''
          }],
          client:{
              email:'',
              name:'',
              contact:''
          },
          gain:'',
          taskLink:''
      },
      addTaskStatus:false,
      proofSubmissionStatus:false,
      taskspool:{
          completedTasks:[],
          incompletedTasks:[]
      },
      submissionsoftask:[],
      submissionAct:null,
      performance:{
          points:0,
          count:0
      },
      home:{
          numberOfReviewers:0,
          numberOfTasksCompleted:0,
          numberOfPointsDistributed:0,
          pointValue:0,
          topFive:[{
              name:'',
              profile:'',
              tasks:''
          }]
      }
      ,
      reviewers:[],
      claims:[],
      pointValue:0,
      submission:null
     
  
}
const taskReducer=(state=initState,action)=>{
    switch(action.type){
        case 'TASK_ERROR':
         
         return {
          ...state,
          taskError:action.msg
         } 
        case 'TASK_SUCCESS':
         return{
          ...state,
          taskitems:action.tasks,
         
         }
        case 'GET_TASK_SUCCESS':
        return{
            ...state,
            task:action.task,
            submissionsoftask:action.submissions
            
        } 
        case 'GET_TASK_ERROR':
        return {
            ...state,
            taskError:action.msg
        }
        case 'ASSIGN_USER_SUCCESS':
        return {
            ...state,
        }
        case 'ASSIGN_USER_ERROR':
        return {
            ...state,
        }
        case 'GET_ASSIGN_TASKS_SUCCESS':
         return{
            ...state,
            assignedTaskItems:action.data
         }
        case 'GET_ASSIGN_TASKS_ERROR':
            return{
                ...state,
                assignedTaskItems:[]
            }
        case 'ADD_NEW_TASK_SUCCESS':
                return{
                    ...state,
                    addTaskStatus:true
                }
        case 'ADD_NEW_TASK_ERROR':
        return{
            ...state,
            addTaskStatus:false
        }
        case 'PROOF_TASK_SUBMIT_SUCCESS':
                return{
                    ...state,
                    proofSubmissionStatus:true,
                    task:action.task,
                    submission:action.submission
        }
        case 'PROOF_TASK_SUBMIT_ERROR':
                return{
                    ...state,
                    proofSubmissionMsg:action.msg,
                    proofSubmissionStatus:false
        }
        case'GET_COMPLETED_TASKS_SUCCESS':
        return{
            ...state,
            completedTaskItems:action.data
        }
        case'GET_COMPLETED_TASKS_ERROR':
        return{
            ...state,
            completedTaskItems:[]
        }
        case'GET_FULLY_COMPLETED_TASKS_SUCCESS':
        return{
            ...state,
            fullycompletedTaskItems:action.data
        }
        case'GET_FULLY_COMPLETED_TASKS_ERROR':
        return{
            ...state,
            fullycompletedTaskItems:[]
        }
        case 'LOAD_SUBMISSIONS_OF_TASK_SUCCESS':
        return{
             ...state,
             submissionsoftask:action.submissions
        } 
        case 'LOAD_SUBMISSIONS_OF_TASK_ERROR':
        return{
             ...state,
             submissionsoftask:[]
        }
        case 'LOAD_TASKS_POOL_SUCCESS':
        return{
          ...state,
          taskspool:{
              completedTasks:action.completedTasks,
              incompletedTasks:action.incompletedTasks
          }

        }    
        case 'LOAD_TASKS_POOL_ERROR':
        return{
          ...state,
        }  
        case 'ACCEPT_SUBMISSION_SUCCESS':
        return{
          ...state,
          submissionAct:action.msg,
          submission:action.submission
        }
        case 'ACCEPT_SUBMISSION_ERROR':
        return{
          ...state,
          submissionAct:action.msg
        }
        case 'REJECT_SUBMISSION_SUCCESS':
        return{
          ...state,
          submissionAct:action.msg,
          submission:action.submission
        }
        case 'REJECT_SUBMISSION_ERROR':
        return{
          ...state,
          submissionAct:action.msg
        }
        case 'GET_PERFORMANCE_SUCCESS':
            console.log(action)
            return{
              ...state,
              performance:{
                  points:action.points,
                  count:action.count
              }
            }
        case 'GET_PERFORMANCE_ERROR':
            return{
              ...state,
              performance:{
                  points:0,
                  count:0
              }
            }
        case 'GET_HOME_DETAILS_SUCCESS':
        return{
                ...state,
                home:action.data,
                pointValue: action.data.pointValue
        }
        case 'GET_HOME_DETAILS_ERROR':
        return{
            ...state,
            home:{
                    numberOfReviewers:0,
                    numberOfTasksCompleted:0,
                    numberOfPointsDistributed:0,
                    pointValue:0,
                    topFive:[]
            },
            pointValue:0
        }
        case 'GET_REVIEWERS_INFO_SUCCESS':
        return{
                    ...state,
                    reviewers:action.reviewers
        }
        case 'GET_REVIEWERS_INFO_ERROR':
        return{
            ...state,
            reviewers:[]
        }
        case 'LOAD_CLAIMS_SUCCESS':
            return{
                    ...state,
                    claims:action.claims
        }
        case 'LOAD_CLAIMS_ERROR':
        return{
            ...state,
            claims:[]
        }
        case 'TOGGLE_PAUSE_SUCCESS':
            return{
                    ...state,
                    task:action.task
            }
        case 'TOGGLE_PAUSE_ERROR':
        return{
            ...state
        }
        case 'EXTEND_DEADLINE_SUCCESS':
            return{
                    ...state,
                    task:action.task
            }
        case 'EXTEND_DEADLINE_ERROR':
        return{
            ...state
        }
        case 'DELETE_TASK_SUCCESS':
        return{
            ...state,
            task:action.task
        }
        case 'DELETE_TASK_ERROR':
                return{
                    ...state,
                }
        case 'PAY_CLAIM_SUCCESS':
                return{
                    ...state,
                }   
        case 'PAY_CLAIM_ERROR':
                return{
                    ...state,
                }
        case 'CHANGE_POINT_VALUE_SUCCESS':
        return{
            ...state,
            pointValue:action.value     
        }
        case 'CHANGE_POINT_VALUE_ERROR':
        return{
            ...state,
            pointValue:0
        }
        default:
           return state
        }
}
export default taskReducer;