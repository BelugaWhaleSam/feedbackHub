import {useRef} from 'react';
import {useForm} from 'react-hook-form';
import {createSite} from '@/lib/db';
import {useUserContext} from '@/lib/auth';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    Button,
    useToast,
} from '@chakra-ui/react';

const AddSiteModal = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const initialRef = useRef(null);
    const {user} = useUserContext();
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onCreateSite = ({site,url}) => {      
        createSite({
            authorId: user.uid,
            createdAt: new Date().toISOString(),
            site,
            url
        })
        toast({
            title: "Success",
            description: "We've added your site.",
            status: "success",
            duration: 5000,
            isClosable: true,
        })
        onClose();
    };

    return (
        <>
            <Button fontWeight="medium" maxW="200px" onClick={onOpen}>
                Add Your First Site
            </Button>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
                    <ModalHeader fontWeight="bold">Add Site</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="My site" {...register('site', {required: true})} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Link</FormLabel>
                            <Input placeholder="https://website.com" {...register('url', {required: true})} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>
                            Cancel
                        </Button>
                        <Button backgroundColor="#99FFFE" color="#194D4C" fontWeight="medium" type="submit">
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddSiteModal;
