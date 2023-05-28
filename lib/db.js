import {doc, setDoc} from 'firebase/firestore';
import {db} from './firebase';

export async function createUser(uid, data) {
    return await setDoc(doc(db, 'users', uid), {uid, ...data}, {merge: true});
}

export async function createSite(data) {
    return await setDoc(doc(db, 'sites', data.name), {data}, {merge: true});
}