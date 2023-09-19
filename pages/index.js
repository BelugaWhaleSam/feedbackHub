import Head from 'next/head';
import {useUserContext} from '@/lib/auth';
import {Button, Icon, Flex, Text} from '@chakra-ui/react';
import {logo} from '@/styles/theme';
import {useRouter} from 'next/router';

export default function Home() {
    const {user, signInWithGithub} = useUserContext();
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Fast Feedback</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex as="main" maxW='md' mx="auto" direction="column" align="center" justify="center" h="100vh">
                <Icon  as={logo} boxSize="64px" />
                <Text fontSize='sm' as='cite'>
                    <b>Feedback Hub</b> is a live-deployed SaaS project built with Next. It allows website owners to seamlessly
                    add feedback and reviews functionality to their websites and manage them efficiently.
                </Text>

                {user ? (
                    <Button onClick={() => router.push('/dashboard')}>View Dashboard</Button>
                ) : (
                    <Button mt={4} size="sm" onClick={signInWithGithub}>
                        Sign In
                    </Button>
                )}
            </Flex>
        </>
    );
}
