import {createContext, useContext, useState} from 'react';
import {onAuthStateChanged, signOut, signInWithPopup, GithubAuthProvider} from 'firebase/auth';
import {auth} from './firebase';
import {createUser} from './db';

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
            const user = formatUser(rawUser);
            createUser(user.uid, user);
            setUser(user);
            return user;
        } else {
            setUser(false);
            return false;
        }
    };

    const signInWithGithub = () => {
        signInWithPopup(auth, new GithubAuthProvider()).then((res) => handleUser(res.user));
    };

    const logoutUser = () => {
        signOut(auth).then(() => handleUser(false));
    };

    const contextValue = {
        user,
        logoutUser,
        signInWithGithub,
    };
    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    };
};
