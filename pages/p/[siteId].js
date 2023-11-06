import {useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {useUserContext} from '@/lib/auth';
import {createFeedback} from '@/lib/db';
import {getAllFeedback, getAllSites} from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import {Box, FormControl, FormLabel, Input, Button} from '@chakra-ui/react';

// used to fetch data for specific ID
// Then pass the fetched data as props to page component
export async function getStaticProps(context) {
    // context is an object that contains information about the incoming request
    // that comes from the dynamic route

    const siteId = context.params.siteId;
    const {feedback} = await getAllFeedback(siteId);

    return {
        props: {
            initalFeedback: feedback,
        }, // will be passed to the page component as props
        revalidate: 1,
    };
}

// generate dynamic paths based on IDs
// We are connecting sites to their corresponding feedback pages
export async function getStaticPaths() {
    const {sites} = await getAllSites();
    const paths = sites.map((site) => ({params: {siteId: site.id.toString()}}));
    return {
        paths,
        fallback: true, // See the "fallback" section below
    };
}

const SiteFeedback = ({initalFeedback}) => {
    const {user} = useUserContext();
    const router = useRouter();
    const inputEL = useRef(null);
    const [allfeedback, setAllFeedback] = useState(initalFeedback);

    const onSubmit = (e) => {
        e.preventDefault();
        
        const newFeedback = {
            author: user.displayName,
            authorId: user.uid,
            siteId: router.query.siteId, // Use to fetch the id for the dynamic page
            text: inputEL.current.value,
            createdAt: new Date().toISOString(), 
            provider: user.providerData[0].providerId,
            status: 'pending',
        }

        inputEL.current.value = '';
        setAllFeedback([newFeedback, ...allfeedback]);
        createFeedback(newFeedback);
    };
    return (
        <Box as='form' onSubmit={onSubmit} display="flex" flexDirection="column" width="full" maxWidth="700px" margin="0 auto">
            <FormControl my={8}>
                <FormLabel>Comment</FormLabel>
                <Input ref={inputEL} type="comment" />
                <Button mt={2} type="submit" fontWeight="medium">Add comments</Button>
            </FormControl>
            {allfeedback && allfeedback.map((feedback) => (
                <Feedback key={feedback.id} {...feedback} />
            ))}
        </Box>
    );
};

export default SiteFeedback;
