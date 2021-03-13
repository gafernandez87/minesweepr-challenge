// NextJS
import Head from 'next/head';

// Components
import Minesweeper from 'components/Minesweeper/Minesweeper';

// Styles
import styles from 'components/Commons/home.module.scss';
import { useEffect, useState } from 'react';

// Utils
import cookie from 'js-cookie';

export default function newGamePage () {
    const [gameId, setGameId] = useState(null);
    useEffect(() => {
        const gameId = cookie.get('minesweeper_current_game');
        gameId && setGameId(gameId);
    }, []);
    return (
        <div className={styles.inGameContainer}>
            <Head>
                <title>Minesweeper | Game</title>
                {/* <link rel="icon" href="/favicon.ico" />  TODO ICON */}
            </Head>
            <Minesweeper gameId={gameId} />

        </div>
    );
}
