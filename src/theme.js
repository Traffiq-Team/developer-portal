import { defaultTheme } from 'evergreen-ui';

console.log('defaultTheme is', defaultTheme);

export default {
  ...defaultTheme,
  fontFamilies: {
    ...defaultTheme.fontFamilies,
    display: 'Apercu',
    ui: 'Apercu',
  },
};
