import React from 'react';
import './Movie.css';
import { Switch, Route } from "react-router-dom";
import MovieTable from "../Movie/MovieTable";
import FavoriteTable from "../Favorites/favMovie";
import APIURL from '../helpers/environment';
import CommentTable from "./CommentTable";

type Token = {
    token: any,
    user: string,
    name: number
}
type stateVariable = {
    movieList: any,
    favoriteMovieList: any,
    weeklyList: any,
    comments: any,
    updateActive: boolean,
    commentUpdate: any
}
class Movie extends React.Component<Token, stateVariable>{
    constructor(props: Token) {
        super(props);
        this.state = {
            movieList: {},
            favoriteMovieList: {},
            weeklyList: {},
            comments: {},
            updateActive: false,
            commentUpdate: {}
        }
    }

    updateOff = () =>{
        this.setState({
            updateActive: false
        })
    }
    updateOn = ()=>{
        this.setState({
            updateActive:true
        })
    }
    commentUpdate = (comment:any)=>{
        this.setState({
            commentUpdate: comment
        })
    }
    weeklyAdded: any = () => {
        fetch(`${APIURL}/weekly/movies`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
            .then(weeklyData => weeklyData.json())
            .then(weeklyJson => {
                this.setState({
                    weeklyList: weeklyJson
                })
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
            .then(weeklyData => weeklyData.json())
            .then(weeklyJson => {
                this.setState({
                    weeklyList: weeklyJson
                })
            })
    }
    commentPosted: any = () =>{
        fetch(`${APIURL}/movie/comments`, {
            method: "GET",
            // body: JSON.stringify({
            //     movieId: movieID
            //   }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
        .then(data=>{
            return data.json();
        })
        .then(comments=>{
            this.setState({
                comments: comments
            })
        })
    }
    componentDidMount = () => {
        console.log("This data is from movie.tsx");
        fetch(`${APIURL}/movie/movie`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
            .then(data => {
                this.weeklyAdded();
                this.commentPosted();
                return data.json();
            })
            .then(json => {
                //   console.log(json);
                this.setState({
                    movieList: json
                });
            })
    }

    render() {
        return (
            <Switch>
                <Route exact path="/signup"><MovieTable editComment = {this.commentUpdate} updateOn = {this.updateOn} name = {this.props.name} comments = {this.state.comments} commentPosted = {this.commentPosted} token={this.props.token} weeklyAdded={this.weeklyAdded} weekly={this.state.weeklyList} role={this.props.user} myMovie={this.state.movieList} />
                {this.state.updateActive ? <CommentTable commentPosted = {this.commentPosted} commentUpdate={this.state.commentUpdate} updateOff={this.updateOff} token={this.props.token} /> : null}
                </Route>
                <Route exact path="/login"><MovieTable  editComment = {this.commentUpdate} updateOn = {this.updateOn} name = {this.props.name} comments = {this.state.comments} commentPosted = {this.commentPosted} token={this.props.token} weeklyAdded={this.weeklyAdded} weekly={this.state.weeklyList} role={this.props.user} myMovie={this.state.movieList} />
                {this.state.updateActive ? <CommentTable commentPosted = {this.commentPosted} commentUpdate={this.state.commentUpdate} updateOff={this.updateOff} token={this.props.token} /> : null}
                </Route>
                <Route exact path="/movie"><MovieTable editComment = {this.commentUpdate} updateOn = {this.updateOn} name = {this.props.name} comments = {this.state.comments} commentPosted = {this.commentPosted} token={this.props.token} weeklyAdded={this.weeklyAdded} weekly={this.state.weeklyList} role={this.props.user} myMovie={this.state.movieList} />
                {this.state.updateActive ? <CommentTable commentPosted = {this.commentPosted} commentUpdate={this.state.commentUpdate} updateOff={this.updateOff} token={this.props.token} /> : null}
                </Route>
                <Route exact path="/favorites"><FavoriteTable token={this.props.token}
                    role={this.props.user} weekly={this.state.weeklyList} /></Route>
            </Switch>
        )
    }
}

export default Movie;