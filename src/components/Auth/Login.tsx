import React from 'react';
import './Auth.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import APIURL from '../helpers/environment';

type props = {
    updateToken: any,
    updateLog:any
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
        //do this if handleSubmit is not an arrow function.
        //this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e:any)=>{
        //let myObject:any = (this); 
        e.preventDefault();
        if(!this.state.email){
          this.setState({
            setEmail: "Email must be provided"
          })
        }
        else{
          this.setState({
            setEmail:""
          })
          if(!this.state.password){
            this.setState({
              setPassword: "Password must be provided"
            })
          }
          else{
            this.setState({
              setPassword:""
            })
            fetch(`${APIURL}/user/login`,{
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
               this.props.updateToken(json.sessionToken,json.user.userRole,json.user.firstName,json.user.id);
               json.sessionToken?this.props.updateLog("LOGOUT"):this.props.updateLog("LOGIN");
               //this.props.updateToken(json.data.sessionToken);
            })
          }
        }
    }
    componentDidMount=()=>{
      // const dom: any = document.getElementsByClassName("image")[0];
      // dom.style.backgroundImage = "url('https://source.unsplash.com/collection/10534533')"
      this.props.updateLog("SIGNUP");
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
            {this.state.setEmail}
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
            {this.state.setPassword}
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
                <span style = {{color:"black"}}> Don't have an account? </span>
                <Link href="signup" variant="body2">
                {"Signup"}
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