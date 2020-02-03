import React,{Component} from 'react';
import Background from './background'
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Container'
import {loadHomeDetails} from '../../store/actions/taskAction'
import {connect} from 'react-redux' 
import ProductHero from './views/ProductHero'
import ProductValues from './views/ProductValues'
import ProductCategories from './views/ProductCategories';
import ProductSmokingHero from './views/ProductSmokingHero'
import ProductHowItWorks from './views/ProductHowItWorks';
import Performance from './views/Performance';
import AppFooter from './views/AppFooter';

class Home extends Component{
  componentDidMount()
  {
    this.props.loadHomeDetails()
  }
   render(){
     return(
       <div> 
        <ProductHero/>
        <ProductValues/>
        <ProductCategories/>
        <ProductHowItWorks/>
        <Performance homeDetails={this.props.home}/>
        <ProductSmokingHero/>
        <AppFooter></AppFooter>
       </div>
     )
   }
}

const mapDispatchToProps=(dispatch)=>{
   return{
     loadHomeDetails:()=>dispatch(loadHomeDetails())
   }
}
const mapStateToProps=(state)=>{
  return{
    home:state.tasks.home,
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Home)

//<Background homeDetails={this.props.home}/>