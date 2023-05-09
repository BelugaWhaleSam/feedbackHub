import {theme as chakraTheme} from '@chakra-ui/react';
import {createIcon} from '@chakra-ui/icons';

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

export const logo = createIcon({
    displayName: 'logo',
    viewBox: '0 0 24 24',
    d: 'M5,3.5 L5,20.5 L10,20.5 L10,14.5 L17,14.5 L17,11.5 L10,11.5 L10,8.5 L18,8.5 L18,3.5 L5,3.5 Z',
});

export default theme;
