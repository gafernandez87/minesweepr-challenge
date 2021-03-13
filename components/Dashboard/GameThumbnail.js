// Utils
import { drawBoard, getBoardSize, formatDate } from 'components/Minesweeper/utils';
import { GAME_STATUS } from 'utils/utils';

// Styles
import styles from './dashboard.module.scss';

const GameThumbnail = ({ game, handleClick }) => {
    const boardSize = getBoardSize(game.n, game.m);
    const { status, code, startedDate } = game;
    const containerClasses = [styles.gameThumbnailContainer];

    if (status === GAME_STATUS.GAME_OVER || status === GAME_STATUS.WIN) {
        containerClasses.push(styles[status]);
    }
    return (
        <div
            className={containerClasses.join(' ')}
            onClick={() => handleClick(game.id)}
        >
            <div className={styles.miniGame}
                style={{ width: ((boardSize.width / 3) + 2), height: ((boardSize.height / 3) + 2) }}>
                {drawBoard(code, () => {})}
            </div>
            <div>Started: {formatDate(startedDate)}</div>
        </div>
    );
};

export default GameThumbnail;
