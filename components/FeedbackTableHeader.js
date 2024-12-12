import React from 'react';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, Box} from '@chakra-ui/react';

const FeedbackTableHeader = ({siteName}) => (
    <Box mx={4}>
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink>Feedback</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between">
            <Heading mb={8}>My Feedback</Heading>
        </Flex>
    </Box>
);

export default FeedbackTableHeader;
