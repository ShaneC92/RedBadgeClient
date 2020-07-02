import React from "react";
import {Link} from "react-router-dom";

type props = {
    updateToken: void
}
type state = {
    firstName:String,
            lastName: String,
            email: String,
            password: String,
            login: true
}
class Signup extends React.Component<props,state>{
    constructor(props:props){
        super(props)
        this.state ={
            firstName:"",
            lastName: "",
            email: "",
            password: "",
            login: true
        }
    }
    render(){
        return(
            <form>
                <label>email: </label>
                <input type = "email"></input><br/>
                <label>Password: </label>
                <input type = "password"></input>
                <button type = "submit">SIGNUP</button>
                <p>Already have an account <Link to = "/login">Log In</Link></p>
            </form>
        )
    }
}

export default Signup;