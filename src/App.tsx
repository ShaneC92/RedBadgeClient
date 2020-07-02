import React from 'react';
import './App.css';
import Main from "./components/Main"
let sessionToken: string = ""
const App: React.FunctionComponent = ()=> {
  return (
    <div className="App">
      <Main sessionToken = {sessionToken}/>
    </div>
  );
}

export default App;