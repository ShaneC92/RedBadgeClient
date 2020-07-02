import React from 'react';
import './Movie.css';

class Movie extends React.Component {

    componentDidMount(){
        fetch(`https://cors-anywhere.herokuapp.com/http://api.traileraddict.com/?featured=yes&count=4&width=720`)
            .then(data=>{
                return data.json();
            })
            .then(console.log);
            
    }
    render() {
        return(
            <div>
                <h1>Movie</h1>
            </div>
        )
    }
}

export default Movie;