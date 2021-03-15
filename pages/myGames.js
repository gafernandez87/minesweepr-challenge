// NextJS
// import Head from 'next/head';

// Components
// import Login from 'components/Login/Login';

// Styles
import styles from 'components/Commons/home.module.scss';
import { useContext, useEffect } from 'react';

// Utils
import cookie from 'js-cookie';
import { TYPES } from 'reducers/SessionReducer';
import { SessionContext } from 'contexts/SessionContext';

export default function MyGames () {
    const [state, dispatch] = useContext(SessionContext);
    useEffect(() => {
        cookie.remove('minesweeper_current_game');
        dispatch({
            type: TYPES.CLEAR_GAME
        });
    });
    return (
        <div className={styles.container}>

            <div>My Games</div>

        </div>
    );
}
