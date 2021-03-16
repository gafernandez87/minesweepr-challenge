// NextJS
import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Minesweeper from 'components/Minesweeper/Minesweeper';

// Styles
import styles from 'components/Commons/home.module.scss';

export default function GameId () {
    const router = useRouter();

    const { gameId } = router.query;

    return (
        <div className={styles.inGameContainer}>
            <Head>
                <title>Minesweeper | Game</title>
            </Head>
            <Minesweeper gameId={gameId}/>

        </div>
    );
}
