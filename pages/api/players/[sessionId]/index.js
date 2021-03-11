import { getPlayerBySessionId } from 'firebase_client/players';

export default async (req, res) => {
    const { method, query: { sessionId } } = req;
    if (method === 'GET') {
        try {
            const player = await getPlayerBySessionId(sessionId);
            res.status(200).json(player);
            return;
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`${errorCode} - ${errorMessage}`);
            res.status(500).json('Player not found');
            return;
        };
    } else {
        res.status(405).json('METHOD NOT ALLOWED');
    }
};
