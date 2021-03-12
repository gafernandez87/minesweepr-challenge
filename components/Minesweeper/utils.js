// Components
import Cell from 'components/Minesweeper/Cell';

// Utils
import { BOMB_STATUS, CELL_STATUS, CELL_SIZE } from 'utils/utils';

export const generateCode = (n, m, bombs) => {
    let code = '';
    let mineCount = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let mine = getRandomMine();
            if (mine === BOMB_STATUS.ACTIVE) {
                mine = getRandomMine();
                if (mineCount < bombs && mine === BOMB_STATUS.ACTIVE) {
                    mineCount++;
                } else {
                    mine = BOMB_STATUS.INACTIVE;
                }
            }
            code += `${i}-${j}|${CELL_STATUS.COVERED}|${mine}_`;
        }
    }

    // Remove the last _
    return code.substr(0, code.length - 1);
};

export const getRandomMine = () => {
    return Math.round((Math.random() * 1) + 0) === 0 ? BOMB_STATUS.ACTIVE : BOMB_STATUS.INACTIVE;
};

export const mapCodeToObject = (code) => {
    const cells = code.split('_');
    const mapped = cells.map(cell => {
        const cellDetails = cell.split('|');
        const coord = cellDetails[0];
        const status = cellDetails[1];
        const hasMine = cellDetails[2];
        return {
            [coord]: {
                hasMine: hasMine === BOMB_STATUS.ACTIVE,
                status
            }
        };
    });
    const newObj = Object.assign({}, ...mapped);
    return newObj;
};

export const drawBoard = (code, handleCellClick) => {
    const cells = code.split('_');
    return cells.map(cell => {
        const cellDetails = cell.split('|');
        const coord = cellDetails[0];
        const cellStatus = cellDetails[1];
        const hasMine = cellDetails[2];
        const bombsAround = countBombsAround(code, coord);

        return <Cell
            key={coord}
            coord={coord}
            status={cellStatus}
            bombsAround={bombsAround}
            hasMine={hasMine === BOMB_STATUS.ACTIVE}
            cellClicked={handleCellClick}
        />;
    });
};

export const countBombsAround = (code, coord, newBombsObj) => {
    const bombsObj = newBombsObj || mapCodeToObject(code);

    let bombs = 0;
    const x = parseInt(coord.split('-')[0]);
    const y = parseInt(coord.split('-')[1]);

    bombs += bombsObj[`${(x - 1)}-${y}`]?.hasMine ? 1 : 0;
    bombs += bombsObj[`${(x + 1)}-${y}`]?.hasMine ? 1 : 0;
    bombs += bombsObj[`${x}-${(y + 1)}`]?.hasMine ? 1 : 0;
    bombs += bombsObj[`${x}-${(y - 1)}`]?.hasMine ? 1 : 0;
    bombs += bombsObj[`${(x + 1)}-${(y - 1)}`]?.hasMine ? 1 : 0;
    bombs += bombsObj[`${(x - 1)}-${(y - 1)}`]?.hasMine ? 1 : 0;
    bombs += bombsObj[`${(x + 1)}-${(y + 1)}`]?.hasMine ? 1 : 0;
    bombs += bombsObj[`${(x - 1)}-${(y + 1)}`]?.hasMine ? 1 : 0;

    return bombs;
};

export const getBoardSize = (n, m) => {
    const boardWidth = m * CELL_SIZE;
    const boardHeight = n * CELL_SIZE;
    return {
        width: boardWidth,
        height: boardHeight
    };
};

export const getUpdatedCode = (code, coord, bombsObj, hasMine, isRightClick) => {
    const currentStatus = bombsObj[`${coord}`]?.status;
    if (!currentStatus) return code;
    let newStatus = '';

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
        let newCode = code.replace(`${coord}|${currentStatus}`, `${coord}|${newStatus}`);

        if (isRightClick) return newCode;

        const newBombsObj = mapCodeToObject(newCode);
        const bombsAround = countBombsAround(code, coord, newBombsObj);

        if (bombsAround === 0 && !hasMine) {
            const x = parseInt(coord.split('-')[0]);
            const y = parseInt(coord.split('-')[1]);
            newCode = getUpdatedCode(newCode, `${(x - 1)}-${y}`, newBombsObj, false, isRightClick);
            newCode = getUpdatedCode(newCode, `${(x - 1)}-${(y - 1)}`, newBombsObj, false, isRightClick);
            newCode = getUpdatedCode(newCode, `${x}-${(y - 1)}`, newBombsObj, false, isRightClick);
            newCode = getUpdatedCode(newCode, `${(x + 1)}-${y}`, newBombsObj, false, isRightClick);
            newCode = getUpdatedCode(newCode, `${(x + 1)}-${(y + 1)}`, newBombsObj, false, isRightClick);
            newCode = getUpdatedCode(newCode, `${x}-${(y + 1)}`, newBombsObj, false, isRightClick);
            return newCode;
        } else {
            return newCode;
        }
    }
    return code;
};
