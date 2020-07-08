import React from "react";
import "../Home/Movie.css";
import Rating from "../Movie/Rating";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

type Token = {
    token: any,
    weekly:any,
    myMovie:any,
    role:string,
    weeklyAdded:any
}
type stateVariable = {
    page: number,
    rowsPerPage: number
}
class MovieTable extends React.Component<Token,stateVariable>{
    constructor(props:Token){
        super(props);
        this.state = {
            page:0,
            rowsPerPage:10
        }
    }
    weeklyList:any = () =>{
        if(this.props.weekly.movies){
            ///////////////////////////////////////////////////////////////////
              ///////////////////////////////////////////////////////////////////
            let condition = this.props.weekly.movies;
            const deleteWeekly = (movieID:number)=>{
                fetch(`http://localhost:3000/weekly/movieList/${movieID}`,{
                    method: "DELETE",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": this.props.token
                    })
                })
                .then(()=>{
                    alert(`${movieID} deleted`);
                    this.props.weeklyAdded();
                })
            }
            if(this.props.role === "User"){
                return((condition.map((movie:any,index:number)=>{
                    return(
                        <tr key = {index}>
                            <td><img style = {{height: "100px",width:"100px"}}src = {`https://image.tmdb.org/t/p/w500${movie.poster}`} alt = ""/></td>
                            <td>{movie.movieTitle}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.popularity}</td>
                            <td>{movie.releaseDate}</td>
                            <td>{movie.runTime}m</td>
                            <td>{movie.description}</td>
                        </tr>
                    )
                })))
            }
            else{
                return((condition.map((movie:any,index:number)=>{
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
                                deleteWeekly(movie.id);
                            }}>Delete</button></td>
                        </tr>
                    )
                })))
            }
        }
    }
    movieList:any = () =>{
        let condition = this.props.myMovie;
        const handleClick = (poster:string,movieTitle:string,genre:string,popularity:number,releaseDate:string,runTime:number,description:string)=>{

            if(this.props.role === "User"){
                alert("Added to favorite");
                return(
                        fetch(`http://localhost:3000/favorites/favorites`,{
                            method: "POST",
                            body:JSON.stringify({poster:poster,
                                                movieTitle:movieTitle,
                                                genre:genre,
                                                popularity:popularity,
                                                releaseDate:releaseDate,
                                                runTime:runTime,
                                                description:description}),
                            headers: new Headers({
                                "Content-Type": "application/json",
                                "Authorization":this.props.token
                            })
                        })
                )
            }
            else{
                alert("Added to Weekly");
                return(
                    fetch(`http://localhost:3000/weekly/postMovie`,{
                        method: "POST",
                        body:JSON.stringify({poster:poster,
                                            movieTitle:movieTitle,
                                            genre:genre,
                                            popularity:popularity,
                                            releaseDate:releaseDate,
                                            runTime:runTime,
                                            description:description}),
                        headers: new Headers({
                            "Content-Type": "application/json",
                            "Authorization":this.props.token
                        })
                    })
                    .then(data=>{
                        this.props.weeklyAdded();
                    })
            )
            }
        }



        if(condition.movie){
            console.log(condition.movie); //this is an array
            if(this.props.role === "User"){
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
                            <td><Rating/></td>
                            <td><button onClick = {()=>{
                                handleClick(movie.poster,movie.movieTitle,movie.genre,movie.popularity,movie.releaseDate,movie.runTime,movie.description);
                            }}>Favorite</button></td>
                        </tr>
                    )
                })))
            }
            else{
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
                                 handleClick(movie.poster,movie.movieTitle,movie.genre,movie.popularity,movie.releaseDate,movie.runTime,movie.description);
                            }}>Weekly</button></td>
                        </tr>
                    )
                })))
            }
        }
    }
    render(){
        return(
            <div className = "movie">

                <table style = {{width: "40%"}}>
                <caption><h1>List of Movies</h1></caption>
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
                <table style = {{width:"40%"}}>
                <caption><h1>Weekly</h1></caption>
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
                        {this.weeklyList()}
                        {/* {this.props.weeklyAdded()} */}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MovieTable;