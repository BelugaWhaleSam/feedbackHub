import {createContext, useContext, useState} from 'react';
import {onAuthStateChanged, signOut, signInWithPopup, GithubAuthProvider, GoogleAuthProvider} from 'firebase/auth';
import {auth} from './firebase';
import {createUser} from './db';
import Cookies from 'js-cookie';
import Router from 'next/router';

// This is the context object that will be provided to any
// child component that calls useUserContext
// It contains the objects to be used like signin signout etc.
export const UserContext = createContext({});

// This is a custom hook that we can use to access the user object
// from any component that is a child of the UserContextProvider
// useUserContext is used in index.js to access the context value objects
export const useUserContext = () => {
    return useContext(UserContext);
};

// This is a custom hook that we can use to wrap our app
// and make the user object available to any child component.
// UserContextProvider is used in _app to wrap the app
export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useState(() => {
        const unsubscribe = onAuthStateChanged(auth, (res) => {
            if (res) {
                setUser(res);
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    const handleUser = (rawUser) => {
        if (rawUser) {
            // console.log(rawUser);
            const user = formatUser(rawUser);
            console.log(user);
            // console.log(user);
            // What this does is it takes the user object and removes the token property from it
            // and stores it in a separate variable called token, therefore token has only the token from user
            // and then it stores the rest of the user object in a variable called userWithoutToken
            const {token, ...userWithoutToken} = user;
            createUser(user.uid, userWithoutToken);
            setUser(user);
            Cookies.set('feedback-hub-auth', true, {
                expires: 1, // 1 day
            });
            return user;
        } else {
            Cookies.remove('feedback-hub-auth');
            setUser(false);
            Router.push('/');
            return false;
        }
    };

    const signInWithGithub = async () => {
        try {
            const res = await signInWithPopup(auth, new GithubAuthProvider());
            return handleUser(res.user);
        } catch (error) {
            if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
                console.log('Sign-in cancelled by user');
                return;
            }
            console.error('Error signing in with Github:', error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, new GoogleAuthProvider());
            return handleUser(res.user);
        } catch (error) {
            if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
                console.log('Sign-in cancelled by user');
                return;
            }
            console.error('Error signing in with Google:', error);
        }
    };

    const logoutUser = () => {
        signOut(auth).then(() => handleUser(false));
    };

    const contextValue = {
        user,
        logoutUser,
        signInWithGoogle,
        signInWithGithub,
    };
    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        token: user.accessToken, // If we console log the user data we can see that the token is stored in the ya property for JWT
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    };
};
