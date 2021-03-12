// Styles
import { useRouter } from 'next/router';
import styles from './header.module.scss';

const Header = ({ state }) => {
    const { player } = state;

    const router = useRouter();

    return (
        <div className={styles.header}>
            <img src='/bomb.png' />
            <span>Welcome {player?.email || 'Anonymous'}</span>
            <span className={styles.dashboard} onClick={e => router.push('/dashboard')}>Dashboard</span>
        </div>
    );
};

export default Header;
