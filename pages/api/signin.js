import { signin } from 'firebase_client';

export default async (req, res) => {
    const { method, body } = req;

    if (method === 'POST') {
        try {
            const { email, password } = body;
            const player = await signin(email, password);
            res.setHeader('Set-Cookie', `minesweeper_session_id=${player.sessionId}; path=/`);
            res.status(200).json(player);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`${errorCode} - ${errorMessage}`);
            res.status(500).json('Player not found');
        };
    } else {
        res.status(405).json('METHOD NOT ALLOWED');
    }
};
