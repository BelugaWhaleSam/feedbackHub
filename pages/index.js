import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import {useUserContext} from '@/lib/auth';

export default function Home() {
    const {user, logoutUser, signInWithGithub} = useUserContext();

    return (
        <>
            <Head>
                <title>Fast Feedback</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className={styles.center}>
                    <h1> Fast Feedback</h1>
                </div>
                <div className={styles.center}>
                    <button onClick={signInWithGithub}>Sign In</button>
                    {user && <button onClick={logoutUser}>Sign Out</button>}
                </div>
                <div className={styles.center}>{user?.email}</div>
            </main>
        </>
    );
}
