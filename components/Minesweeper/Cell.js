import styles from './minesweeper.module.scss';
import { CELL_STATUS } from 'utils/utils';

const getCellContent = (status, hasMine, bombsAround) => {
    let content = '';
    const classes = [styles.cell];

    switch (status) {
    case CELL_STATUS.UNCOVERED: {
        classes.push(styles.uncovered);
        content = hasMine ? <img className={styles.icon} src='/bomb.png'/> : bombsAround;
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

const Cell = ({ coord, status, hasMine, bombsAround, cellClicked }) => {
    const { classes, content } = getCellContent(status, hasMine, bombsAround);

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
