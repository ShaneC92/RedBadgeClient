import React from 'react';
import './Movie.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Switch,Route} from "react-router-dom";
import MovieTable from "../Movie/MovieTable";
import FavoriteTable from "../Favorites/favMovie";
import APIURL from '../helpers/environment';

type Token = {
    token: any,
    user:string
}
type stateVariable = {
    movieList: any,
    favoriteMovieList: any
}
  class Movie extends React.Component<Token,stateVariable>{
      constructor(props:Token){
          super(props);
          this.state = {
              movieList: {},
              favoriteMovieList: {}
          }
      }
      componentDidMount = ()=>{
          fetch(`http://localhost:3000/movie/movie`,{
              method: "GET",
              headers: new Headers({
                "Content-Type": "application/json",
                "Authorization":this.props.token
              })
          })
          .then(data=>{
              return data.json();
          })
          .then(json=>{
              this.setState({
                  movieList: json
              });
              //fetch from favorite end point
          })
      }
           
        render(){

            return(
        <Switch>
            <Route exact path = "/login"><MovieTable token = {this.props.token} role = {this.props.user} myMovie = {this.state.movieList}/></Route>
            <Route exact path = "/movie"><MovieTable token = {this.props.token} role = {this.props.user} myMovie = {this.state.movieList}/></Route>
            <Route exact path = "/favorites"><FavoriteTable token = {this.props.token}
             role = {this.props.user}/></Route>
        </Switch>
            )
        }
    }

export default Movie;