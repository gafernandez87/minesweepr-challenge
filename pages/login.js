// NextJS
import Head from 'next/head';

// Components
import Login from 'components/Login/Login';

// Styles
import styles from 'styles/Home.module.css';

export default function LoginPage () {
    return (
        <div className={styles.container}>
            <Head>
                <title>Minesweeper | Login</title>
                {/* <link rel="icon" href="/favicon.ico" />  TODO ICON */}
            </Head>
            <Login />

        </div>
    );
}
