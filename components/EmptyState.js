import React from 'react';
import {Flex, Heading, Button, Text} from '@chakra-ui/react';
import DashboardShell from './DashboardShell';

const EmptyState = () => (
    <DashboardShell>
        <Flex
            width="100%"
            backgroundColor="white"
            borderRadius="8px"
            p={16}
            justify="center"
            align="center"
            direction="column"
        >
            <Heading size="lg" mb={2}>
                You haven&#39t added any sites.
            </Heading>
            <Text mb={4}>Let&#39s get started.</Text>
            <Button fontWeight="medium" maxW="200px">
                Add Your First Site
            </Button>
        </Flex>
    </DashboardShell>
);

export default EmptyState;
