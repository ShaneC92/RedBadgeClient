import React from "react";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import APIURL from '../helpers/environment';
type Token = {
    token: any,
    myMovie: any,
    fetchMovies: any,
    weekly: any
}

class MovieTable extends React.Component<Token, {}>{

    movieList: any = () => {
        console.log(this.props.weekly);
        let condition = this.props.myMovie;
        const deleteMovie = (movieID: number) => {
            fetch(`${APIURL}/favorites/${movieID}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.token
                })
            })
                .then(() => {
                    this.props.fetchMovies();
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
                                <td>{movie.runTime}m</td>
                                <td id = "release">{movie.releaseDate}</td>
                                <td>{movie.description}</td>
                                <td><IconButton style = {{color:"white"}}aria-label="delete" onClick = {()=>{
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
            <table style = {{width: "90%",margin:"auto", border:"1px solid black",marginTop:"15px"}}>
                <thead className = "favoriteHeader">
                    <th>Poster</th>
                    <th>Movie Title</th>
                    <th>Genre</th>
                    <th>Popularity</th>
                    <th>Run Time</th>
                    <th>Release Date</th>
                    <th>Description</th>
                    <th></th>
                </thead>
                <tbody className="favoriteBody">
                    {this.movieList()}
                    {/* {this.props.fetchMovies()} */}
                </tbody>
            </table>
        )
    }
}

export default MovieTable;