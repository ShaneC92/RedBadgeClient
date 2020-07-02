import React from "react";
import "./Auth.css";
import Login from "./Login";
import Signup from "./Signup";

//props we don't have to cap
type updateToken = {
    updateToken: any,
    token: any
}

//if not props we have to cap.
type Arguments = {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    login: Boolean
}


class Auth extends React.Component <updateToken,Arguments>{
    constructor(props:updateToken){
        super(props);
        this.state = {
            firstName:"",
            lastName: "",
            email: "",
            password: "",
            login: true
        }
    }
    loginForm = () => {
        return this.state.login ? (
            <Login />
            ) : (
            <Signup />
            );
    };
    loginToggle = (event: any) => {
        event.preventDefault();
        this.setState({
            firstName:"",
            lastName: "",
            email: "",
            password: "",
            login: !this.state.login
        })
    }
    render(){
        return(
            <div className='auth-container'>
            <div className='lgnRow'>
                <div className='lgnDiv'>
                    <p className='lgnTitle'>{this.loginForm()}
                    <br />
                    <button className='lgnToggle' onClick={this.loginToggle} style={{color: 'black'}}>Login/SignUp</button>
                    </p>
                </div>
            </div>
        </div>
        )
    }

}

export default Auth;