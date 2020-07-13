let APIURL = "";

//getting the host
switch(window.location.hostname){
     //this is the local host name of my react app
     case "localhost" ||"127.0.0.1":
        APIURL = "http://localhost:3000";
        break;
        //this is the deployed React application
     case "ur-a-critic-server.herokuapp.com":
         //this is the full url of my deployed server/API
        APIURL = "https://ur-a-critic.herokuapp.com";
        break;

}

export default APIURL;