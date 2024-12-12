import {collection, doc, setDoc, deleteDoc, updateDoc} from 'firebase/firestore';
import {db} from './firebase';

export async function createUser(uid, data) {
    return await setDoc(doc(db, 'users', uid), {uid, ...data}, {merge: true});
}

export async function createSite(data) {
    const siteRef = doc(collection(db, 'sites'));
    await setDoc(siteRef, data);
    return siteRef.id;

    // return await setDoc(doc(db, 'sites'), {data}, {merge: true});
}

export async function createFeedback(data) {
    const feedbackRef = doc(collection(db, 'feedback'));
    return await setDoc(feedbackRef, data);

    // return await setDoc(doc(db, 'sites'), {data}, {merge: true});
}

export async function deleteFeedback(id) {
    const feedbackRef = doc(db, 'feedback', id);
        await updateDoc(feedbackRef, {status: 'removed'});
}

export async function updateFeedback(id, newValues) {
    try {
        const feedbackRef = doc(db, 'feedback', id);
        await updateDoc(feedbackRef, newValues);
    } catch (error) {
        console.error('Error updating feedback:', error);
        throw error;
    }
}
