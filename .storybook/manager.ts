import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Prism · Component workshop',
    colorPrimary: '#74d1c4',
    colorSecondary: '#74d1c4',
    appBg: '#0b1018',
    appContentBg: '#101a28',
    textColor: '#e7eff8',
    barBg: '#152131',
    barSelectedColor: '#74d1c4',
  }),
});
