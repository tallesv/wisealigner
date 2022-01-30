import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
  colors: {
    gray: {
      '550': '#31343d',
    },
    blue: {
      '850': '#1a1d29',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'blue.850',
        color: 'gray.200',
      },
    },
  },
});
