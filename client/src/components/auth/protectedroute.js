import React,{ useEffect,useState} from 'react'
import {Route,Redirect} from 'react-router-dom'
import axios from 'axios'
import ls from 'local-storage'
import auth from './auth'


export const ProtectedRoute=({component:Component,...rest})=>{
    const token=ls.get('authtoken')
    return(
       
       <Route 
           {...rest}
            render={props=>{
                
                if(auth.isAuthenticatedreviewer()){
                    return <Component {...props}/>
                }
                else{
                    return <Redirect to="/"></Redirect>
                }
              
            }}
            />
   )

}

export const PrivateRoute=({component:Component,...rest})=>{
    const token=ls.get('authtoken')
    return(
        <Route 
            {...rest}
             render={props=>{
                 if(auth.isAuthenticatedAdmin()){
                     return <Component {...props}/>
                 }
                 else{
                     return <Redirect to="/"></Redirect>
                 }
               
             }}
             />
    )
 }

