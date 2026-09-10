import type { Preview } from '@storybook/react-vite';
import { create } from 'storybook/theming';
import './preview.css';
const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      theme: create({
        base: 'dark',
        colorPrimary: '#74d1c4',
        colorSecondary: '#74d1c4',
        appBg: '#0b1018',
        appContentBg: '#101a28',
        textColor: '#e7eff8',
      }),
    },
    layout: 'centered',
    backgrounds: {
      options: {
        ink: { name: 'Ink', value: '#0b1018' },
        ocean: { name: 'Ocean', value: '#173348' },
      },
    },
    controls: { expanded: true },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: [
          'Prism',
          [
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
          ],
        ],
      },
    },
  },
  initialGlobals: { backgrounds: { value: 'ink' } },
  decorators: [
    (Story) => (
      <div
        className="dark"
        style={{
          width: 'min(420px, calc(100vw - 48px))',
          padding: 24,
          borderRadius: 24,
          background:
            'radial-gradient(ellipse at 0% 0%, #56749442, transparent), #132031',
          color: '#f2f5fa',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default preview;
