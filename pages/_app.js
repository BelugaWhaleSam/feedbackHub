import {UserContextProvider} from '@/lib/auth';
import customTheme from '@/styles/theme';
import {CSSReset} from '@chakra-ui/react';
import {ThemeProvider} from '@chakra-ui/react';
import {Global, css} from '@emotion/react';
import Head from 'next/head';

// Global styles are applied to the entire app
// This global style is used to set the min-width of the app
// to 360px and to enable smooth scrolling
// The CSSReset component is used to reset the default browser styles
// #__next is the div that wraps the entire app
// This div is set to flex and column to make the app take up the entire viewport
const GlobalStyle = ({children}) => {
    return (
        <>
            <Head>
                <meta content="width=device-width, initial-scale=1" name="viewport" />
            </Head>
            <CSSReset />
            <Global
                styles={css`
                    html {
                        scroll-behavior: smooth;
                        min-width: 360px;
                        background-color: #edf2f7;
                    }

                    #__next {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                    }
                `}
            />
            {children}
        </>
    );
};

export default function App({Component, pageProps}) {
    return (
        <ThemeProvider theme={customTheme}>
            <UserContextProvider>
                <GlobalStyle />
                <Component {...pageProps} />
            </UserContextProvider>
        </ThemeProvider>
    );
}
