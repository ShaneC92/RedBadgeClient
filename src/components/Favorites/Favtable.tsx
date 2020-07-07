import React from "react";

type Token = {
    token: any,
    myMovie:any,
    fetchMovies:any,
    weekly:any
}

class MovieTable extends React.Component<Token,{}>{
        
        movieList: any = () =>{
            console.log(this.props.weekly);
            let condition = this.props.myMovie;
            const deleteMovie = (movieID:number)=>{
                fetch(`http://localhost:3000/favorites/${movieID}`,{
                    method: "DELETE",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": this.props.token
                    })
                })
                .then(()=>{
                    alert(`${movieID} deleted`);
                })
            }
            if(condition.movie){
                    return((condition.movie.map((movie:any,index:number)=>{
                        return(
                            <tr key = {index}>
                                <td><img style = {{height: "100px",width:"100px"}}src = {`https://image.tmdb.org/t/p/w500${movie.poster}`} alt = ""/></td>
                                <td>{movie.movieTitle}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.popularity}</td>
                                <td>{movie.releaseDate}</td>
                                <td>{movie.runTime}m</td>
                                <td>{movie.description}</td>
                                <td><button onClick = {()=>{
                                    deleteMovie(movie.id);
                                }}>DELETE</button></td>
                            </tr>
                        )
                    })))
                }
            }
    render(){
        return(
            <table style = {{width: "40%",margin:"auto"}}>
                <thead>
                    <th>Poster</th>
                    <th>Movie Title</th>
                    <th>Genre</th>
                    <th>Popularity</th>
                    <th>release Date</th>
                    <th>Run Time</th>
                    <th>Description</th>
                </thead>
                <tbody>
                    {this.movieList()}
                </tbody>
            </table>
        )
    }
}

export default MovieTable;