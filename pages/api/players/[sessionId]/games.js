import { getGamesByFilter, OPERATORS, FIELDS } from 'firebase_client/games';

export default async (req, res) => {
    const { method, query: { sessionId } } = req;
    if (method === 'GET') {
        try {
            const games = await getGamesByFilter(FIELDS.SESSION_ID, OPERATORS.EQUALS, sessionId);
            res.status(200).json(games);
            return;
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`${errorCode} - ${errorMessage}`);
            res.status(500).json('There was an error while getting games for player ' + sessionId);
            return;
        };
    } else {
        res.status(405).json('METHOD NOT ALLOWED');
    }
};
