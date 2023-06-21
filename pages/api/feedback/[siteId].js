import {getAllFeedback} from '@/lib/db-admin';

export default async (req, res) => {
    // req is the request object
    // req is an object that contains information about the incoming request
    // it comes from the client
    const siteId = req.query.siteId;
    const feedback = await getAllFeedback(siteId);

    res.status(200).json({feedback});
};
