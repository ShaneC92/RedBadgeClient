import React from "react";
import Auth from "./Auth/Auth";
import {BrowserRouter as Router} from "react-router-dom";

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
    componentDidMount(){
        if(localStorage.getItem("token")){
            this.setState({
                sessionToken: localStorage.getItem("token")
            })
        }
    }
    componentDidUpdate(){
        if(localStorage.getItem("token")){
            this.setState({
                sessionToken: localStorage.getItem("token")
            })
        }
    }
    //updating a sessionToken
    updateToken(newToken:string){
        localStorage.setItem("token",newToken);
        this.setState({
            sessionToken: newToken
        })
    }

    updateLog = (log:string)=>{
        this.setState({
            login:log
        })
    }
    updateView(){
        if(this.state.sessionToken === localStorage.getItem("token")){
            return(
                <h1>Profile</h1>
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

                     {this.updateView()}
                </Router>
            </div>
        )
    }
}

export default Main;