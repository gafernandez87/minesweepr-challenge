import { getGameById, saveGame } from 'firebase_client/games';

export default async (req, res) => {
    const { method, query: { gameId, sessionId }, body } = req;
    if (method === 'GET') {
        try {
            const game = await getGameById(sessionId, gameId);
            if (game) {
                res.setHeader('Set-Cookie', `minesweeper_current_game=${game.id}; path=/`);
                res.status(200).json(game);
                return;
            } else {
                res.status(404).json({ error: 'Game not found' });
                return;
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`${errorCode} - ${errorMessage}`);
            res.status(500).json({ error: errorMessage });
            return;
        };
    } else if (method === 'PATCH') {
        try {
            const gameUpdated = await saveGame(gameId, body);
            if (gameUpdated) {
                res.status(200).send();
            } else {
                res.status(500).json({ error: 'An error occurred while saving' });
            }
            return;
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`${errorCode} - ${errorMessage}`);
            res.status(500).json({ error: 'There was an error while saving your game' });
            return;
        };
    } else {
        res.status(405).json({ error: 'METHOD NOT ALLOWED' });
    }
};
