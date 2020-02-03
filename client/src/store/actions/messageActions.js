export const loadMessage=(message,status)=>{
    return (dispatch,getState)=>{
        dispatch({type:'NOTIFICATION',message:message,status:status})
    }
}
export const closeMessage=()=>{
    return (dispatch,getState)=>{
        dispatch({type:'CLOSE',message:'',status:''})
    }
}