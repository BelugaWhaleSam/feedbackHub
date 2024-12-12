import React, {useState} from 'react';
import {Box, Code, Switch} from '@chakra-ui/react';
import {Td} from './Table';
import RemoveButton from './RemoveButton';
import { updateFeedback } from '@/lib/db';
import { mutate } from 'swr';
import { useUserContext } from '@/lib/auth';

const FeedbackRow = ({id, author, text, route, status}) => {
    const {user} = useUserContext();
    const [checked, setChecked] = useState(status === 'active');
    const toggleFeedback = async () => {
        // setChecked(!checked);
        await updateFeedback(id, {status: !checked ? 'active' : 'pending'});
        mutate(['/api/feedback', user.accessToken]);
    };
    return (
        <Box as="tr" key={id}>
            <Td fontWeight="medium">{author}</Td>
            <Td>{text}</Td>
            <Td>
                <Code>{route || '/'}</Code>
            </Td>
            <Td>
                <Switch variantColor="green" onChange={toggleFeedback} isChecked={status === 'active'} />
            </Td>
            <Td>
                <RemoveButton feedbackId={id} />
            </Td>
        </Box>
    );
};

export default FeedbackRow;
