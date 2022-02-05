import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
  colors: {
    gray: {
      '550': '#31343d',
    },
    blue: {
      '450': '#3c4257',
    },
    purple: {
      '550': '#635cff',
    },
  },
  fonts: {
    heading: 'Nunito',
    body: 'Nunito',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.200',
        color: 'blue.450',
        fontWeight: '600',
      },
    },
  },
});
