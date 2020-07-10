import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


type clearToken = {
        clearToken: any,
        log:string,
        username:string,
        role:string
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const classes = useStyles();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      if(props.username === "Ur-A-Critic"){
        alert("You must log in first");
      }
      else{
        return(
          <Link to = "/favorites"/>
        )
      }
      setAnchorEl(null);
    };
    const handleClose1 = () => {
      if(props.username === "Ur-A-Critic"){
        alert("You must log in first");
      }
      setAnchorEl(null);
    };
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
    const favorite = ()=>{
      if(props.username === "Ur-A-Critic"){
        const clickMe = ()=>{
          alert("You must log in first");
          setAnchorEl(null);
        }
        return(
          <MenuItem id = "fontMe1" onClick={clickMe}>Favorites</MenuItem>
        )
      }
      else{
        //setAnchorEl(null);
        const clickMe = () =>{
          setAnchorEl(null);
        }
        console.log("User role from navbar",props.role);
        if(props.role === "User"){

            return(
              <Link to = "/favorites"><MenuItem onClick = {clickMe}>Favorites</MenuItem></Link>
            )
        }
        else{
          return(
            <Link to = "/members"><MenuItem onClick = {clickMe}>Member</MenuItem></Link>
          )
          
        }
      }
    }
    const home = () =>{
      if(props.username === "Ur-A-Critic"){
        const clickMe = ()=>{
          alert("You must log in first");
          setAnchorEl(null);
        }
        return(
          <MenuItem id = "fontMe" onClick={clickMe}>Ur-A-Critic</MenuItem>
        )
      }
      else{
        //setAnchorEl(null);
        const clickMe = () =>{
          setAnchorEl(null);
        }
        return(
          <Link to = "/movie"><MenuItem onClick = {clickMe}>Home</MenuItem></Link>
        )
      }
    }
    return(
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                  <IconButton edge="start" className={classes.bttn} color="inherit" aria-label="menu">
                  <Button aria-controls="simple-menu" aria-haspopup="true" id = "font" onClick={handleClick}>
                      {props.username}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {home()}
                   {favorite()}
                  </Menu>
                  </IconButton>
                  </Typography>
                  <Button color="inherit">{logChange()}</Button>
                </Toolbar>
              </AppBar>
            </div>
                    
    )
}

export default Navbar;