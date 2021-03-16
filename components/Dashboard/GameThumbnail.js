// Utils
import { formatDate, calculateTime, mapDifficulty, mapStatus } from 'components/Minesweeper/utils';

// Components
import MiniGame from './MiniGame';

// Styles
import styles from './dashboard.module.scss';
import { GAME_STATUS } from 'utils/utils';

const GameThumbnail = ({ game, handleClick }) => {
    const { status, startedDate, lastUpdate, difficulty, n, m } = game;

    const containerClasses = [styles.gameThumbnailContainer, styles.card];
    const ribbonClasses = [styles.ribbon, styles.ribbonTopRight].join(' ');
    return (
        <div
            className={containerClasses.join(' ')}
            onClick={() => handleClick(game.id)}
        >
            <MiniGame game={game}/>
            <div className={styles.gameOverview}>
                <div className={ribbonClasses}>
                    <span className={styles[status]}>{mapStatus(status)}</span>
                </div>
                <span><b>Size:</b> {n}x{m}</span>
                <span><b>Difficulty:</b> {mapDifficulty(difficulty)}</span>
                <span><b>Started:</b> {formatDate(startedDate)}</span>
                {status !== GAME_STATUS.PLAYING && <span><b>Time spent:</b> {calculateTime(startedDate, lastUpdate)}</span>}
            </div>
        </div>
    );
};

export default GameThumbnail;
