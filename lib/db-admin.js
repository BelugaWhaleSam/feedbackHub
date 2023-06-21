import {collection, query, where, getDocs, doc} from 'firebase/firestore';
import {db} from './firebase';

export async function getAllFeedback(siteId) {
    const q = query(collection(db, 'feedback'), where('siteId', '==', siteId));
    const snapshot = await getDocs(q);

    const feedback = [];

    snapshot.forEach((doc) => {
        feedback.push({id: doc.id, ...doc.data()});
    });

    return feedback;
}

export async function getAllSites(siteId) {
    const snapshot = await getDocs(collection(db, "sites"));
    const sites = [];

    snapshot.forEach((doc) => {
        sites.push({id: doc.id, ...doc.data()});
    });

    return sites;
}
