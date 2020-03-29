// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

// import the libraries
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import  App from './App';
import UserProvider from './context/context';

ReactDOM.render(
<UserProvider>
<App/>
</UserProvider>, document.getElementById('root'));

// render the components to the screen


