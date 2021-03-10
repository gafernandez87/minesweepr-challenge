import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBCRh5k9SSl9TLh1nUE48Zn-mv5aWfpxaY",
    authDomain: "minesweeper-challenge.firebaseapp.com",
    projectId: "minesweeper-challenge",
    storageBucket: "minesweeper-challenge.appspot.com",
    messagingSenderId: "766590585091",
    appId: "1:766590585091:web:09905b1a07995f864d4136"
};

!firebase.apps.length && firebase.initializeApp(config);

export const db = firebase.firestore();

export const signin = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const signup = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        console.log(user)
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(`${errorCode} - ${errorMessage}`)
    });
};