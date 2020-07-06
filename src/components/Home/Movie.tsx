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
import APIURL from '../helpers/environment';

type token = {
    token: any
}
const useStyles = makeStyles({
    root2: {
      maxWidth: 345,
    },
    media: {
      height: 300,
    },
  });
  const Movie: React.FC<token> = (props:token)=> {
            // const dom:any = document.getElementsByClassName("myImg")[0];
            const classes = useStyles();
            const pics:any = ()=>{
                let dom:any = document.getElementsByClassName("pickMe")[0];
                for (let i = 0; i < 2; i++){
                    fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=20efcae6ae818a4f9c50669db7afbb8a`)
                    .then((data) => data.json())
                    .then((movieData) => {
                        console.log(movieData);
                        // const img:any = document.getElementsByClassName("MuiCardMedia-root")[0];
                        // console.log(img);
                        if(!movieData.adult){
                            if(movieData.poster_path){
                                
                            }
                        }
                    })
                }
                console.log(dom);
                    return(
                        <div className = "pickMe">

                            <Card className={classes.root2}>
                                <CardActionArea>
                                    <CardMedia className = {classes.media} title = "Contemplative Reptile"/>
                                </CardActionArea>
                            </Card>
                        </div>
                    )
                //         return(

                //             <Card className={classes.root2}>
                //                 <CardActionArea>
                //                 <CardMedia
                //                     className={classes.media}
                //                     image={src}
                //                     title="Contemplative Reptile"
                //                 />
                //                 <CardContent>
                //                     <Typography gutterBottom variant="h5" component="h2">
                //                     Lizard
                //                     </Typography>
                //                     <Typography variant="body2" color="textSecondary" component="p">
                //                     Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                //                     across all continents except Antarctica
                //                     </Typography>
                //                 </CardContent>
                //                 </CardActionArea>
                //                 <CardActions>
                //                 <Button size="small" color="primary">
                //                     Share
                //                 </Button>
                //                 <Button size="small" color="primary">
                //                     Learn More
                //                 </Button>
                //                 </CardActions>
                //             </Card>
                //         )
                //     })
                // }
            }
        //const classes = useStyles();
        return(
            <div>
                {pics()}
            </div>
        )
    }

export default Movie;