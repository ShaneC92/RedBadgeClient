// import React from "react";
// import {Link} from "react-router-dom";
//import APIURL from "../helpers/environment";
// import React from "react";
// import {Link} from "react-router-dom";
// import APIURL from "../helpers/environment";
// type props = {
//     updateToken: void
// }
// type state = {
//     firstName:string,
//     lastName: string,
//     email: string,
//     password: string
// }
// class Signup extends React.Component<props,state>{
//     constructor(props:props){
//         super(props)
//         this.state ={
//             firstName:"",
//             lastName: "",
//             email: "",
//             password: "",
//         }
//     }
//     handleSubmit(e:any){
//         e.preventDefault();
        
//     }
//     render(){
//         return(
//             <form onSubmit = {this.handleSubmit}>
//                 <label>First Name: </label>
//                 <input type = "text" value = {this.state.firstName} onChange = {e=>this.setState({
//                     firstName: e.target.value
//                 })}/><br/>

//                 <label>Last Name: </label>
//                 <input type = "text" value = {this.state.lastName} onChange = {e=>this.setState({
//                     lastName: e.target.value
//                 })}/><br/>

//                 <label>email: </label>
//                 <input type = "email" value = {this.state.email} onChange = {e=>this.setState({
//                     email: e.target.value
//                 })}/><br/>

//                 <label>Password: </label>
//                 <input type = "password" value = {this.state.password} onChange = {e=>this.setState({password:e.target.value})}/>
//                 <br/>
//                 <button type = "submit">SIGNUP</button>
//                 <p>Already have an account <Link to = "/login">Log In</Link></p>
//             </form>
//         )
//     }
// }

// export default Signup;


import React from 'react';
import './Auth.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import APIURL from '../helpers/environment';
//import { makeStyles } from '@material-ui/core/styles';

type props = {
    updateToken: any
}
type MyVariables = {
    firstName:string,
    setFirstName:string,
    lastName: string,
    setLastName:string,
    email: string,
    setEmail:string,
    password: string,
    setPassword:string
}


class Signup extends React.Component<props,MyVariables>{
    constructor(props:props){
        super(props)
        this.state ={
            firstName:"",
            setFirstName:"",
            lastName: "",
            setLastName:"",
            email: "",
            setEmail:"",
            password: "",
            setPassword:""
        }
        //do this cuz handleSubmit is not an arrow function.
        //this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e:any)=>{
        //let myObject:any = (this); 
        e.preventDefault();
        // console.log("Hello");
        // console.log(this.state.firstName);
        //console.log(myObject.state.firstName);
        fetch(`http://localhost:3000/user/signup`,{
            method: "POST",
            body:JSON.stringify({firstName:this.state.firstName,
                                lastName: this.state.lastName,
                                email: this.state.email,
                                password: this.state.password}),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then(data=>data.json())
            .then(json=>{
               console.log(json);
               //this.props.updateToken(json.sessionToken)
            })
    }

  render() {
  return (
    <Grid container component="main" className='root'>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className='image' />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className='paper'>
          <Avatar className='avatar'>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className='form' noValidate onSubmit = {this.handleSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="First Name"
              autoFocus
              value = {this.state.firstName}
              //onChange = {e=>this.setState({firstName:e.target.value})}
              onChange = {e=>{
                  this.setState({firstName: e.target.value})
              }}
            />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="Last Name"
              autoFocus
              value = {this.state.lastName}
              onChange = {e=>this.setState({lastName:e.target.value})}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value = {this.state.email}
              onChange = {e=>this.setState({email:e.target.value})}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              value = {this.state.password}
              onChange = {e=>this.setState({password:e.target.value})}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className='submit'
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item className='login'>
                <Link href="login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
}

export default Signup;