import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyBCRh5k9SSl9TLh1nUE48Zn-mv5aWfpxaY',
    authDomain: 'minesweeper-challenge.firebaseapp.com',
    projectId: 'minesweeper-challenge',
    storageBucket: 'minesweeper-challenge.appspot.com',
    messagingSenderId: '766590585091',
    appId: '1:766590585091:web:09905b1a07995f864d4136'
};

!firebase.apps.length && firebase.initializeApp(config);

export const db = firebase.firestore();

export const signin = async (email, password) => {
    try {
        const data = await firebase.auth().signInWithEmailAndPassword(email, password);
        return {
            sessionId: data.user.uid,
            email
        };
    } catch (err) {
        throw new Error(err);
    }
};

export const signup = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((data) => {
            return {
                sessionId: data.user.uid,
                email
            };
        })
        .catch(err => {
            throw err;
        });
};

export const anonymous = async () => {
    const player = await firebase.auth().signInAnonymously();
    return player.user.uid;
};
