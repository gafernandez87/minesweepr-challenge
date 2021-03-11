import 'styles/globals.css';
import React, { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from 'contexts/SessionContext';
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

function goingToLoginOrSignup (router) {
    return router.route === '/login' || router.route === '/signup';
}

function MyApp ({ Component, pageProps, sessionId }) {
    const [state, dispatch] = useReducer(sessionReducer, initialState);
    const router = useRouter();

    useEffect(() => {
        console.log({ sessionId, player: state.player });
        if (state.player && goingToLoginOrSignup(router)) {
            router.push('/dashboard');
        }

        if (!sessionId && !goingToLoginOrSignup(router)) {
            router.push('/login');
        } else if (!state.player) {
            loadPlayerBySessionId(sessionId).then(player => {
                dispatch({
                    type: 'SET_PLAYER',
                    payload: player
                });
            });
        }
    }, [state]);

    return (
        <SessionContext.Provider value={[state, dispatch]}>
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

    return { ...appProps, sessionId };
};

export default MyApp;
