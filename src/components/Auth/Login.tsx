import React from "react";
import {Link} from "react-router-dom";

type Props = {
    updateToken: void
}

const Login :React.FC <Props> = () =>{
    return(
        <form>
            <label>email: </label>
            <input type = "email"></input><br/>
            <label>Password: </label>
            <input type = "password"></input>
            <button type = "submit">LOGIN</button>
            <p>Sign me up<Link to = "/signup">SIGNUP</Link></p>
        </form>
    )
}

export default Login;