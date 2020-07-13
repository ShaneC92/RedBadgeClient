import React from "react";
import MovieTable from "../Movie/MovieTable";
import UserTable from "../Users/Users";
import { Switch, Route } from "react-router-dom";
import MemberEdit from "./MemberEdit";
import APIURL from "../helpers/environment";
type Token = {
    token: any
}
type Movies = {
    poster: string,
    movieTitle: string,
    genre: string,
    popularity: number,
    releaseDate: string,
    runTime: number,
    description: string,
    voting: number,
    movieList: any,
    weeklyList: any,
    listOfUsers: any,
    updateActive: boolean,
    memberUpdate: any

}

class Main extends React.Component<Token, Movies>{
    constructor(props: Token) {
        super(props);
        this.state = {
            poster: "",
            movieTitle: "",
            genre: "",
            popularity: 0,
            releaseDate: "",
            runTime: 0,
            description: "",
            voting: 0,
            movieList: {},
            weeklyList: {},
            listOfUsers: {},
            updateActive: false,
            memberUpdate: {}
        }
    }
    editUpdateMember: any = (member: any) => {
        this.setState({
            memberUpdate: member
        })
    }
    updateOn: any = () => {
        this.setState({
            updateActive: true
        })
    }
    updateOff: any = () => {
        this.setState({
            updateActive: false
        })
    }
    weeklyMovie: any = () => {
        fetch(`${APIURL}/weekly/movies`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
            .then(data => data.json())
            .then(weeklyJson => {
                this.setState({
                    weeklyList: weeklyJson
                })
            })
    }
    //members
    member: any = () => {
        fetch(`${APIURL}/user/member`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
            .then(member => member.json())
            .then(memberJson => {
                this.setState({
                    listOfUsers: memberJson
                })
            })
    }
    //getting a movies from movie table
    componentDidMount = () => {
        for (let i = 0; i < 80; i++) {
            fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=20efcae6ae818a4f9c50669db7afbb8a`)
                .then(data => data.json())
                .then(json => {
                    if (json.id) {
                        console.log("Data from third api", json.vote_average);
                        this.setState({
                            poster: json.poster_path,
                            movieTitle: json.title,
                            genre: json.genres[0].name,
                            //change the data type on backend. 
                            popularity: (json.popularity),
                            releaseDate: json.release_date,
                            runTime: json.runtime,
                            description: json.overview,
                            voting: json.vote_average
                        })
                        fetch(`${APIURL}/movie/movie`, {
                            method: "POST",
                            body: JSON.stringify({
                                poster: this.state.poster,
                                movieTitle: this.state.movieTitle,
                                genre: this.state.genre,
                                popularity: this.state.popularity,
                                releaseDate: this.state.releaseDate,
                                runTime: this.state.runTime,
                                description: this.state.description,
                                voting: this.state.voting
                            }),
                            headers: new Headers({
                                "Content-Type": "application/json",
                                "Authorization": this.props.token
                            })
                        })
                    }
                });
        }
        fetch(`${APIURL}/movie/movie`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })

            .then(data => {
                this.weeklyMovie();
                this.member();
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
            .then(json => {
                this.setState({
                    movieList: json
                });
                console.log("List of movie checking voting number from Admin tsx", json);
            })

    }

    render() {
        return (
            <Switch>
                <Route exact path="/login">
                    <MovieTable token={this.props.token} weeklyAdded={this.weeklyMovie} weekly={this.state.weeklyList} myMovie={this.state.movieList} role="Admin" />
                </Route>
                <Route exact path="/movie">
                    <MovieTable token={this.props.token} weeklyAdded={this.weeklyMovie} weekly={this.state.weeklyList} myMovie={this.state.movieList} role="Admin" />
                </Route>
                <Route exact path="/members">
                    <UserTable token={this.props.token} users={this.member} userList={this.state.listOfUsers} editUpdateMember={this.editUpdateMember} updateOn={this.updateOn} />
                    {this.state.updateActive ? <MemberEdit memberUpdate={this.state.memberUpdate} updateOff={this.updateOff} token={this.props.token} users={this.member} /> : null}
                </Route>
            </Switch>

        )
    }
}
export default Main;