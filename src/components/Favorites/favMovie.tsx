import React from 'react';
import './favMovie.css';
import FavTable from "./Favtable";
import Footer from "../Footer";
import APIURL from '../helpers/environment';

type Token = {
    token: any,
    role: string,
    weekly: any
}
type myMovie = {
    myMovie: any
}

class favMovie extends React.Component<Token, myMovie> {
    constructor(props: Token) {
        super(props)
        this.state = {
            myMovie: {}
        }
    }
    fetchMovies = () => {
        fetch(`${APIURL}/favorites/favorites`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
            .then(data => data.json())
            .then(json => {
                this.setState({
                    myMovie: json
                })
            })
    }
    componentDidMount = () => {
        this.fetchMovies();
    }

    render(){
        return(
            <div>
                <div>

                    <FavTable token = {this.props.token} myMovie = {this.state.myMovie}
                    fetchMovies = {this.fetchMovies} weekly = {this.props.weekly}/>
                </div>
                <div> <Footer/></div>
            </div>
        )
    }
}

export default favMovie;