import Feedback from '@/components/Feedback';
import {getAllFeedback, getAllSites} from '@/lib/db-admin';
import {Box, FormControl, FormLabel, Input, Button} from '@chakra-ui/react';

// used to fetch data for specific ID
// Then pass the fetched data as props to page component
export async function getStaticProps(context) {
    // context is an object that contains information about the incoming request
    // that comes from the dynamic route

    const siteId = context.params.siteId;
    const feedback = await getAllFeedback(siteId);

    return {
        props: {
            initalFeedback: feedback,
        }, // will be passed to the page component as props
    };
}

// generate dynamic paths based on IDs
export async function getStaticPaths() {
    const sites = await getAllSites();
    const paths = sites.map((site) => ({params: {siteId: site.id.toString()}}));
    return {
        paths,
        fallback: false, // See the "fallback" section below
    };
}

const SiteFeedback = ({initalFeedback}) => {
    return (
        <Box display="flex" flexDirection="column" width="full" maxWidth="700px" margin="0 auto">
            <FormControl my={8}>
                <FormLabel>Comment</FormLabel>
                <Input type="comment" />
                <Button mt={2} type="submit" fontWeight="medium">Add comments</Button>
            </FormControl>
            {initalFeedback.map((feedback) => (
                <Feedback key={feedback.id} {...feedback} />
            ))}
        </Box>
    );
};

export default SiteFeedback;
