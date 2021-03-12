import styles from './minesweeper.module.scss';

import { getBoardSize, drawBoard, mapCodeToObject, getUpdatedCode, CELL_STATUS } from 'components/Minesweeper/utils';

const GameBoard = ({ game, setGame }) => {
    const { n, m, bombs, code, bombsObj } = game;
    const boardSize = getBoardSize(n, m);
    const handleCellClick = (coord, hasMine, isRightClick) => {
        const updatedCode = getUpdatedCode(code, coord, bombsObj, hasMine, isRightClick);
        const updatedBombsObj = mapCodeToObject(updatedCode);
        const uncovered = Object.values(updatedBombsObj).filter(s => s.status === CELL_STATUS.FLAGGED || s.status === CELL_STATUS.COVERED).length;

        let gameStatus;
        if (uncovered === bombs && !hasMine) {
            gameStatus = 'win';
        } else if (!isRightClick && hasMine) {
            gameStatus = 'lose';
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
