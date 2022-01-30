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
    heading: 'Nunito',
    body: 'Nunito',
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
