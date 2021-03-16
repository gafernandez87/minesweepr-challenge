// Hooks
import { useContext } from 'react';

// Context
import { SessionContext } from 'contexts/SessionContext';

// Styles
import styles from './minesweeper.module.scss';

// Utils
import { getBoardSize, drawBoard, mapCodeToObject, getUpdatedCode } from 'components/Minesweeper/utils';
import { GAME_STATUS, CELL_STATUS } from 'utils/utils';
import { TYPES } from 'reducers/SessionReducer';

const GameBoard = () => {
    const [state, dispatch] = useContext(SessionContext);
    const { n, m, bombs, code, bombsObj } = state.game;
    const boardSize = getBoardSize(n, m);

    const handleCellClick = (coord, hasMine, isRightClick) => {
        if (state.game?.status === GAME_STATUS.PLAYING) {
            const bombsObj = state.game.bombsObj || mapCodeToObject(state.game.code);
            const updatedCode = getUpdatedCode(code, coord, bombsObj, hasMine, isRightClick);
            const updatedBombsObj = mapCodeToObject(updatedCode);
            const flagged = Object.values(updatedBombsObj).filter(s => s.status === CELL_STATUS.FLAGGED).length;

            if (isRightClick && (bombs - flagged < 0)) {
                return;
            }
            const covered = Object.values(updatedBombsObj).filter(s => s.status === CELL_STATUS.COVERED).length;

            let gameStatus = state.game.status;
            if (flagged === bombs && covered === 0 && (isRightClick || !hasMine)) {
                gameStatus = GAME_STATUS.WIN;
            } else if (!isRightClick && hasMine) {
                gameStatus = GAME_STATUS.GAME_OVER;
            }

            dispatch({
                type: TYPES.SET_GAME,
                payload: {
                    code: updatedCode,
                    bombsObj: updatedBombsObj,
                    status: gameStatus
                }
            });
        }
    };

    const flagged = Object.values(bombsObj).filter(s => s.status === CELL_STATUS.FLAGGED).length;
    return (
        <div>
            <h3>Bombs remaining: {bombs - flagged}</h3>
            <div style={{ width: boardSize.width, height: boardSize.height }} className={styles.minesweeper}>
                {drawBoard(code, handleCellClick, n, m)}
            </div>
        </div>
    );
};

export default GameBoard;
