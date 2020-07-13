import React from "react";
import "../Home/Movie.css";
import Rating from "../Movie/Rating";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Footer from "../Footer";
import APIURL from '../helpers/environment';

type Token = {
    token: any,
    weekly:any,
    myMovie:any,
    role:string,
    weeklyAdded:any
}
type stateVariable = {
    expanded: boolean
}
class MovieTable extends React.Component<Token,stateVariable>{
    constructor(props:Token){
        super(props);
        this.state = {
            expanded: false
        }
    }
    weeklyList:any = () =>{
        const handleClick = (poster:string,movieTitle:string,genre:string,popularity:number,releaseDate:string,runTime:number,description:string,voting:number)=>{

            if(this.props.role === "User"){
                return(
                    fetch(`${APIURL}/favorites/favorites`,{
                        method: "POST",
                        body:JSON.stringify({poster:poster,
                                            movieTitle:movieTitle,
                                            genre:genre,
                                            popularity:popularity,
                                            releaseDate:releaseDate,
                                            runTime:runTime,
                                            description:description
                                        }),
                        headers: new Headers({
                            "Content-Type": "application/json",
                            "Authorization":this.props.token
                        })
                    })
            )
            }
            else{
                return(
                    fetch(`${APIURL}/weekly/postMovie`,{
                        method: "POST",
                        body:JSON.stringify({poster:poster,
                                            movieTitle:movieTitle,
                                            genre:genre,
                                            popularity:popularity,
                                            releaseDate:releaseDate,
                                            runTime:runTime,
                                            description:description,
                                            voting:voting
                                        }),
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
        if(this.props.weekly.movies){
            ///////////////////////////////////////////////////////////////////
              ///////////////////////////////////////////////////////////////////
            let condition = this.props.weekly.movies;
            console.log("Weekly movies",condition);
            const deleteWeekly = (movieID:number)=>{
                fetch(`${APIURL}/weekly/movieList/${movieID}`,{
                    method: "DELETE",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": this.props.token
                    })
                })
                .then(()=>{
                    this.props.weeklyAdded();
                })
            }
            //weekly Card
            if(this.props.role === "User"){
                return((condition.map((movie:any,index:number)=>{
                    const imageLink = `https://image.tmdb.org/t/p/w500${movie.poster}`;
                    return(
                        <Card className = "cardroot">
                            <CardHeader style = {{color:"white"}} avatar = {
                                <Avatar aria-label = "recipe" className = "avatar">
                                    {movie.Genre}
                                </Avatar>
                            
                            }
                            action = {
                                <IconButton aria-label = "settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title = {movie.movieTitle}
                            subheader = {movie.releaseDate}
                            />
                            <CardMedia className = "media" image = {imageLink} style = {{ height: "50px", display: "block",marginLeft:"auto",
                        marginRight:"auto",width:"250px", objectFit:"contain"}} title = {movie.movieTitle}/>
                            <CardContent>
                                {/* pass voting value to this component */}
                                <Rating vote = {movie.voting}/>
                                <Typography variant="body2" className = "colorMe" color="textSecondary" component="p">
                                    {movie.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label = "add to favorites">
                                <FavoriteIcon style = {{color:"lightGray"}}onClick = {()=>{
                                        handleClick(movie.poster,movie.movieTitle,movie.Genre,movie.popularity,movie.releaseDate,movie.runTime,movie.description,movie.voting);
                                    }}/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    )
                })))
            }
            else{
                return((condition.map((movie:any,index:number)=>{
                    const imageLink = `https://image.tmdb.org/t/p/w500${movie.poster}`;
                    return(
                        <Card className = "cardroot">
                            <CardHeader style = {{color:"white"}} avatar = {
                                <Avatar aria-label = "recipe" className = "avatar">
                                    {movie.Genre}
                                </Avatar>
                            
                            }
                            action = {
                                <IconButton aria-label = "settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title = {movie.movieTitle}
                            subheader = {movie.releaseDate}
                            />
                            <CardMedia className = "media" image = {imageLink} style = {{ height: "50px", display: "block",marginLeft:"auto",
                        marginRight:"auto",width:"250px", objectFit:"contain"}} title = {movie.movieTitle}/>
                            <CardContent>
                                {/* pass voting value to this component */}
                                <Rating vote = {movie.voting}/>
                                <Typography variant="body2" className = "colorMe" color="textSecondary" component="p">
                                    {movie.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                            <IconButton style = {{color:"white"}}aria-label="delete" onClick = {()=>{
                                    deleteWeekly(movie.id);
                                }}><DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    )
                })))
            }
        }
    }
    movieList:any = () =>{
        let condition = this.props.myMovie;
        const handleClick = (poster:string,movieTitle:string,genre:string,popularity:number,releaseDate:string,runTime:number,description:string,voting:number)=>{

            if(this.props.role === "User"){
                return(
                        fetch(`${APIURL}/favorites/favorites`,{
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
                return(
                    fetch(`${APIURL}/weekly/postMovie`,{
                        method: "POST",
                        body:JSON.stringify({poster:poster,
                                            movieTitle:movieTitle,
                                            genre:genre,
                                            popularity:popularity,
                                            releaseDate:releaseDate,
                                            runTime:runTime,
                                            description:description,
                                            voting:voting}),
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


//Card implementation
        if(condition.movie){
            console.log(condition.movie); //this is an array
            if(this.props.role === "User"){
                return((condition.movie.map((movie:any,index:number)=>{
                    const imageLink = `https://image.tmdb.org/t/p/w500${movie.poster}`;
                    return(
                        <Card className = "cardroot">
                            <CardHeader style = {{color:"white"}} avatar = {
                                <Avatar aria-label = "recipe" className = "avatar">
                                    {movie.genre}
                                </Avatar>
                            
                            }
                            action = {
                                <IconButton aria-label = "settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title = {movie.movieTitle}
                            subheader = {movie.releaseDate}
                            />
                            <CardMedia className = "media" image = {imageLink} style = {{ height: "50px", display: "block",marginLeft:"auto",
                        marginRight:"auto",width:"250px", objectFit:"contain"}} title = {movie.movieTitle}/>
                            <CardContent>
                                {/* pass vote average value to this component */}
                                <Rating vote = {movie.voting}/>
                                <Typography variant="body2" className = "colorMe" color="textSecondary" component="p">
                                    {movie.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label = "add to favorites">
                                    <FavoriteIcon style = {{color:"lightGray"}}onClick = {()=>{
                                        handleClick(movie.poster,movie.movieTitle,movie.genre,movie.popularity,movie.releaseDate,movie.runTime,movie.description,movie.voting);
                                    }}/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    )
                })))
            }
            else{
                return((condition.movie.map((movie:any,index:number)=>{
                    const imageLink = `https://image.tmdb.org/t/p/w500${movie.poster}`;
                    return(
                        <Card className = "cardroot">
                            <CardHeader style = {{color:"white"}} avatar = {
                                <Avatar aria-label = "recipe" className = "avatar">
                                    {movie.genre}
                                </Avatar>
                            
                            }
                            action = {
                                <IconButton aria-label = "settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title = {movie.movieTitle}
                            subheader = {movie.releaseDate}
                            />
                            <CardMedia className = "media" image = {imageLink} style = {{ height: "50px", display: "block",marginLeft:"auto",
                        marginRight:"auto",width:"250px", objectFit:"contain"}} title = {movie.movieTitle}/>
                            <CardContent>
                                {/* pass vote average value to this component */}
                                <Rating vote = {movie.voting}/>
                                <Typography variant="body2" className = "colorMe" color="textSecondary" component="p">
                                    {movie.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label = "add to Weekly">
                                    <FavoriteIcon style = {{color:"lightGray"}}onClick = {()=>{
                                        handleClick(movie.poster,movie.movieTitle,movie.genre,movie.popularity,movie.releaseDate,movie.runTime,movie.description,movie.voting);
                                    }}/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    )
                })))
            }
        }
    }
    render(){
        return(
            <div>

                <div className = "movieListShow">
                    <div>

                        <h1 className = "movieFont">Featured Movies</h1>
                        <div className = "scrollBar">
                                {this.movieList()}
                        </div>
                    </div>
                    <div>
                        <h1 className = "movieFont">Recommended for the Week</h1>
                        <div className = "scrollBar2">
                            {this.weeklyList()}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default MovieTable;