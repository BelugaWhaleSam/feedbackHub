import Head from 'next/head';
import {useUserContext} from '@/lib/auth';
import {Button, Icon, Flex, Text, Stack} from '@chakra-ui/react';
import {logo} from '@/styles/theme';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function Home() {
    const {user, signInWithGithub, signInWithGoogle} = useUserContext();
    return (
        <>
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    if(document.cookie && document.cookie.includes('feedback-hub-auth')) {
                        window.location.href = "/dashboard"
                    }
                `,
                    }}
                />
                <title>Fast Feedback</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex as="main" maxW="md" mx="auto" direction="column" align="center" justify="center" h="100vh">
                <Icon as={logo} boxSize="64px" />
                <Text fontSize="lg" as='cite' p={8}>
                    <b>Feedback Hub</b> is a live-deployed SaaS project built with Next. It allows website owners to
                    seamlessly add feedback and reviews functionality to their websites and manage them efficiently.
                </Text>

                {user ? (
                     <Button
                     as="a"
                     href="/dashboard"
                     backgroundColor="gray.900"
                     color="white"
                     fontWeight="medium"
                     mt={4}
                     maxW="200px"
                     _hover={{ bg: 'gray.700' }}
                     _active={{
                       bg: 'gray.800',
                       transform: 'scale(0.95)'
                     }}
                   >
                     View Dashboard
                   </Button>
                ) : (
                    <Stack>
                    <Button
                        mt={4}
                        size="md"
                        leftIcon={<FaGithub />}
                        onClick={signInWithGithub}
                        backgroundColor="gray.900"
                        color="white"
                        fontWeight="medium"
                        _hover={{bg: 'gray.700'}}
                        _active={{
                            bg: 'gray.800',
                            transform: 'scale(0.95)',
                        }}
                    >
                        Sign In with GitHub
                    </Button>
                    <Button
                        mt={4}
                        size="md"
                        onClick={signInWithGoogle}
                        leftIcon={<FcGoogle />}
                        backgroundColor="white"
                        color="gray.900"
                        variant="outline"
                        fontWeight="medium"
                        _hover={{bg: 'gray.100'}}
                        _active={{
                            bg: 'gray.100',
                            transform: 'scale(0.95)',
                        }}
                    >
                        Sign In with Google
                    </Button>
                    </ Stack>
                )}
            </Flex>
        </>
    );
}
