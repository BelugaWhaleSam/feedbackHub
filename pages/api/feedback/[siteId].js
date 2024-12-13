import {getAllFeedback, getSite} from '@/lib/db-admin';

export default async (req, res) => {
    // req is the request object
    // req is an object that contains information about the incoming request
    // it comes from the client
    const siteId = req.query.siteId;
    const {feedback, error} = await getAllFeedback(siteId);
    const {site} = await getSite(siteId);

    if (error) {
        res.status(500).json({error});
    }
    res.status(200).json({feedback,site});
};
