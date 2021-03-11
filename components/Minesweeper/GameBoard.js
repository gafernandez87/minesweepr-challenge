import styles from './minesweeper.module.scss';

import { getBoardSize, drawBoard, mapCodeToObject, CELL_STATUS } from 'components/Minesweeper/utils';

const GameBoard = ({ game, setGame }) => {
    const { n, m, bombs, code, bombsObj } = game;

    const handleCellClick = (coord, hasMine, isRightClick) => {
        let newCode = '';
        let newStatus = '';
        const currentStatus = bombsObj[`${coord}`]?.status;
        if (isRightClick) {
            if (currentStatus === CELL_STATUS.FLAGGED) {
                newStatus = CELL_STATUS.COVERED;
            } else if (currentStatus === CELL_STATUS.COVERED) {
                newStatus = CELL_STATUS.FLAGGED;
            }
        } else {
            if (currentStatus === CELL_STATUS.COVERED) {
                newStatus = CELL_STATUS.UNCOVERED;
            }
        }

        if (newStatus) {
            if (newStatus === CELL_STATUS.UNCOVERED && hasMine) {
                console.log('GAME OVER');
            }

            newCode = code.replace(`${coord}|${currentStatus}`, `${coord}|${newStatus}`);

            const newBombsObj = mapCodeToObject(newCode);
            setGame({
                ...game,
                code: newCode,
                bombsObj: newBombsObj
            });
        }
    };

    const boardSize = getBoardSize(n, m);
    return (
        <div style={{ width: boardSize.width, height: boardSize.height }} className={styles.minesweeper}>
            {drawBoard(code, handleCellClick)}
        </div>
    );
};

export default GameBoard;
