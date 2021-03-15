// Context
import { SessionContext } from 'contexts/SessionContext';

// Hooks
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';

// Components
import GameThumbnail from 'components/Dashboard/GameThumbnail';
import NewGame from 'components/Dashboard/NewGame';

// Styles
import styles from './dashboard.module.scss';

const Dashboard = () => {
    const [games, setGames] = useState([]);
    const [state] = useContext(SessionContext);
    const router = useRouter();

    useEffect(() => {
        let flag = true;
        if (state.player && games.length === 0) {
            fetch(`/api/players/${state.player.sessionId}/games`)
                .then(res => res.json())
                .then(data => {
                    flag && setGames(data);
                });
        }
        return () => (flag = false);
    }, [state]);

    const goToGame = async (gameId) => {
        router.push(`/games/${gameId}`);
    };

    return (
        <div className={styles.gamesContainer}>
            <h2>Your Games</h2>
            <section className={styles.gameList}>
                <NewGame/>
                {games.map(game => <GameThumbnail key={game.id} game={game} handleClick={goToGame} />)}
            </section>
        </div>
    );
};

export default Dashboard;
