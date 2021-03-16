// Components
import Cell from 'components/Minesweeper/Cell';

// Utils
import { BOMB_STATUS, CELL_STATUS, CELL_SIZE, DIFFICULTY, GAME_STATUS } from 'utils/utils';
import moment from 'moment';

export const generateCode = (n, m, bombs, cheat) => {
    let code = '';
    const defaultStatus = cheat ? CELL_STATUS.UNCOVERED : CELL_STATUS.COVERED;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            code += `${i}-${j}|${defaultStatus}|${BOMB_STATUS.INACTIVE}_`;
        }
    }

    let mineCount = 0;
    const bombsObj = mapCodeToObject(code);
    while (mineCount < bombs) {
        const r1 = getRandom(0, n);
        const r2 = getRandom(0, m);
        const key = `${r1}-${r2}`;
        const cell = bombsObj[key];
        if (!cell || cell.hasMine) continue;
        code = code.replace(`${key}|${defaultStatus}|${BOMB_STATUS.INACTIVE}`, `${key}|${defaultStatus}|${BOMB_STATUS.ACTIVE}`);
        cell.hasMine = true;
        mineCount++;
    }

    // Remove the last _
    return code.substr(0, code.length - 1);
};

const getRandom = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min);
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

export const drawBoard = (code, handleCellClick, n, m) => {
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
            n={n}
            m={m}
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

export const getBoardSize = (n, m, bombs) => {
    const boardWidth = m * CELL_SIZE;
    const boardHeight = n * CELL_SIZE;
    const isBigBoard = n >= 15 || m >= 15;
    return {
        width: isBigBoard ? boardWidth / 3 : boardWidth,
        height: isBigBoard ? boardHeight / 3 : boardHeight
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

export const formatDate = (date) => {
    return moment(date).format('MM-DD-YYYY hh:mm');
};
export const calculateTime = (start, end) => {
    const startMoment = moment(start);
    const endMoment = moment(end);
    let duration = parseInt(moment.duration(endMoment.diff(startMoment)).asMinutes());
    if (duration !== 0) {
        return `${duration} minutes`;
    }
    duration = parseInt(moment.duration(endMoment.diff(startMoment)).asSeconds());
    return `${duration} seconds`;
};

export const mapDifficulty = difficulty => {
    switch (difficulty) {
    case DIFFICULTY.EASY:
        return 'Easy';
    case DIFFICULTY.NORMAL:
        return 'Normal';
    case DIFFICULTY.HARD:
        return 'Hard';
    default:
        return 'Custom';
    }
};

export const mapStatus = status => {
    switch (status) {
    case GAME_STATUS.WIN:
        return 'WON';
    case GAME_STATUS.GAME_OVER:
        return 'LOSE';
    default:
        return 'PLAYING';
    }
};
