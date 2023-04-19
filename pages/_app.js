import {UserContextProvider} from '../lib/auth';

export default function App({Component, pageProps}) {
    return (
        <UserContextProvider>
            <Component {...pageProps} />
        </UserContextProvider>
    );
}
