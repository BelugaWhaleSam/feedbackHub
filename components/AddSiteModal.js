import {useRef} from 'react';
import {useForm} from 'react-hook-form';
import {createSite} from '@/lib/db';
import {useUserContext} from '@/lib/auth';
import {mutate} from 'swr';

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

const AddSiteModal = ({children}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const initialRef = useRef(null);
    const {user} = useUserContext();
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onCreateSite = ({name, url}) => {
        const newSite = {
            name,
            authorId: user.uid,
            url,
            createdAt: new Date().toISOString(),
        };
        createSite(newSite);
        toast({
            title: 'Success',
            description: "We've added your site.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        });

        mutate(
            ['/api/sites', user.accessToken],
            async (data) => {
                // console.log("data",data);
                // Added data: to the newSite object to match the
                // data structure of the sites array when mapping over it
                // in the siteTable component
                return {sites: [newSite, ...data.sites]};
            },
            false
        );

        onClose();
    };

    return (
        <>
            <Button
                onClick={onOpen}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                _hover={{bg: 'gray.700'}}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)',
                }}
            >
                {children}
            </Button>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
                    <ModalHeader fontWeight="bold">Add Site</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="My site" {...register('name', {required: true})} />
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
