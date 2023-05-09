import Head from 'next/head';
import {useUserContext} from '@/lib/auth';
import {Button, Icon, Flex} from '@chakra-ui/react';
import {logo} from '@/styles/theme';

export default function Home() {
    const {user, logoutUser, signInWithGithub} = useUserContext();

    return (
        <>
            <Head>
                <title>Fast Feedback</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex as="main" direction="column" align="center" justify="center" h="100vh">
                <Icon as={logo} boxSize="64px" />

                {user ? (
                    <Button onClick={logoutUser}>Sign Out</Button>               
                ) : (
                    <Button mt={4} size="sm" onClick={signInWithGithub}>
                        Sign In
                    </Button>
                )}
            </Flex>
        </>
    );
}
