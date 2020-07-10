import React from "react";
import { Route, Switch } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

type Props = {
    updateToken: any,
    token: any,
    updateLog: any
}
const Auth: React.FC<Props> = (props: Props) => {
    return (
        <Switch>
            <Route exact path="/"><Signup updateToken={props.updateToken} updateLog={props.updateLog} /></Route>
            <Route exact path="/signup"><Signup updateToken={props.updateToken} updateLog={props.updateLog} /></Route>
            <Route exact path="/login"><Login updateToken={props.updateToken} updateLog={props.updateLog} /></Route>
        </Switch>
    )
}
export default Auth;