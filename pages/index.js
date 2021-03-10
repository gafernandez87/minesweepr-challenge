import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleAnonymusLogin = () => {
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
            .then(setUser)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Minesweeper</title>
                {/* <link rel="icon" href="/favicon.ico" />  TODO ICON */}
            </Head>
            <section>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={handleAnonymusLogin}>PLAY ANONYMOUS</button>
                <button onClick={handleAnonymusLogin}>LOGIN WITH GITHUB</button>
                {user && <h1>Hello {user.user.email}</h1>}
            </section>
        </div>
    )
}
