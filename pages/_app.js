import 'styles/globals.css';
import React, { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from 'contexts/SessionContext';
import Header from 'components/Commons/Header';
import App from 'next/app';

function sessionReducer (state, action) {
    switch (action.type) {
    case 'SET_PLAYER': {
        return {
            ...state,
            player: action.payload
        };
    }
    default:
        return state;
    }
}

const initialState = {
    player: null
};

const loadPlayerBySessionId = sessionId => {
    return fetch(`/api/players/${sessionId}`)
        .then(res => res.json());
};

function isSigninSignUp (router) {
    return router.route === '/login' || router.route === '/signup';
}

function handleRedirect (player, router, sessionId) {
    if (player && isSigninSignUp(router)) {
        console.log('redirecting to dashboard');
        router.push('/dashboard');
    }

    if (!sessionId && !isSigninSignUp(router)) {
        console.log('redirecting to login');
        router.push('/login');
    }
}

function MyApp ({ Component, pageProps, sessionId }) {
    const [state, dispatch] = useReducer(sessionReducer, initialState);
    const router = useRouter();

    useEffect(() => {
        handleRedirect(state.player, router, sessionId);

        if (!state.player && sessionId) {
            console.log('fetching player');
            loadPlayerBySessionId(sessionId).then(player => {
                dispatch({
                    type: 'SET_PLAYER',
                    payload: player
                });
            });
        }
    }, [state]);

    const showHeader = !isSigninSignUp(router);

    return (
        <SessionContext.Provider value={[state, dispatch]}>
            {showHeader && <Header state={state} />}
            <Component {...pageProps} />
        </SessionContext.Provider>
    );
}

MyApp.getInitialProps = async (appContext) => {
    const { ctx } = appContext;
    const { req } = ctx;
    const cookies = req?.headers?.cookie?.split('; ') || [];
    const session = cookies.find(cookie => cookie.indexOf('minesweeper_session_id') === 0);
    const sessionId = session?.split('=')[1] || null;

    const appProps = await App.getInitialProps(appContext);

    console.log(appProps);
    return { ...appProps, sessionId };
};

export default MyApp;
