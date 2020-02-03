import React,{Component} from 'react'
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid'
import ClaimsTab from './ClaimsTab'



class ClaimsComponent extends Component{
   render(){
      return(
        <div>
          <Grid container spacing={3} justify='center' >
           <Grid  item xs={12} sm={8}>
             <ClaimsTab ></ClaimsTab>
           </Grid>
           </Grid>
        </div>
      )
     }
}
export default connect(null,null)(ClaimsComponent);
