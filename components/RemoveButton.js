import React, {useRef} from 'react';
import {useUserContext} from '@/lib/auth';
import {mutate} from 'swr';
import {deleteFeedback} from '@/lib/db';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react';
import {DeleteIcon} from '@chakra-ui/icons';

const RemoveButton = ({feedbackId}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = useRef();
    const {user} = useUserContext();

    const onDelete = () => {
        // console.log(feedbackId);
        deleteFeedback(feedbackId);
        mutate(
            ['/api/feedback', user.accessToken],
            async (data) => {
                // Added data: to the newSite object to match the
                // data structure of the sites array when mapping over it
                // in the siteTable component
                // below data.feedback is filtered to remove the feedback that was deleted
                // data.feedback.filter((feedback) => feedback.id === feedbackId);

                return {feedback: data.feedback.filter((feedback) => feedback.id !== feedbackId)};
            },
            false
        );
        onClose();
    };

    return (
        <>
            <IconButton aria-label="Delete Feedback" icon={<DeleteIcon />} variant="ghost" onClick={onOpen} />

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Feedback
                        </AlertDialogHeader>
                        <AlertDialogBody>Are you sure? You cannot undo this action afterwards.</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default RemoveButton;
