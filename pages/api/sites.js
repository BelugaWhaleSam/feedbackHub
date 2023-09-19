import {getUserSites} from '@/lib/db-admin';
import {auth} from '@/lib/firebase-admin';

export default async (req, res) => {
    try {
        // we want user, userId object and through that we need user id
        const {uid} = await auth.verifyIdToken(req.headers.token);
        const {sites} = await getUserSites(uid);
        // we are returning the sites array as a json object
        // therefore sites: wont be needed in the dashboard.js
        // since we have destructured the sites array
        // we access it using data.sites
        res.status(200).json({sites});
    } catch (error) {
        res.status(500).json({error});
    }
};
