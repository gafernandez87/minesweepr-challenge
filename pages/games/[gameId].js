// NextJS
import Head from 'next/head';

// Components
import Minesweeper from 'components/Minesweeper/Minesweeper';

// Styles
import styles from 'styles/Home.module.css';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from 'contexts/SessionContext';

export default function GameId () {
    const [game, setGame] = useState(null);
    const router = useRouter();
    const [state] = useContext(SessionContext);

    useEffect(() => {
        if (state?.player) {
            const game = state?.game || null;
            if (game) {
                setGame(game);
            } else {
                const sessionId = state?.player?.sessionId;
                const { gameId } = router.query;
                fetch(`/api/players/${sessionId}/games/${gameId}`)
                    .then(res => res.json())
                    .then(setGame);
            }
        }
    }, [state]);

    return (
        <div className={styles.inGameContainer}>
            <Head>
                <title>Minesweeper | Game</title>
                {/* <link rel="icon" href="/favicon.ico" />  TODO ICON */}
            </Head>
            {game && <Minesweeper initialGame={game}/>}

        </div>
    );
}
