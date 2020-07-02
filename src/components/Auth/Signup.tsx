import React from "react";
import {Link} from "react-router-dom";
//import APIURL from "../helpers/environment";
type props = {
    updateToken: void
}
type state = {
    firstName:string,
    lastName: string,
    email: string,
    password: string
}
class Signup extends React.Component<props,state>{
    constructor(props:props){
        super(props)
        this.state ={
            firstName:"",
            lastName: "",
            email: "",
            password: "",
        }
    }
    handleSubmit(e:any){
        e.preventDefault();
        
    }
    render(){
        return(
            <form onSubmit = {this.handleSubmit}>
                <label>First Name: </label>
                <input type = "text" value = {this.state.firstName} onChange = {e=>this.setState({
                    firstName: e.target.value
                })}/><br/>

                <label>Last Name: </label>
                <input type = "text" value = {this.state.lastName} onChange = {e=>this.setState({
                    lastName: e.target.value
                })}/><br/>

                <label>email: </label>
                <input type = "email" value = {this.state.email} onChange = {e=>this.setState({
                    email: e.target.value
                })}/><br/>

                <label>Password: </label>
                <input type = "password" value = {this.state.password} onChange = {e=>this.setState({password:e.target.value})}/>
                <br/>
                <button type = "submit">SIGNUP</button>
                <p>Already have an account <Link to = "/login">Log In</Link></p>
            </form>
        )
    }
}

export default Signup;