import React from 'react';
import './Movie.css';
import APIURL from '../helpers/environment';

type token = {
    token: any
}

class Movie extends React.Component<token> {
    constructor(props: token){
        super(props)
    }

        componentDidMount = () => {
            for (let i = 0; i < 20; i++){
            fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=20efcae6ae818a4f9c50669db7afbb8a`, {
                method: 'GET',
                headers: new Headers ({
                    'Content-Type': 'application/json',
                })
            })
            .then((data) => data.json())
            .then((movieData) => {
                console.log(movieData);
            })
        }
    }

    
    render() {
        return(
            <div>
                <h1>Movie</h1>
                {/* <img src={`https://image.tmdb.org/t/p/w500/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg`}/> */}
            </div>
        )
    }
}

export default Movie;


// `https://api.themoviedb.org/4/list/1?page=1&api_key=20efcae6ae818a4f9c50669db7afbb8a`

//https://api.themoviedb.org/3/search/movie?api_key=<APIKEY>&query=<keyword>