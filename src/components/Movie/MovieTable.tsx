import React from "react";

type Token = {
    token: any,
    myMovie:any,
    role:string
}

class MovieTable extends React.Component<Token,{}>{
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