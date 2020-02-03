import ls from 'local-storage';
const initState={
  isLoggedIn:ls.get('authtoken')? (true):(false),
  authError:null,
  signupError:true,
  authSuccess:null,
  user:ls.get('user'),
  loggedInreviewer:false,
  loggedInadmin:false,
  picture:ls.get('picture'),
  resetgen:false,
  resetcreate:false,
  accounts:ls.get('user') ?ls.get('user').accounts:[],
  userobj:{
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
    address:'',
    country:'',
    postalcode:'',
    gainedPoints:'',
    completedTasks:''
}
}
const authReducer=(state=initState,action)=>{
   switch(action.type){
      case 'LOGIN_ERROR':
       return {
        ...state,
        authError:action.msg,

       } 
      case 'LOGIN_SUCCESS':
        console.log(action.user)
       return{
        ...state,
        authError: null,
        authSucess:"Login Successful",
        isLoggedIn:true,
        user:action.user,
        picture:action.user.profilepic,
        accounts:action.user.accounts
       }
      case 'SIGNUP_SUCCESS':
          return{
            ...state,
            signupError:false,
            signupErrorMsg:null
          }
      case 'SIGNUP_ERROR':
          return{
            ...state,
            signupErrorMsg: action.msg,
            signupError:true
          }
      case 'SIGNOUT_SUCCESS':
      return{
        ...state,
        isLoggedIn:false
      }
      case 'GET_USER_SUCCESS':
      return{
        ...state,
        user:action.user,
        
      }
      case 'GET_USER_ERROR':
      return{
        ...state,
        user:{_id:'',firstname:'',lastname:'',email:'',usertype:''}
      }
      case 'LOGGED_IN_DETAILS_REVIEWER':
      return{
        ...state,
        loggedInreviewer:action.reviewer
      }
      case 'LOGGED_IN_DETAILS_ADMIN':
      return{
        ...state,
        loggedInadmin:action.admin
      }
      case 'PROFILE_PIC_UPDATE_SUCCESS':
      return{
        ...state,
        picture:action.picture
      }
      case 'PROFILE_PIC_UPDATE_ERROR':
      return{
        ...state,
      }
      case 'RESETGEN_SUCCESS':
      return{
        ...state,
        resetgen:true
      }
      case 'RESETGEN_ERROR':
          return{
            ...state,
            resetgen:false
          }
      case 'RESET_CHANGEPWD_SUCCESS':
      return{
        ...state,
        resetcreate:true
      }
      case 'RESET_CHANGEPWD_ERROR':
          return{
            ...state,
            resetcreate:false
      }
      case 'ADD_ACCOUNT_SUCCESS':
      return{
        ...state,
        accounts:action.user.accounts
      }
      case 'ADD_ACCOUNT_ERROR':
          return{
            ...state,
      }
      case 'SET_POINT_VALUE_SUCCESS':
      return{
        ...state,
      }
      case 'SET_POINT_VALUE_ERROR':
          return{
            ...state,
      }
      case 'LOAD_USER_SUCCESS':
        return{
            ...state,
            userobj:action.user     
        }
        case 'LOAD_USER_ERROR':
        return{
            ...state,
            userobj:{}
        }
      case 'BAN_USER_SUCCESS':
      return{
        ...state,
        userobj:action.user
      }
      case 'BAN_USER_ERROR':
          return{
            ...state,
      }
      case 'ADD_POINTS_SUCCESS':
      return{
        ...state,
        userobj:action.user
      }
      case 'ADD_POINTS_ERROR':
          return{
            ...state,
      }
      default:
         return state
       }
}

export default authReducer;