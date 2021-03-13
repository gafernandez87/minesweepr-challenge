import styles from './dashboard.module.scss';

import { drawBoard, getBoardSize } from 'components/Minesweeper/utils';

const GameThumbnail = ({ game, handleClick }) => {
    const boardSize = getBoardSize(game.n, game.m);
    return (
        <div
            className={styles.gameThumbnailContainer}
            onClick={() => handleClick(game.id)}
        >
            <div>Starter: 10/10/2020</div>
            <div className={styles.miniGame}
                style={{ width: ((boardSize.width / 3) + 2), height: ((boardSize.height / 3) + 2) }}>
                {drawBoard(game.code, () => {})}
            </div>
        </div>
    );
};

export default GameThumbnail;
