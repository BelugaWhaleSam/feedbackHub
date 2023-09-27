import React from 'react';
import {Box, Button, Flex, Link, Avatar, Text, Icon} from '@chakra-ui/react';
import NextLink from 'next/link';
import {useUserContext} from '@/lib/auth';
import {logo} from '@/styles/theme';

const DashboardShell = ({children}) => {
    const {user, logoutUser} = useUserContext();

    return (
        <Box backgroundColor="gray.100" h="100vh">
            <Flex backgroundColor="white" mb={16} w="full">
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    pt={4}
                    pb={4}
                    maxW="1250px"
                    margin="0 auto"
                    w="full"
                    px={8}
                >
                    <Flex align="center" gap={4}>
                        <NextLink as="a" href="/" passHref>
                            <Icon as={logo} boxSize="40px" mr={2} />
                        </NextLink>
                        <Button as="a" href="/dashboard" backgroundColor="white">
                            Sites
                        </Button>
                        <Button as="a" href="/feedback" backgroundColor="white">
                            Feedback
                        </Button>
                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                        {user && (
                            <Button variant="ghost" mr={2} onClick={() => logoutUser()}>
                                Log Out
                            </Button>
                        )}
                        <Avatar size="sm" src={user?.photoURL} />
                    </Flex>
                </Flex>
            </Flex>
            <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
                {children}
            </Flex>
        </Box>
    );
};

export default DashboardShell;
