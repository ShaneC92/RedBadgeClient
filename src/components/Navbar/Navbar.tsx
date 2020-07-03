import React from 'react';
import './Navbar.css';
import {useHistory} from 'react-router-dom';

type logOut = {
    logOut: any,
    setLogout: any
}
type clearToken = {
    clearToken: any
}

class Navbar extends React.Component<clearToken> {
    constructor(props: clearToken){
        super(props)
    }

    
    // history = useHistory();


    render() {
        return(
            <div>    
                <button onClick={this.props.clearToken}>Logout</button>     
            </div>
        )
    }
}

export default Navbar;