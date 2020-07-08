import React from "react";
import MovieTable from "../Movie/MovieTable";
type Token = {
    token: any
}
type Movies = {
    poster:string,
    movieTitle: string,
    genre: string,
    popularity: number,
    releaseDate: string,
    runTime: number,
    description: string,
    movieList: any,
    weeklyList:any

}
class Main extends React.Component<Token,Movies>{
constructor(props:Token){
    super(props);
    this.state = {
        poster:"",
        movieTitle: "",
        genre:"",
        popularity:0,
        releaseDate:"",
        runTime:0,
        description:"",
        movieList:{},
        weeklyList:{}
    }
}

weeklyMovie: any = ()=>{
    fetch(`http://localhost:3000/weekly/movies`,{
                        method:"GET",
                        headers: new Headers({
                            "Content-Type": "application/json",
                            "Authorization":this.props.token
                        })
                    })
                    .then(data=>data.json())
                    .then(weeklyJson=>{
                      this.setState({
                          weeklyList:weeklyJson
                      })
                    })
}
//getting a movies from movie table
componentDidMount = () =>{
    for(let i = 0; i < 80; i++){
    fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=20efcae6ae818a4f9c50669db7afbb8a`)
        .then(data=>data.json())
        .then(json=>{
            if(json.id){

                this.setState({
                    poster:json.poster_path,
                    movieTitle: json.title,
                    genre:json.genres[0].name,
                    //change the data type on backend. 
                    popularity:(json.popularity),
                    releaseDate:json.release_date,
                    runTime: json.runtime,
                    description:json.overview
                })
                fetch(`http://localhost:3000/movie/movie`,{
                    method:"POST",
                    body:JSON.stringify({poster:this.state.poster,
                                        movieTitle:this.state.movieTitle,
                                        genre:this.state.genre,
                                        popularity:this.state.popularity,
                                        releaseDate:this.state.releaseDate,
                                        runTime:this.state.runTime,
                                        description:this.state.description
                                    }),
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization":this.props.token
                    })
                })
            }
        });
    }
    fetch(`http://localhost:3000/movie/movie`,{
                    method: "GET",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization":this.props.token
                    })
                })
                
                .then(data=>{
                    this.weeklyMovie();
                    // fetch(`http://localhost:3000/weekly/movies`,{
                    //     method:"GET",
                    //     headers: new Headers({
                    //         "Content-Type": "application/json",
                    //         "Authorization":this.props.token
                    //     })
                    // })
                    // .then(data=>data.json())
                    // .then(weeklyJson=>{
                    //   this.setState({
                    //       weeklyList:weeklyJson
                    //   })
                    // })
                   return data.json();
                })
                .then(json=>{
                    this.setState({
                        movieList:json
                    });
                })
    
}

render(){
    return(
        <MovieTable token = {this.props.token} weeklyAdded = {this.weeklyMovie} weekly = {this.state.weeklyList} myMovie = {this.state.movieList} role = "Admin"/>
    )
}
}
export default Main;