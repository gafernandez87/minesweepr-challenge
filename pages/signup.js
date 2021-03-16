// NextJS
import Head from 'next/head';

// Components
import Signup from 'components/Signup/Signup';

// Styles
import styles from 'components/Commons/home.module.scss';

export default function SignupPage () {
    return (
        <div className={styles.container}>
            <Head>
                <title>Minesweeper | Signup</title>
            </Head>
            <Signup />
        </div>
    );
};
