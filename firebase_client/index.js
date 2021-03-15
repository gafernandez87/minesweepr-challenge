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

const firebaseAuthWrap = async (promise) => {
    const rejected = Symbol('rejected');
    const valueOrError = await promise.catch((error) => {
        return { [rejected]: true, error: error };
    });

    if (valueOrError[rejected]) {
        throw valueOrError.error;
    } else {
        return valueOrError;
    }
};

export const signin = async (email, password) => {
    try {
        const data = await firebaseAuthWrap(firebase.auth().signInWithEmailAndPassword(email, password));
        return {
            sessionId: data.user.uid,
            email
        };
    } catch (err) {
        throw Error(err);
    }
};

export const signup = async (email, password) => {
    try {
        const data = await firebaseAuthWrap(firebase.auth().createUserWithEmailAndPassword(email, password));
        return {
            sessionId: data.user.uid,
            email
        };
    } catch (err) {
        throw Error(err);
    }
};

export const anonymous = async () => {
    const player = await firebase.auth().signInAnonymously();
    return player.user.uid;
};
