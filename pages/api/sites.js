import db from '@/lib/firebase-admin';

export default async (_, res) => {

    const snapshot = await db.collection("sites").get();
    const sites = [];

    snapshot.forEach((doc) => {
        sites.push({ id: doc.id, ...doc.data() });
    });

    // we are returning the sites array as a json object
    // therefore sites: wont be needed in the dashboard.js
    // since we have destructured the sites array
    // we access it using data.sites
    res.status(200).json({sites});
};
