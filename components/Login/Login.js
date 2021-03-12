import { useContext, useState } from 'react';
import Link from 'next/link';

import { SessionContext } from 'contexts/SessionContext';

import styles from './login.module.scss';
import { TYPES } from 'reducers/SessionReducer';

const Login = () => {
    const [email, setEmail] = useState('gastonf87@gmail.com');
    const [password, setPassword] = useState('test1234');
    const [_, dispatch] = useContext(SessionContext);

    const handleEmailLogin = () => {
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
            .then(player => {
                dispatch({
                    type: TYPES.SET_PLAYER,
                    payload: player
                });
            });
    };
    return (
        <section className={styles.loginContainer}>
            <div className={styles.signUp}>
                <Link href="/signup"><a>SIGN UP</a></Link>
            </div>
            <div className={styles.emailLogin}>
                <div>
                    <label>Login</label>
                    <input type="text" value={email} placeholder="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} placeholder="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <button onClick={handleEmailLogin}>LOGIN WITH EMAIL</button>
            </div>
            <div className={styles.divider} />
            <button onClick={handleEmailLogin}>PLAY AS ANONYMOUS</button>
        </section>
    );
};

export default Login;
