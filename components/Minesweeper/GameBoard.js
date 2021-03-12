// Utils
import { getBoardSize, drawBoard, mapCodeToObject, getUpdatedCode } from 'components/Minesweeper/utils';
import { GAME_STATUS, CELL_STATUS } from 'utils/utils';

// Styles
import styles from './minesweeper.module.scss';

const GameBoard = ({ game, setGame }) => {
    const { n, m, bombs, code } = game;
    const boardSize = getBoardSize(n, m);

    const handleCellClick = (coord, hasMine, isRightClick) => {
        const bombsObj = game.bombsObj || mapCodeToObject(game.code);
        const updatedCode = getUpdatedCode(code, coord, bombsObj, hasMine, isRightClick);
        const updatedBombsObj = mapCodeToObject(updatedCode);
        const uncovered = Object.values(updatedBombsObj)
            .filter(s => s.status === CELL_STATUS.FLAGGED || s.status === CELL_STATUS.COVERED).length;

        let gameStatus = game.status;
        if (uncovered === bombs && !hasMine) {
            gameStatus = GAME_STATUS.WIN;
        } else if (!isRightClick && hasMine) {
            gameStatus = GAME_STATUS.GAME_OVER;
        }

        setGame({
            ...game,
            code: updatedCode,
            bombsObj: updatedBombsObj,
            status: gameStatus
        });
    };

    return (
        <div style={{ width: boardSize.width, height: boardSize.height }} className={styles.minesweeper}>
            {drawBoard(code, handleCellClick)}
        </div>
    );
};

export default GameBoard;
