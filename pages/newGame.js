// NextJS
import Head from 'next/head';

// Components
// import Login from 'components/Login/Login';

// Styles
import styles from 'styles/Home.module.css';

export default function newGamePage () {
    return (
        <div className={styles.container}>
            <Head>
                <title>Minesweeper | Game</title>
                {/* <link rel="icon" href="/favicon.ico" />  TODO ICON */}
            </Head>
            Game goes here!

        </div>
    );
}
