import styles from './header.module.scss';

const Header = ({ state }) => {
    const { player } = state;

    return <div className={styles.header}>
        <span>Welcome {player?.email || 'Anonymous'}</span>
    </div>;
};

export default Header;
