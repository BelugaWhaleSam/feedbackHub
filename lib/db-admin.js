import {collection, query, where, getDocs, doc} from 'firebase/firestore';
import {db} from './firebase';
import {compareDesc, parseISO} from 'date-fns';

export async function getAllFeedback(siteId) {
    try {
        const q = query(collection(db, 'feedback'), where('siteId', '==', siteId));
        const snapshot = await getDocs(q);

        const feedback = [];

        snapshot.forEach((doc) => {
            feedback.push({id: doc.id, ...doc.data()});
        });

        // sorted feedbacks based on newest to oldest
        feedback.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)));

        return {feedback};
    } catch (error) {
        return {error};
    }
}

export async function getAllSites(siteId) {
    try {
        const snapshot = await getDocs(collection(db, 'sites'));
        const sites = [];

        snapshot.forEach((doc) => {
            sites.push({id: doc.id, ...doc.data()});
        });

        return {sites};
    } catch (error) {
        return {error};
    }
}

export async function getUserSites(userId) {
    const q = query(collection(db, 'sites'), where('authorId', '==', userId));
    const snapshot = await getDocs(q);
    const sites = [];

    snapshot.forEach((doc) => {
        sites.push({id: doc.id, ...doc.data()});
    });

    return {sites};
}

export async function getUserFeedback(uid) {
    const q = query(collection(db, 'feedback'), where('authorId', '==', uid));
    const snapshot = await getDocs(q);
    const feedback = [];

    snapshot.forEach((doc) => {
        feedback.push({id: doc.id, ...doc.data()});
    });

    return {feedback};
}
