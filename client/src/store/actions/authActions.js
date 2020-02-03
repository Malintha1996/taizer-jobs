import axios from 'axios'
import ls from 'local-storage'
import ss from 'sessionstorage'
import auth from '../../components/auth/auth'
export const LogIn=(credentials)=>{
   return (dispatch,getState)=>{
       axios.post('users/authenticate',credentials)
       .then(function (response) {
        if(response.data.success){
            ss.setItem('user',response.data.user.usertype)
            if(response.data.user.usertype==="admin"){
                auth.loginadmin()
            }
            if(response.data.user.usertype==="reviewer"){
               auth.loginreviewer()
            }
            ls.set('user',response.data.user)
            ls.set('authtoken',response.data.token)
            ls.set('picture',response.data.user.profilepic)
            Promise.all([dispatch({type:'LOGIN_SUCCESS',user:response.data.user}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})])            
                        
           
        }
        else{
            Promise.all([dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"}), dispatch({type:'LOGIN_ERROR',msg:response.data.msg})])
        }
        
       });
       
   }
}

export const register=(data)=>{
    
    return (dispatch,getState)=>{
        axios.post('users/register',data)
        .then(function (response) {
           if(response.data.success){
            Promise.all([dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"}), dispatch({type:'SIGNUP_SUCCESS',msg:response.data.msg})])
           }
           else{
            Promise.all([ dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"}),  dispatch({type:'SIGNUP_ERROR',msg:response.data.msg})])
           }
        });
       
    }
 }
 export const resetpwd=(data)=>{
    
    return (dispatch,getState)=>{
        axios.post('users/reset',data)
        .then(function (response) {
           if(response.data.success){
            Promise.all([dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"}), dispatch({type:'RESETGEN_SUCCESS',msg:response.data.msg})])
           }
           else{
            Promise.all([ dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"}),  dispatch({type:'RESETGEN_ERROR',msg:response.data.msg})])
           }
        });
       
    }
 }

 export const setPointValue=(data)=>{
    return (dispatch,getState)=>{
        axios.post('users/setpointvalue',data)
        .then(function (response) {
           if(response.data.success){
            Promise.all([dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"}), dispatch({type:'SET_POINT_VALUE_SUCCESS',msg:response.data.msg})])
           }
           else{
            Promise.all([ dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"}),  dispatch({type:'SET_POINT_VALUE_ERROR',msg:response.data.msg})])
           }
        });
       
    }
 }
 export const getPointValue=(data)=>{
    return (dispatch,getState)=>{
        axios.get('users/getpointvalue',data)
        .then(function (response) {
           if(response.data.success){
            Promise.all([dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"}), dispatch({type:'SET_POINT_VALUE_SUCCESS',msg:response.data.msg})])
           }
           else{
            Promise.all([ dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"}),  dispatch({type:'SET_POINT_VALUE_ERROR',msg:response.data.msg})])
           }
        });
       
    }
 }
 
export const resetpwdnew=(data)=>{
   return (dispatch,getState)=>{
       axios.post('http://localhost:5000/users/resetpwd',data)
       .then(function (response) {
          if(response.data.success){
           Promise.all([dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"}), dispatch({type:'RESET_CHANGEPWD_SUCCESS',msg:response.data.msg})])
          }
          else{
           Promise.all([ dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"}),  dispatch({type:'RESET_CHANGEPWD_ERROR',msg:response.data.msg})])
          }
       });
      
   }
}

export const addaccount=(data)=>{
    return (dispatch,getState)=>{
        const token=ls.get('authtoken')
        axios.post('users/addaccount',data,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            ls.set('user',response.data.user)
            Promise.all([dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"}), dispatch({type:'ADD_ACCOUNT_SUCCESS',msg:response.data.msg,user:response.data.user})])
           }
           else{
            Promise.all([ dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"}),  dispatch({type:'ADD_ACCOUNT_ERROR',msg:response.data.msg})])
           }
        });
       
    }
}

export const banUser=(data)=>{
    return (dispatch,getState)=>{
        const token=ls.get('authtoken')
        axios.post('users/banuser',data,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            Promise.all([dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"}), dispatch({type:'BAN_USER_SUCCESS',msg:response.data.msg,user:response.data.user})])
           }
           else{
            Promise.all([ dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"}),  dispatch({type:'BAN_USER_ERROR',msg:response.data.msg})])
           }
        });
       
    }
}
export const loadUser=(obj)=>{
    var token=ls.get('authtoken')
    console.log()
    return (dispatch,getState)=>{
        axios.post('users/loadUser',obj,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
             dispatch({type:'LOAD_USER_SUCCESS',msg:response.data.msg,user:response.data.user})
           }
           else{
             dispatch({type:'LOAD_USER_ERROR',msg:response.data.msg})
           }
        });
    }
}
export const addPoints=(data)=>{
    return (dispatch,getState)=>{
        const token=ls.get('authtoken')
        axios.post('users/addpointstouser',data,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            Promise.all([dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"}), dispatch({type:'ADD_POINTS_SUCCESS',msg:response.data.msg,user:response.data.user})])
           }
           else{
            Promise.all([ dispatch({type:'NOTIFICATION',message:response.data.msg,status:"error"}),  dispatch({type:'ADD_POINTS_ERROR',msg:response.data.msg})])
           }
        });
       
    }
}
 export const Logout=()=>{
     return(dispatch,getState)=>{
       auth.logout()
       ls.remove("authtoken")
       ls.remove("user")
       let msg="Good bye!"
       Promise.all([dispatch({type:'SIGNOUT_SUCCESS'}), dispatch({type:'NOTIFICATION',message:msg,status:"success"})])
       
     }
 }

 export const getUser=()=>{
   const user=ls.get('user')
   return(dispatch,getState)=>{
       if(user){
         dispatch({type:'GET_USER_SUCCESS',user:user});
       }
       else{
        dispatch({type:'GET_USER_SUCCESS',user:user});
       } 
 }
}
export const changeProfilePic=(picture)=>{
    var token=ls.get('authtoken')
    let data={
        pic:picture
    }
    return (dispatch,getState)=>{
        axios.post('users/changeprofilepic',data,{ headers: { Authorization:token } })
        .then(function (response) {
           if(response.data.success){
            ls.set('picture',response.data.picture)
            Promise.all([dispatch({type:'PROFILE_PIC_UPDATE_SUCCESS',picture:response.data.picture}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})])
           }
           else{
            Promise.all([dispatch({type:'PROFILE_PIC_UPDATE_ERROR'}), dispatch({type:'NOTIFICATION',message:response.data.msg,status:"success"})])
           }
        });
    }
}
