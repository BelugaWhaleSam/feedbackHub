import {collection, doc, setDoc} from 'firebase/firestore';
import {db} from './firebase';

export async function createUser(uid, data) {
    return await setDoc(doc(db, 'users', uid), {uid, ...data}, {merge: true});
}

export async function createSite(data) {
    const siteRef = doc(collection(db, "sites"));
    return await setDoc(siteRef, data);

    // return await setDoc(doc(db, 'sites'), {data}, {merge: true});
}

export async function createFeedback(data) {
    const feedbackRef = doc(collection(db, "feedback"));
    return await setDoc(feedbackRef, data);

    // return await setDoc(doc(db, 'sites'), {data}, {merge: true});
}