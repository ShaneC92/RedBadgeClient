import React from "react";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
                                <td><img style = {{height: "200px",width:"150px"}}src = {`https://image.tmdb.org/t/p/w500${movie.poster}`} alt = ""/></td>
                                <td>{movie.movieTitle}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.popularity}</td>
                                <td>{movie.releaseDate}</td>
                                <td>{movie.runTime}m</td>
                                <td>{movie.description}</td>
                                <td><IconButton aria-label="delete" onClick = {()=>{
                                    deleteMovie(movie.id);
                                }}><DeleteIcon />
                                </IconButton></td>
                            </tr>
                        )
                    })))
                }
            }
    render(){
        return(
            <table className="table" style = {{width: "70%",margin:"auto"}}>
                <thead className="tableHead">
                    <th></th>
                    <th>Movie Title</th>
                    <th>Genre</th>
                    <th>Popularity</th>
                    <th>Release Date</th>
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