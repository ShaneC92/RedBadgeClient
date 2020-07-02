let APIURL = '';

switch (window.location.hostname) {
    // This is the local host name of your react app
    case 'localhost' || '127.0.0.1':
    // This is the local host name of your server/API
        APIURL = 'http://localhost:3000';
        break;
    // This is the deployed React application
    case 'schoolclient.herokuapp.com':
    // This is the full URL of your deployed server/API
        APIURL = 'https://jl-schoolserver.herokuapp.com';
        break;
}


export default APIURL;