import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const handleAnonymusLogin = () => {
        fetch('/api/signin', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(setUser);
    };
    return (
        <>
            <section>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={handleAnonymusLogin}>PLAY ANONYMOUS</button>
                <button onClick={handleAnonymusLogin}>LOGIN WITH GITHUB</button>
                {user && <h1>Hello {user.user.email}</h1>}
            </section>
        </>
    );
};

export default Login;
