import styles from './dashboard.module.scss';

import Link from 'next/link';

const NewGame = () => {
    return (
        <Link href='/newGame'>
            <a className={styles.newGameThumbnailContainer}>+</a>
        </Link>
    );
};

export default NewGame;
