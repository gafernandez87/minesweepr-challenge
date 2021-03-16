// Hooks
import { useContext } from 'react';
import { useRouter } from 'next/router';

// Context
import { SessionContext } from 'contexts/SessionContext';

// Utils
import { TYPES } from 'reducers/SessionReducer';
import cookie from 'js-cookie';

// styles
import styles from './dashboard.module.scss';

const NewGame = () => {
    const [_, dispatch] = useContext(SessionContext);
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
