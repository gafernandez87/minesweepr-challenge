import { useContext, useEffect, useState } from 'react';
import { SessionContext } from 'contexts/SessionContext';

const Dashboard = () => {
    const [state, dispatch] = useContext(SessionContext);
    const [games, setGames] = useState([]);

    useEffect(() => {
        if (state.player) {
            console.log(state.player);
            fetch(`/api/players/${state.player.id}/games`)
                .then(res => res.json())
                .then(setGames);
        }
    }, [state]);

    return (
        <div>
            Dashboard
            {/* <h1>{JSON.stringify(state.player.email)}</h1> */}
            <h1>{state.player?.email}</h1>
            {games.map(game => <div key={game.id}>{JSON.stringify(game)}</div>)}
        </div>
    );
};

export default Dashboard;
