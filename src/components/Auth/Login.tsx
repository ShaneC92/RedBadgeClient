// import React from "react";
// import {Link} from "react-router-dom";

// type Props = {
//     updateToken: void
// }

// const Login :React.FC <Props> = () =>{
//     return(
//         <form>
//             <label>email: </label>
//             <input type = "email"></input><br/>
//             <label>Password: </label>
//             <input type = "password"></input>
//             <button type = "submit">LOGIN</button>
//             <p>Sign me up<Link to = "/signup">SIGNUP</Link></p>
//         </form>
//     )
// }

// export default Login;

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
    email: string,
    setEmail:string,
    password: string,
    setPassword:string
}


class Login extends React.Component<props,MyVariables>{
    constructor(props:props){
        super(props)
        this.state ={
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
        fetch(`http://localhost:3000/user/login`,{
            method: "POST",
            body:JSON.stringify({
                                email: this.state.email,
                                password: this.state.password}),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then(data=>data.json())
            .then(json=>{
                console.log("Hello world");
                // console.log(json);
            //    console.log(json.sessionToken);
               this.props.updateToken(json.sessionToken)
               //this.props.updateToken(json.data.sessionToken);
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
            Login
          </Typography>
          <form className='form' noValidate onSubmit = {this.handleSubmit}>
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
              Login
            </Button>
            <Grid container>
              <Grid item className='login'>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Signup"}
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

export default Login;