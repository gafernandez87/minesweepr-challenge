// NextJS
import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Minesweeper from 'components/Minesweeper/Minesweeper';

// Styles
import styles from 'styles/Home.module.css';

export default function GameId () {
    const router = useRouter();

    const { gameId } = router.query;

    return (
        <div className={styles.inGameContainer}>
            <Head>
                <title>Minesweeper | Game</title>
                {/* <link rel="icon" href="/favicon.ico" />  TODO ICON */}
            </Head>
            <Minesweeper gameId={gameId}/>

        </div>
    );
}
