import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/App.jsx';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

  // Initialize Firebase
const config = {
    apiKey: "AIzaSyCEo_fi0iN-D6DtdP0u1TaAjzFDD1LUKhw",
    authDomain: "dziecko-w-drodze.firebaseapp.com",
    databaseURL: "https://dziecko-w-drodze.firebaseio.com",
    projectId: "dziecko-w-drodze",
    storageBucket: "dziecko-w-drodze.appspot.com",
    messagingSenderId: "205754083612"
};
firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
