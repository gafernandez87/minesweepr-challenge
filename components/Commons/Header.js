// Hooks
import { useRouter } from 'next/router';
import { useContext } from 'react';

// Context
import { SessionContext } from 'contexts/SessionContext';

// Styles
import styles from './header.module.scss';

// Utils
import { TYPES } from 'reducers/SessionReducer';
import cookie from 'js-cookie';

const Header = () => {
    const router = useRouter();
    const [state, dispatch] = useContext(SessionContext);

    const signout = () => {
        cookie.remove('minesweeper_current_game');
        cookie.remove('minesweeper_session_id');

        dispatch({
            type: TYPES.SET_PLAYER,
            payload: null
        });
    };

    const goToDashboard = () => {
        cookie.remove('minesweeper_current_game');
        dispatch({
            type: TYPES.CLEAR_GAME
        });
        router.push('/dashboard');
    };

    const playerId = state?.player?.sessionId;
    const isAnonymous = playerId && playerId === 'anonymous';
    return (
        <div className={styles.header}>
            {playerId && (
                <>
                    <span>Welcome {state.player?.email}</span>
                    {!isAnonymous && (
                        <span className={styles.dashboard} onClick={goToDashboard}>Dashboard</span>
                    )}
                    <span className={styles.logout} onClick={signout}>{isAnonymous ? 'EXIT' : 'SIGN OUT'}</span>
                </>
            )}

        </div>
    );
};

export default Header;
