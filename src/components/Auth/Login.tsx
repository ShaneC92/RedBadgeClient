import React from "react";


type Props = {
    props: void
}

const Login = () =>{
    return(
        <form>
            <label>email: </label>
            <input type = "email"></input><br/>
            <label>Password: </label>
            <input type = "password"></input>
            <button type = "submit">LOGIN</button>
        </form>
    )
}

export default Login;