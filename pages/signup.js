// NextJS
import Head from 'next/head';

// Components
import Signup from 'components/Signup/Signup';

// Styles
import styles from 'pages/games/node_modules/styles/Home.module.css';

export default function SignupPage () {
    return (
        <div className={styles.container}>
            <Head>
                <title>Minesweeper | Signup</title>
                {/* <link rel="icon" href="/favicon.ico" />  TODO ICON */}
            </Head>
            <Signup />

        </div>
    );
};
