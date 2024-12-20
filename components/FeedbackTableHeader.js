import React from 'react';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, Box} from '@chakra-ui/react';
import NextLink from 'next/link';
import Link from 'next/link';

const FeedbackTableHeader = ({siteName}) => (
    <Box mx={4}>
        <Breadcrumb>
            <BreadcrumbItem>
                <Link as={NextLink} href="/feedback" color="blue.500" fontWeight="bold">
                      Feedback
                </Link>
            </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between">
            <Heading mb={8}>All Feedback</Heading>
        </Flex>
    </Box>
);

export default FeedbackTableHeader;
