import styles from './dashboard.module.scss';

const GameThumbnail = ({ game, handleClick }) => {
    return (
        <div
            className={styles.gameThumbnailContainer}
            onClick={() => handleClick(game.id)}>
            {game.status}
        </div>
    );
};

export default GameThumbnail;
