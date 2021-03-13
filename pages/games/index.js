// NextJS
import Head from 'next/head';

// Components
import Minesweeper from 'components/Minesweeper/Minesweeper';

// Styles
import styles from 'components/Commons/home.module.scss';

export default function newGamePage () {
    return (
        <div className={styles.inGameContainer}>
            <Head>
                <title>Minesweeper | Game</title>
                {/* <link rel="icon" href="/favicon.ico" />  TODO ICON */}
            </Head>
            <Minesweeper />

        </div>
    );
}
