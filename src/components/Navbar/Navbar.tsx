import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// type logOut = {
//     logOut: any,
//     setLogout: any
// }
// type clearToken = {
//     clearToken: any,
//     log:string
// }

// class Navbar extends React.Component<clearToken> {
//     constructor(props: clearToken){
//         super(props)
//     }

    
//     // history = useHistory();


//     render() {
//         return(
//             <div>
//                 <button onClick={this.props.clearToken}>Logout</button>
//             </div>
//         )
//     }
// }
type clearToken = {
        clearToken: any,
        log:string
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
        bttn:{
            color:"white",
            float:"left"
        },
        prop:{
            color:"white",
            textDecoration:"none"
        }
      }));
      
const Navbar: React.FC<clearToken> = (props:clearToken)=>{
    const classes = useStyles();
    const logChange = ()=>{
        if(props.log === "LOGIN"){
            return(
                <Link className = {classes.prop} to = "/login">{props.log}</Link>
            )
        }
        else if(props.log === "LOGOUT"){
            return(

                <Link className = {classes.prop} to = "/login" onClick = {props.clearToken}>{props.log}</Link>
            )
        }
        else{
            return(
                 <Link className = {classes.prop} to = "/signup">{props.log}</Link>
            )
        }
    }
    return(
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                  <IconButton edge="start" className={classes.bttn} color="inherit" aria-label="menu">
                    <span>Movie</span>
                  </IconButton>
                  </Typography>
                  <Button color="inherit">{logChange()}</Button>
                </Toolbar>
              </AppBar>
            </div>
                    
    )
}

export default Navbar;