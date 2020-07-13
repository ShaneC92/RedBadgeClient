import React from "react";
import "./Footer.css";
class Footer extends React.Component{

    render(){
        return(
        <footer style={{position: 'relative', bottom: '0px', width: '100%'}} className="footer">
            <img style={{height: '15px'}} src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg' alt = "" />
        </footer>
        )
    }
} 
export default Footer;