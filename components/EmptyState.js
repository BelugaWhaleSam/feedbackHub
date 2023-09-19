import React from 'react';
import {Flex, Heading, Text} from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

const EmptyState = () => (
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
            You haven&#39;t added any sites.
        </Heading>
        <Text mb={4}>Let&#39;s get started.</Text>
        <AddSiteModal>
            Add Your First Site
        </AddSiteModal>
    </Flex>
);

export default EmptyState;
