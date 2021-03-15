// Utils
import { drawBoard, getBoardSize } from 'components/Minesweeper/utils';
import { DIFFICULTY } from 'utils/utils';

// Styles
import styles from './dashboard.module.scss';

const MinGame = ({ game }) => {
    const { difficulty, code, n, m } = game;
    const boardSize = getBoardSize(n, m, 0);
    const isCustomGame = difficulty === DIFFICULTY.CUSTOM;
    let stylesObj = { width: ((boardSize.width / 3) + 2), height: ((boardSize.height / 3) + 2) };

    const classes = [styles.miniGame];
    if (isCustomGame) {
        classes.push(styles.customGame);
        stylesObj = {};
    }

    return (
        <div className={classes}
            style={stylesObj}>
            {isCustomGame ? 'PREVIEW NOT AVAILABLE' : drawBoard(code, () => {}, n, m)}
        </div>
    );
};

export default MinGame;
