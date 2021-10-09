import { defaultTheme } from 'evergreen-ui';

console.log('defaultTheme is', defaultTheme);

export default {
  ...defaultTheme,
  fontFamilies: {
    display: 'Apercu',
    ui: 'Apercu',
    mono: 'Apercu',
  },
};
