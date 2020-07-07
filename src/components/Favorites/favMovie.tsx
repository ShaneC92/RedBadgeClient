import React from 'react';
import './favMovie.css';
import FavTable from "./Favtable";
type Token = {
    token: any,
    role:string
}
type myMovie = {
    myMovie: any
}

class favMovie extends React.Component <Token,myMovie> {
    constructor(props:Token){
        super(props)
        this.state = {
            myMovie:{}
        }
    }
    fetchMovies = () =>{
        fetch(`http://localhost:3000/favorites/favorites`,{
                  method: "GET",
                  headers: new Headers({
                      "Content-Type": "application/json",
                      "Authorization": this.props.token
                  })
              })
              .then(data=>data.json())
              .then(json=>{
                  this.setState({
                      myMovie: json
                  })
              })
    }

    render(){
        return(
            <FavTable token = {this.props.token} myMovie = {this.state.myMovie} fetchMovies = {this.fetchMovies}/>
        )
    }
}
    
export default favMovie;