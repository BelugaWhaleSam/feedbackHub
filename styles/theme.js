import {theme as chakraTheme} from '@chakra-ui/react';

const theme = {
    ...chakraTheme,
    fonts: {
        ...chakraTheme.fonts,
        body: 'Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    },
    fontWeights: {
        normal: 200,
        medium: 300,
        bold: 400,
    },
};

export default theme;
