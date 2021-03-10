import { signup } from '../../firebase_client'

export default async (req, res) => {
    const { method, body } = req

    if (method === 'POST') {
        const { email, password } = body
        signup(email, password)
            .then(user => {
                res.setHeader('Set-Cookie', `minesweeper_session_id=${user.user.uid}`)
                res.status(200).json(user)
            })
            .catch(error => {
                const errorCode = error.code
                const errorMessage = error.message
                console.error(`${errorCode} - ${errorMessage}`)
                res.status(500).json('An error occurred while signing up. Please try again')
            })
    } else {
        res.status(405).json('METHOD NOT ALLOWED')
    }
}
