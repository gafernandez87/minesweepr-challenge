import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

import Home from '../components/Home';

export default function App () {
    return (
        <div className={styles.container}>
            <Head>
                <title>Minesweeper</title>
                {/* <link rel="icon" href="/favicon.ico" />  TODO ICON */}
            </Head>
            <Home />

        </div>
    );
}
