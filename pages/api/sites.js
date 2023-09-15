import { getAllSites } from '@/lib/db-admin';

export default async (_, res) => {

    const {sites,error} = await getAllSites();

    // we are returning the sites array as a json object
    // therefore sites: wont be needed in the dashboard.js
    // since we have destructured the sites array
    // we access it using data.sites
    if (error) {
        res.status(500).json({error});
    }
    res.status(200).json({sites});
};
