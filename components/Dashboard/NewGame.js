import styles from './dashboard.module.scss';

import { useContext } from 'react';
import { SessionContext } from 'contexts/SessionContext';
import { useRouter } from 'next/router';
import { TYPES } from 'reducers/SessionReducer';
import cookie from 'js-cookie';

const NewGame = () => {
    const [state, dispatch] = useContext(SessionContext);
    const router = useRouter();

    const goToNewGame = () => {
        cookie.remove('minesweeper_current_game');
        router.push('/games');
        dispatch({
            type: TYPES.CLEAR_GAME
        });
    };

    return (
        <span
            className={[styles.newGameThumbnailContainer, styles.card].join(' ')}
            onClick={goToNewGame}>
                NEW GAME
        </span>
    );
};

export default NewGame;
