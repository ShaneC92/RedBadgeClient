import React from "react";
import Auth from "./Auth/Auth";


type SessionToken = {
    sessionToken: string
}
type token = {
    token: any;
}

class Main extends React.Component<SessionToken,token>{
    constructor(props:SessionToken){
        super(props)
        this.state = {
            token: ""
        }
    }
    componentDidMount(){
        if(localStorage.getItem("token")){
            this.setState({
                token: localStorage.getItem("token")
            })
        }
    }
    componentDidUpdate(){
        if(localStorage.getItem("token")){
            this.setState({
                token: localStorage.getItem("token")
            })
        }
    }
    //updating a sessionToken
    updateToken(newToken:string){
        localStorage.setItem("token",newToken);
        this.setState({
            token: newToken
        })
    }
    // updateView(){
    //     if(this.state.token === localStorage.getItem("token")){
    //         return(
    //             <HomePage token = {this.state.token}/>
    //         )
    //     }
    //     else{
    //         <Signup updateToken = {this.updateToken}/>
    //     }
    // }

    render(){
        return(
            <Auth updateToken = {this.updateToken} token = {this.state.token}/>
        )
    }
}

export default Main;