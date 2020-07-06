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
import MovieTable from "../Movie/MovieTable";
import APIURL from '../helpers/environment';

type Token = {
    token: any,
    user:string
}
type stateVariable = {
    movieList: any
}
  class Movie extends React.Component<Token,stateVariable>{
      constructor(props:Token){
          super(props);
          this.state = {
              movieList: {}
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
              })
          })
      }
           
        render(){

            return(
                <MovieTable token = {this.props.token} role = {this.props.user} myMovie = {this.state.movieList}/>
            )
        }
    }

export default Movie;