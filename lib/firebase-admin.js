import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
            private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
            project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        }),
        databaseURL: 'https://fast-feedback-18fe8.firebaseio.com',
    });
}

const auth = admin.auth();
const db = admin.firestore();
export {auth,db};