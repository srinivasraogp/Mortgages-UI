import React,{Component} from 'react';
import CreateMortgage1 from './CreateMortagage1';
import CreateMortgage2 from './CreateMortagage2';
import CreateMortgage3 from './CreateMortagage3';
class CreateMortgage  extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        currentStep: 1,
        operationType:'',
        propertyCost:'',
        deposit:'',employementStatus:'',
        occupation:'',
        contractType:'',
        jobStartDate:'',
        title:'',
        firstName:'',
        middleName:'',
        surName:'',
        dob:'',
        contactNo:'',
        email:'',
        email:  '',
        username: '',
        password: '', 
      }
    }
  
    handleChange = event => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })    
    }
     
    handleSubmit = event => {
      event.preventDefault()
      const { email, username, password } = this.state
      alert(`Your registration detail: \n 
             Email: ${email} \n 
             Username: ${username} \n
             Password: ${password}`)
    }
    
    _next = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep >= 2? 3: currentStep + 1
      this.setState({
        currentStep: currentStep
      })
    }
      
    _prev = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep <= 1? 1: currentStep - 1
      this.setState({
        currentStep: currentStep
      })
    }
  
  /*
  * the functions for our button
  */
  previousButton() {
    let currentStep = this.state.currentStep;
    if(currentStep !==1){
      return (
        <button 
          className="btn btn-secondary" 
          type="button" onClick={this._prev}>
        Previous
        </button>
      )
    }
    return null;
  }
  
  nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep <3){
      return (
        <button 
          className="btn btn-primary float-right" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
    return null;
  }
    
    render() {    
      return (
        <React.Fragment>
        
        <p><b>Create Mortgages {this.state.currentStep}</b> </p> 
  
        <form onSubmit={this.handleSubmit}>
       
          <CreateMortgage1 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            email={this.state.email}
          />
          <CreateMortgage2 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            username={this.state.username}
          />
          <CreateMortgage3 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            password={this.state.password}
          />
          {this.previousButton()}
          {this.nextButton()}
  
        </form>
      </React.Fragment>
       
      );
    }
  }
  
export default CreateMortgage;