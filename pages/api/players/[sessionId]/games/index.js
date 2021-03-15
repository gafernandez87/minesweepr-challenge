import { getGamesByFilter, createGame } from 'firebase_client/games';
import { OPERATORS } from 'firebase_client/utils/utils';

export default async (req, res) => {
    const { method, query: { sessionId }, body } = req;
    if (method === 'GET') {
        try {
            const games = await getGamesByFilter('sessionId', OPERATORS.EQUALS, sessionId);
            games.sort((a, b) => a.difficulty < b.difficulty ? 1 : -1);
            res.status(200).json(games);
            return;
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`${errorCode} - ${errorMessage}`);
            res.status(500).json('There was an error while getting games for player ' + sessionId);
            return;
        };
    } else if (method === 'POST') {
        try {
            const newGame = await createGame(sessionId, body);
            res.setHeader('Set-Cookie', `minesweeper_current_game=${newGame.id}; path=/`);
            res.status(200).json(newGame);
            return;
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`${errorCode} - ${errorMessage}`);
            res.status(500).json('There was an error while creating the games');
            return;
        };
    } else {
        res.status(405).json('METHOD NOT ALLOWED');
    }
};
