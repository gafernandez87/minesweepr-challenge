// Next
import Link from 'next/link';

// Hooks
import { useContext, useState } from 'react';

// Components
import { Notification, NOTIFICATION_TYPE } from 'components/Commons/Notification';

// Context
import { SessionContext } from 'contexts/SessionContext';
import { TYPES } from 'reducers/SessionReducer';

// Styles
import styles from './login.module.scss';

// Utils
import cookie from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState({});
    const [_, dispatch] = useContext(SessionContext);

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
                if (player.error) throw new Error(player.error);
                dispatch({
                    type: TYPES.SET_PLAYER,
                    payload: player
                });
            })
            .catch(err => {
                showNotification(err.message, NOTIFICATION_TYPE.ERROR, 3000);
            });
    };

    const handleAnonymousLogin = () => {
        cookie.set('minesweeper_session_id', 'anonymous');
        cookie.set('minesweeper_current_game', 'anonymous');
        dispatch({
            type: TYPES.SET_PLAYER,
            payload: {
                email: 'anonymous',
                sessionId: 'anonymous'
            }
        });
    };

    return (
        <section className={styles.loginContainer}>
            <Notification message={notification.message} type={notification.type} visible={notification.visible}/>
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
            <button onClick={handleAnonymousLogin}>PLAY AS ANONYMOUS</button>
        </section>
    );
};

export default Login;
