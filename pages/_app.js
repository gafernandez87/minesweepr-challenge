// Components
import Header from 'components/Commons/Header';

// Hooks
import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';

// Context
import { SessionContext } from 'contexts/SessionContext';

// Reducer
import { sessionReducer, TYPES, initialState } from 'reducers/SessionReducer';

// Utils
import { handleRedirect, loadPlayerBySessionId, isSigninSignUp } from 'utils/utils';
import cookie from 'js-cookie';

// styles
import 'styles/globals.scss';

function MyApp ({ Component, pageProps }) {
    const [state, dispatch] = useReducer(sessionReducer, initialState);
    const router = useRouter();

    useEffect(() => {
        const sessionId = cookie.get('minesweeper_session_id');
        const isAnonymous = sessionId === 'anonymous';

        if (isAnonymous && !state.player) {
            dispatch({
                type: TYPES.SET_PLAYER,
                payload: {
                    email: 'anonymous',
                    sessionId: 'anonymous'
                }
            });
        }

        const redirected = handleRedirect(router, sessionId, isAnonymous);

        if (!redirected) {
            if (sessionId && !state.player) {
                loadPlayerBySessionId(sessionId).then(player => {
                    dispatch({
                        type: TYPES.SET_PLAYER,
                        payload: player
                    });
                });
            }
        }
    }, [state]);

    const showHeader = !isSigninSignUp(router.route);

    return (
        <SessionContext.Provider value={[state, dispatch]}>
            {showHeader && <Header state={state} />}
            <Component {...pageProps} />
        </SessionContext.Provider>
    );
}

export default MyApp;
