import React from "react";
import "../Home/Movie.css";
import Rating from "../Movie/Rating";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Footer from "../Footer";
import EditIcon from '@material-ui/icons/Edit';

import APIURL from '../helpers/environment';

type Token = {
    token: any,
    weekly:any,
    myMovie:any,
    role:string,
    weeklyAdded:any,
    comments:any,
    commentPosted: any,
    name: number,
    editComment: any,
    updateOn: any,
    userList: any
}
type stateVariable = {
    expanded: boolean,
    commentInput: string
}
class MovieTable extends React.Component<Token,stateVariable>{
    constructor(props:Token){
        super(props);
        this.state = {
            expanded: false,
            commentInput:""
        }
    }
    postThisComment = (comment:any,movieId:number)=>{
        fetch(`${APIURL}/movie/comments`,{
            method: "POST",
            body:JSON.stringify({comment:comment,
                movieId:movieId
            }),
            headers: new Headers({
            "Content-Type": "application/json",
            "Authorization":this.props.token
            })
        })
        .then(data=>{
            const comment:any = document.getElementsByClassName("outlined-basic").item(movieId-1);
            comment.value = "";
            this.props.commentPosted();
        })
    }

    handleExpandClick = () =>{
        this.setState({
            expanded: !this.state.expanded
        })
    }
    fetchComments:any = (movieID:number) =>{
                    const deleteComment = (commentID:any)=>{
                        fetch(`${APIURL}/movie/${commentID}`, {
                            method: "DELETE",
                            headers: new Headers({
                                "Content-Type": "application/json",
                                "Authorization": this.props.token
                            })
                        })
                            .then(() => {
                                this.props.commentPosted();
                            })
                    }
                    const arrayList = this.props.comments.comment;

                    //user list
                    const memberLists = this.props.userList.user;
                    if(arrayList && memberLists){
                        return(
                            arrayList.map((comment:any,index:number)=>{
                                if(comment.movieId === movieID){
                                    return(

                                        memberLists.map((member:any,memberIndex:number)=>{
                                            if(comment.ownerId === member.id){
    
                                                return(
                                                    <dl style = {{color: "black", margin: "2px 2px 2px 8px"}}>
                                                    <dt className = "moveLeft">
                                                        {member.firstName}
                                                    </dt>
                                                   <dd className = "moveLeft">
                                                       {comment.comment}
                                                       {comment.ownerId === this.props.name?<IconButton className = "moveRight"><DeleteIcon 
                                                    onClick = {()=>{deleteComment(comment.id)}}
                                                    style = {{color:"black"}}aria-label="delete"/></IconButton>:null}
                                                    {comment.ownerId === this.props.name?<IconButton className = "moveRight">
                                                         <EditIcon onClick = {()=>{
                                                             this.props.editComment(comment);
                                                             this.props.updateOn();
                                                         }} style = {{color: "black"}}/>
                                            </IconButton>:null}
                                                   </dd>
                                                </dl>
                                                )
                                            }
                                            else{
                                                return(
                                                    null
                                                )
                                            }
                                        })
                                    )
                                }
                                else{
                                    return(
                                        null
                                    )
                                }
                            })
                        )
                    }
                    else{
                        return(
                            null
                        )
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
        const getInfo = (movieId:number)=>{
            let info:any = document.getElementsByClassName("outlined-basic").item(movieId-1);
            // return (info.value);
            return(info.value);
        }
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
                                <IconButton onClick = {this.handleExpandClick} aria-expanded = {this.state.expanded} aria-label = "show more">
                                    <ExpandMoreIcon/>
                                </IconButton>
                                <Collapse in = {this.state.expanded} timeout = "auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>Comments</Typography>
                                            <div style = {{backgroundColor:"white", height: "30vh",width: "25vw",overflow:"auto",
                                            borderRadius:"10px"}}>
                                                {this.fetchComments(movie.id)}
                                            </div>
                                            <form className = "rootForComment">
                                            <input className="outlined-basic"type = "text" 
                                                    style = {{width:"60%",margin:"2px",color:"black"}}/>
                                                        <IconButton style = {{color:"white"}}edge="end" aria-label="comments" onClick = {()=>{
                                                            getInfo(movie.id);
                                                            this.postThisComment(getInfo(movie.id),movie.id);
                                                        }}>
                                                            <CommentIcon />
                                                        </IconButton>
                                            </form>
                                    </CardContent>
                                </Collapse>
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