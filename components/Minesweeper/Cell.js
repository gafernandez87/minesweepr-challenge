import styles from './minesweeper.module.scss';
import { CELL_STATUS } from 'utils/utils';

const getCellContent = (status, hasMine, bombsAround, n, m) => {
    let content = '';
    const classes = [styles.cell];

    if (n >= 30 || m >= 30) {
        classes.push(styles.smallBoard);
    }

    switch (status) {
    case CELL_STATUS.UNCOVERED: {
        classes.push(styles.uncovered);
        content = hasMine ? <img className={styles.icon} src='/bomb.png'/> : bombsAround > 0 ? bombsAround : '';
        break;
    }
    case CELL_STATUS.FLAGGED: {
        classes.push(styles.flagged);
        content = <img className={styles.icon} src='/flag.png'/>;
        break;
    }
    default:
        classes.push(styles.covered);
        break;
    }
    return {
        classes, content
    };
};

const Cell = ({ coord, status, hasMine, bombsAround, cellClicked, n, m }) => {
    const { classes, content } = getCellContent(status, hasMine, bombsAround, n, m);

    const handleLeftClick = (e) => {
        e.preventDefault();
        cellClicked(coord, hasMine, false, bombsAround);
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        cellClicked(coord, hasMine, true);
    };

    return (
        <div
            className={classes.join(' ')}
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
        >
            {content}
        </div>
    );
};

export default Cell;
