import ss from 'sessionstorage';

class Auth{
    constructor(){
        this.authenticatedadmin=false
        this.authenticatedreviewer=false
    }
    loginadmin(){
        this.authenticatedadmin=true
    }
    loginreviewer(){
        this.authenticatedreviewer=true
    }
    logout(){
        this.authenticatedadmin=false
        this.authenticatedreviewer=false
        ss.clear()

    }
    isAuthenticatedAdmin(){ 
        const user=ss.getItem('user')
        if(user && user=="admin"){
            return true
        }
        else{
            return false
        }  
              
    }
    isAuthenticatedreviewer(){ 
        const  user=ss.getItem('user')
        if(user && user=="reviewer"){
            return true
        }
        else{
            return false
        }  
                    
    }
     
}
export default new Auth()