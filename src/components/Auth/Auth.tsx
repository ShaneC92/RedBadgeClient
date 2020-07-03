// import React from "react";
// import "./Auth.css";
// import Login from "./Login";
// import Signup from "./Signup";

// //props we don't have to cap
// type updateToken = {
//     updateToken: any,
//     token: any,
//     updateLog: any
// }

// //if not props we have to cap.
// type Arguments = {
//     firstName: String,
//     lastName: String,
//     email: String,
//     password: String,
//     login: Boolean
// }


// class Auth extends React.Component <updateToken,Arguments>{
//     // constructor(props:updateToken){
//     //     super(props);
//     //     this.state = {
//     //         firstName:"",
//     //         lastName: "",
//     //         email: "",
//     //         password: "",
//     //         login: true
//     //     }
//     // }
//     // loginForm = () => {
//     //     return this.state.login ? (
//     //         <Login updateToken = {this.props.updateToken} />
//     //         ) : (
//     //         <Signup />
//     //         );
//     // };
//     // loginToggle = () => {
//     //     //event.preventDefault();
//     //     this.setState({
//     //         firstName:"",
//     //         lastName: "",
//     //         email: "",
//     //         password: "",
//     //         login: !this.state.login
//     //     })
//     // }
//     // render(){
//     //     return(
//     //         <div className='auth-container'>
//     //         <div className='lgnRow'>
//     //             <div className='lgnDiv'>
//     //                 <p className='lgnTitle'>{this.loginForm()}
//     //                 <br />
//     //                 <button className='lgnToggle' onClick={this.loginToggle} style={{color: 'black'}}>Login/SignUp</button>
//     //                 </p>
//     //             </div>
//     //         </div>
//     //     </div>
//     //     )
//     // }

// }

// export default Auth;


import React from "react";
import {Route,Switch} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

type Props =  {
    updateToken: any,
    token: any,
    updateLog: any
}
const Auth: React.FC<Props> = (props:Props)=>{
    return(
        <Switch>
            <Route exact path = "/"><Signup updateToken = {props.updateToken} updateLog = {props.updateLog}/></Route>
            <Route exact path = "/signup"><Signup updateToken = {props.updateToken} updateLog = {props.updateLog}/></Route>
            <Route exact path = "/login"><Login updateToken = {props.updateToken} updateLog = {props.updateLog}/></Route>
        </Switch>
    )
}
export default Auth;