import styles from './dashboard.module.scss';
import { SessionContext } from 'contexts/SessionContext';
import { useState, useContext, useEffect } from 'react';
import GameThumbnail from 'components/Dashboard/GameThumbnail';
import NewGame from 'components/Dashboard/NewGame';

const Dashboard = () => {
    const [state, dispatch] = useContext(SessionContext);
    const [games, setGames] = useState([]);

    useEffect(() => {
        if (state.player) {
            fetch(`/api/players/${state.player.sessionId}/games`)
                .then(res => res.json())
                .then(setGames);
        }
    }, [state]);

    const goToGame = (gameId) => {
        console.log(gameId);
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
