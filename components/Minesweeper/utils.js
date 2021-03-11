import Cell from 'components/Minesweeper/Cell';

export const CELL_SIZE = 60;
export const BOARD_DEFAULT_SIZE = 4;
export const CELL_STATUS = {
    COVERED: 'c',
    UNCOVERED: 'u',
    FLAGGED: 'f'
};

export const BOMB_STATUS = {
    ACTIVE: 't',
    INACTIVE: 'f'
};

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
            code += `${i}-${j}|${CELL_STATUS.UNCOVERED}|${mine}_`;
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

export const countBombsAround = (code, coord) => {
    const bombsObj = mapCodeToObject(code);

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
