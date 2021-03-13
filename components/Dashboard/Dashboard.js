// Context
import { SessionContext } from 'contexts/SessionContext';

// Hooks
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';

// Components
import GameThumbnail from 'components/Dashboard/GameThumbnail';
import NewGame from 'components/Dashboard/NewGame';

// Utils
import { TYPES } from 'reducers/SessionReducer';

// Styles
import styles from './dashboard.module.scss';

const Dashboard = () => {
    const [state, dispatch] = useContext(SessionContext);
    const [games, setGames] = useState([]);
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
        if (state.game) {
            router.push(`/games/${state.game.id}`);
        }
        return () => (flag = false);
    }, [state]);

    const goToGame = async (gameId) => {
        const rawGame = await fetch(`/api/players/${state.player.sessionId}/games/${gameId}`);
        const game = await rawGame.json();
        dispatch({
            type: TYPES.SET_GAME,
            payload: game
        });
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
