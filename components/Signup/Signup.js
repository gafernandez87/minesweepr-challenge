// Next
import Link from 'next/link';

// Hooks
import { useContext, useState } from 'react';

// Components
import { Notification, NOTIFICATION_TYPE } from 'components/Commons/Notification';

// Context
import { SessionContext } from 'contexts/SessionContext';

// Styles
import styles from './signup.module.scss';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [_, dispatch] = useContext(SessionContext);
    const [notification, setNotification] = useState({});

    const showNotification = (message, type, hide) => {
        setNotification({
            message,
            type,
            visible: message !== ''
        });
        if (hide) {
            setTimeout(() => showNotification('', ''), hide);
        }
    };

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
                if (player.error) throw new Error(player.error);
                dispatch({
                    type: 'SET_PLAYER',
                    payload: player
                });
            })
            .catch(err => {
                showNotification(err.message, NOTIFICATION_TYPE.ERROR, 3000);
            });
    };

    return (
        <section className={styles.signupContainer}>
            <Notification message={notification.message} type={notification.type} visible={notification.visible}/>
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
