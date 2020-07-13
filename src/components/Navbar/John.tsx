import React from 'react';
import JohnAssignment from "./JohnAssignment";
import Two from "./Two";
import {Modal} from "reactstrap";
type props = {
    condition:any,
    showMe: boolean
}
type stateVariable = {
    type: string,
    joke: string,
    setup: string,
    delivery: string
}
class John extends React.Component<props,stateVariable> {
    constructor(props:props){
        super(props);
        this.state = {
            type: "",
            joke: "",
            setup: "",
            delivery:""
        }
    }
    componentDidMount = () =>{
        fetch("https://sv443.net/jokeapi/v2/joke/Programming")
            .then(data=>data.json())
            .then(json=>{
                this.setState({
                    type: json.type,
                    joke: json.joke,
                    setup: json.setup,
                    delivery: json.delivery
                })
            });


    }
    render() {
        return(
            <div>
                {this.state.type === "single"?<JohnAssignment showMe = {this.props.showMe} condition = {this.props.condition}
                 jokeType = {this.state.type} joke = {this.state.joke}/>:
                 <Two showMe = {this.props.showMe} condition = {this.props.condition} jokeType = {this.state.type}  setup = {this.state.setup} delivery = {this.state.delivery}/>}
            </div>
        )
    }
}

export default John;