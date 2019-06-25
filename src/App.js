import React,{Component} from 'react';
import Login from './components/Login/Login';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import  CreateMortgage from './components/createMortaguage/CreateMortguage';
import {HashRouter,Switch,Link,Route} from 'react-router-dom'
class App extends Component{
  constructor(props) {
    super(props);
    this.state={
      isLoggedIn: false,
    }
  }
  redirect=(page, history)=> {
    history.push(page);
  }

  vaidateUser = (isLoggedIn)=> {
    this.setState({isLoggedIn});
  }
  render(){
    return(
      <div>
         <HashRouter>
        <Header/>
        <div>
          <Switch>
            <Route path='/create' component={CreateMortgage}/>
          <Route path='/login' component={()=><Login vaidateUser={this.vaidateUser}/>} />
          </Switch>
        </div>
      </HashRouter>
      <Footer/>
      </div>
    )
  }
}

export default App;
