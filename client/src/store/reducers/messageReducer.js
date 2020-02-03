const initState={
   message:'',
   status:'',
   show:false
}
const messageReducer=(state=initState,action)=>{
    switch(action.type){
        case 'NOTIFICATION':
            return {
             ...state,
             show:true,
             message:action.message,
             status:action.status
        } 
        case 'CLOSE':
        return {
             ...state,
             show:false,
             message:'',
             status:'error'
         } 
        default:
           return state
        }
    
}
export default messageReducer