import React from 'react';
import {Box, Link} from '@chakra-ui/react';
import {Table, Tr, Th, Td} from './Table';
import {format, parseISO} from 'date-fns';
import NextLink from 'next/link';

const SiteTable = ({sites}) => {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Site Link</Th>
                    <Th>Feedback Link</Th>
                    <Th>Date Added</Th>
                    <Th>{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {sites.map((site) => (
                    <Box as="tr" key={site.url}>
                        <Td>{site.name}</Td>
                        <Td>{site.url}</Td>
                        <Td>
                            <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
                                <Link>View Feedback</Link>
                            </NextLink>
                        </Td>
                        <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
                    </Box>
                ))}
            </tbody>
        </Table>
    );
};

export default SiteTable;
