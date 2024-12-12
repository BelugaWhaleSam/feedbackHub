import React from 'react';
import {Table, Tr, Th} from './Table';
import FeedbackRow from './FeedbackRow';
import {Box} from '@chakra-ui/react';

const FeedbackTable = ({allFeedback}) => {
    return (
        <Box overflowX="scroll">
            <Table w="full">
                <thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Feedback</Th>
                        <Th>Route</Th>
                        <Th>Visible</Th>
                        <Th width="50px">{''}</Th>
                    </Tr>
                </thead>
                <tbody>
                    {allFeedback.map((feedback) => (
                        <FeedbackRow key={feedback.id} {...feedback} />
                    ))}
                </tbody>
            </Table>
        </Box>
    );
};

export default FeedbackTable;
