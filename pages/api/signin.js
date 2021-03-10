import { signin } from '../../firebase_client';

export default async (req, res) => {
    const {method, body } = req;

    if (method === "POST") {
            const { email, password } =  body;
            signin(email, password)
            .then(user => {
                res.setHeader('Set-Cookie', `minesweeper_session_id=${user.user.uid}`);
                res.status(200).json(user);
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(`${errorCode} - ${errorMessage}`);
                res.status(500).json("User not found");
            });
    } else {
        res.status(405).json("METHOD NOT ALLOWED");
    }
}