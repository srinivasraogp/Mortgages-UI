import React, { Component } from 'react';
import { render } from 'react-dom';
import login from './login.css';
import swal from 'sweetalert';
import axios from 'axios';
// import PropTypes from 'prop-types';

// import { ValidatorForm } from 'react-form-validator-core';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                customerid: "",
                password: ""
            },
            email: "",
            errors: {
                customerid: '',
                password: ''
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'customerid':
                errors.customerid =
                    value.length < 6
                        ? 'Customer ID must be 6 digits'
                        : '';
                break;
            case 'password':
                errors.password =
                    value.length < 5
                        ? 'Password must be 5 characters '
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
        const { loginData } = this.state;
        loginData[event.target.name] = event.target.value;
        this.setState({ loginData });
        console.log(this.state.loginData, "name");
    }
    login = (event) => {
        event.preventDefault();
        // this.props.vaidateUser(true);
        const { loginData } = this.state;
        this.getData(loginData).then(response => {
            console.log(response);
            this.setState({ res: response.data });
            alert("login successfull");
        }).catch(error => {
            console.log(error);
            alert(error.message)
        })

    }

    getData = (loginData) => {
        return new Promise((resolve, reject) => {
            axios.post('http://172.20.10.7:7777/ingmortgages/login/', loginData).then((response) => {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    render() {
        const { errors } = this.state;
        return (
            <div className='wrapper'>

                <div className='form-wrapper'>
                    <h2>Login Form</h2>
                    {/* <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit} */}
                    
                        <form onSubmit={this.handleSubmit} noValidate>
                        <div className='fullName'>
                            <label htmlFor="fullName">Customer ID</label>
                            {/* <input
                                onChange={this.handleChange}
                                name="email"
                                value={this.state.email}
                                validators={['required', 'isEmail']}
                                error={['this field is required', 'email is not valid']}
                            /> */}
                            <input type='number' name='customerid' onChange={this.handleChange} noValidate />
                            {errors.customerid.length > 0 &&
                                <span className='error'>{errors.customerid}</span>}
                        </div>
                        <div className='password'>
                            <label htmlFor="password">Password</label>
                            <input type='password' name='password' onChange={this.handleChange} noValidate />
                            {errors.password.length > 0 &&
                                <span className='error'>{errors.password}</span>}
                        </div>
                        <div className='submit'>
                           <button onClick={this.login}>Login</button>
                           <button type="reset">Reset</button>
                        </div>
                        </form>
                    {/* </ValidatorForm> */}
                </div>

            </div>
        );
    }
}
// Login.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//     errors: PropTypes.array,
//   }
export default Login;
