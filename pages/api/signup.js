import { signup } from 'firebase_client';
import { createPlayer } from 'firebase_client/players';

export default async (req, res) => {
    const { method, body } = req;

    if (method === 'POST') {
        const { email, password } = body;
        let newUser = null;
        try {
            newUser = await signup(email, password);
        } catch (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        try {
            const newPlayer = await createPlayer(newUser.sessionId, email);

            res.setHeader('Set-Cookie', `minesweeper_session_id=${newPlayer.sessionId}; path=/`);
            res.status(200).json(newPlayer);
            return;
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`${errorCode} - ${errorMessage}`);
            res.status(500).json('An error occurred while signing up. Please try again');
        }
    } else {
        res.status(405).json('METHOD NOT ALLOWED');
    }
};
