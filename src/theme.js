import { defaultTheme } from 'evergreen-ui';

console.log('defaultTheme is', defaultTheme);

export default {
  ...defaultTheme,
  fontFamilies: {
    display: 'Apercu',
    ui: 'Apercu',
    mono: 'Apercu',
  },
  components: {
    ...defaultTheme.components,
    Button: {
      ...defaultTheme.components.Button,
      appearances: {
        ...defaultTheme.components.Button.appearances,
        primary: {
          ...defaultTheme.components.Button.appearances.primary,
          backgroundColor: '#000000',
          color: '#FFFFFF',
          _hover: {
            backgroundColor: '#2e2e2e',
          },
        },
      },
    },
  },
};
