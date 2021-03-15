// Utils
import { formatDate, mapDifficulty, mapStatus } from 'components/Minesweeper/utils';

// Components
import MiniGame from './MiniGame';

// Styles
import styles from './dashboard.module.scss';

const GameThumbnail = ({ game, handleClick }) => {
    const { status, startedDate, difficulty, n, m } = game;

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
            </div>
        </div>
    );
};

export default GameThumbnail;
