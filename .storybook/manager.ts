import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Prism · Component workshop',
    colorPrimary: '#d3f99a',
    colorSecondary: '#d3f99a',
    appBg: '#0b1018',
    appContentBg: '#101a28',
    textColor: '#e7eff8',
    barBg: '#152131',
    barSelectedColor: '#d3f99a',
  }),
});
