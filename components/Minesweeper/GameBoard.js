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
    const { n, m, bombs, code } = state.game;
    const boardSize = getBoardSize(n, m, bombs);

    const handleCellClick = (coord, hasMine, isRightClick) => {
        if (state.game?.status === GAME_STATUS.PLAYING) {
            const bombsObj = state.game.bombsObj || mapCodeToObject(state.game.code);
            const updatedCode = getUpdatedCode(code, coord, bombsObj, hasMine, isRightClick);
            const updatedBombsObj = mapCodeToObject(updatedCode);
            const uncovered = Object.values(updatedBombsObj)
                .filter(s => s.status === CELL_STATUS.FLAGGED || s.status === CELL_STATUS.COVERED).length;

            let gameStatus = state.game.status;
            if (uncovered === bombs && !hasMine) {
                gameStatus = GAME_STATUS.WIN;
            } else if (!isRightClick && hasMine) {
                gameStatus = GAME_STATUS.GAME_OVER;
            }

            dispatch({
                type: TYPES.SET_GAME,
                payload: {
                    code: updatedCode,
                    status: gameStatus
                }
            });
        }
    };

    return (
        <div style={{ width: boardSize.width, height: boardSize.height }} className={styles.minesweeper}>
            {drawBoard(code, handleCellClick, bombs)}
        </div>
    );
};

export default GameBoard;
