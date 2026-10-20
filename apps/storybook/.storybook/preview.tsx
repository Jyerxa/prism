import type { Preview } from '@storybook/react-vite';
import { create } from 'storybook/theming';
import './preview.css';

const docsDark = create({
  base: 'dark',
  colorPrimary: '#74d1c4',
  colorSecondary: '#74d1c4',
  appBg: '#0b1018',
  appContentBg: '#101a28',
  textColor: '#e7eff8',
});

const docsLight = create({
  base: 'light',
  colorPrimary: '#1f6b5f',
  colorSecondary: '#1f6b5f',
  appBg: '#f4efe6',
  appContentBg: '#fffaf2',
  textColor: '#1c232e',
});

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Prism color theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark · Obsidian', icon: 'moon' },
          { value: 'light', title: 'Light · Gallery', icon: 'photo' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
    backgrounds: { value: 'ink' },
  },
  parameters: {
    docs: {
      theme: docsDark,
    },
    layout: 'centered',
    backgrounds: {
      options: {
        ink: { name: 'Ink', value: '#0b1018' },
        ocean: { name: 'Ocean', value: '#173348' },
        parchment: { name: 'Parchment', value: '#f4efe6' },
        gallery: { name: 'Gallery raised', value: '#fffaf2' },
      },
    },
    controls: { expanded: true },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: [
          'Prism',
          [
            'Themes',
            'Button',
            'Card',
            'Badge',
            'Input',
            'Switch',
            'Checkbox',
            'Slider',
            'Tabs',
            'Select',
            'Dialog',
            'Tooltip',
            'Textarea',
            'RadioGroup',
            'Accordion',
          ],
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as 'dark' | 'light') || 'dark';
      const isLight = theme === 'light';
      if (context.parameters.docs) {
        context.parameters.docs.theme = isLight ? docsLight : docsDark;
      }
      return (
        <div
          className={theme}
          data-theme={theme}
          style={{
            width: 'min(420px, calc(100vw - 48px))',
            padding: 24,
            borderRadius: 24,
            background: isLight
              ? 'radial-gradient(ellipse at 0% 0%, #c4b8a033, transparent), #f4efe6'
              : 'radial-gradient(ellipse at 0% 0%, #56749442, transparent), #132031',
            color: isLight ? '#1c232e' : '#f2f5fa',
            fontFamily: 'var(--font-sans)',
            colorScheme: theme,
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};
export default preview;
