import { useContext, useState } from 'react';
import Link from 'next/link';

import { SessionContext } from 'contexts/SessionContext';

import styles from './signup.module.scss';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [_, dispatch] = useContext(SessionContext);

    const handleSignup = () => {
        fetch('/api/signup', {
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
                    type: 'SET_PLAYER',
                    payload: player
                });
            });
    };

    return (
        <section className={styles.signupContainer}>
            <div className={styles.login}>
                <Link href="/login"><a>LOG IN</a></Link>
            </div>
            <div className={styles.signupForm}>
                <div>
                    <label>Email</label>
                    <input type="text" value={email} placeholder="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} placeholder="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <button onClick={handleSignup}>SIGN UP</button>
            </div>
        </section>
    );
};

export default Signup;
