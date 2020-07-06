import React from "react";
import Auth from "./Auth/Auth";
import Movie from './Home/Movie';
import Navbar from '../components/Navbar/Navbar';
import {BrowserRouter as Router} from "react-router-dom";
import APIURL from "./helpers/environment";
import Home from "./Home/Movie";

// type SessionToken = {
//     sessionToken: string
// }
type states = {
    sessionToken: any,
    login: string
}

class Main extends React.Component <{},states>{
    constructor(props:states){
        super(props)
        this.state = {
            sessionToken: "",
            login: "LOGIN"
        }
    }
    // componentDidMount(){
    //     if(localStorage.getItem("token")){
    //         this.setState({
    //             sessionToken: localStorage.getItem("token")
    //         })
    //     }
    // }
    // componentDidUpdate(){
    //     if(localStorage.getItem("token")){
    //         this.setState({
    //             sessionToken: localStorage.getItem("token")
    //         })
    //     }
    // }
    //updating a sessionToken
    updateToken = (sessionToken:string)=>{
        localStorage.setItem("token",sessionToken);
        this.setState({
            sessionToken: sessionToken
        })
    }

    clearToken = (e:any) => {
        localStorage.clear();
        this.setState({sessionToken: ('')});
        this.setState({login:"LOGIN"})
    }

    updateLog = (log:string)=>{
        this.setState({
            login:log
        })
    }
    updateView = ()=>{
        if(this.state.sessionToken === localStorage.getItem("token")){
            return(

                <Movie token={this.state.sessionToken} />
            )
        }
        else{
            return(

                <Auth updateToken = {this.updateToken} token = {this.state.sessionToken} updateLog = {this.updateLog}/>
            )
        }
    }

    render(){
        return(
            <div>
                <Router>
                    <Navbar clearToken={this.clearToken} log = {this.state.login} />
                    {this.updateView()}
                </Router>
            </div>
        )
    }
}

export default Main;