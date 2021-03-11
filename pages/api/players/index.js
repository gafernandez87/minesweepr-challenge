import { createPlayer, getAllPlayers } from 'firebase_client/players';

export default async (req, res) => {
    const { method, body } = req;
    if (method === 'POST') {
        const { email, sessionId } = body;
        try {
            const newPlayer = await createPlayer(sessionId, email);
            res.status(200).json(newPlayer);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`${errorCode} - ${errorMessage}`);
            res.status(500).json('Player not found');
        };
    } else if (method === 'GET') {
        const players = await getAllPlayers();
        res.status(200).json(players);
    } else {
        res.status(405).json('METHOD NOT ALLOWED');
    }
};
