import Head from 'next/head';
import {useUserContext} from '@/lib/auth';
import {Heading, Button, Text, Code} from '@chakra-ui/react';

export default function Home() {
    const {user, logoutUser, signInWithGithub} = useUserContext();

    return (
        <>
            <Head>
                <title>Fast Feedback</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Heading>Fast Feedback</Heading>

                {user ? (
                    <Button onClick={logoutUser}>Sign Out</Button>
                ) : (
                    <Button onClick={signInWithGithub}>Sign In</Button>
                )}
                <Text>
                    Current User: <Code>{user?.email}</Code>
                </Text>
            </main>
        </>
    );
}
