import React from 'react';
import './favMovie.css';
import { generateKeyPair } from 'crypto';

type token = {
    token: any
}

class favMovie extends React.Component<token> {


    render() {
        return(
            <div>
                <h1>Hello World!</h1>
            </div>
        )
     }
}
    
export default favMovie;