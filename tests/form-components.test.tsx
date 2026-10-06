import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { GlassTextarea } from '../packages/ui/src/components/prism/textarea';
import { GlassRadioGroup } from '../packages/ui/src/components/prism/radio-group';
const options = [
  { value: 'balanced', label: 'Balanced', description: 'Smaller downloads.' },
  { value: 'studio', label: 'Studio', disabled: true },
  { value: 'lossless', label: 'Lossless' },
];
describe('Prism text and single-choice fields', () => {
  it('connects textarea labels, external descriptions, and validation', () => {
    render(
      <>
        <p id="policy">Keep notes private.</p>
        <GlassTextarea
          label="Notes"
          hint="Optional."
          error="Add notes."
          aria-describedby="policy"
        />
      </>,
    );
    const field = screen.getByRole('textbox', { name: 'Notes' });
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveAccessibleDescription('Keep notes private. Add notes.');
    expect(screen.queryByText('Optional.')).not.toBeInTheDocument();
  });
  it('supports textarea typing and prevents disabled edits', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<GlassTextarea label="Notes" />);
    await user.type(screen.getByRole('textbox'), 'Quiet evening');
    expect(screen.getByRole('textbox')).toHaveValue('Quiet evening');
    rerender(<GlassTextarea label="Notes" disabled />);
    await user.type(screen.getByRole('textbox'), 'More');
    expect(screen.getByRole('textbox')).toHaveValue('Quiet evening');
  });
  it('names the group and describes choices and errors', () => {
    render(
      <GlassRadioGroup
        label="Quality"
        options={options}
        error="Choose one quality."
      />,
    );
    expect(
      screen.getByRole('radiogroup', { name: 'Quality' }),
    ).toHaveAccessibleDescription('Choose one quality.');
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(
      screen.getByRole('radio', { name: 'Balanced' }),
    ).toHaveAccessibleDescription('Smaller downloads.');
  });
  it('selects by label and moves with arrow keys past disabled choices', async () => {
    const user = userEvent.setup();
    render(
      <GlassRadioGroup
        label="Quality"
        options={options}
        defaultValue="balanced"
      />,
    );
    const balanced = screen.getByRole('radio', { name: 'Balanced' });
    balanced.focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'Lossless' })).toBeChecked();
    await user.click(screen.getByText('Balanced'));
    expect(balanced).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Studio' })).not.toBeChecked();
  });
  it('keeps controlled selection owned by the caller and blocks a disabled group', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <GlassRadioGroup
        label="Quality"
        options={options}
        value="balanced"
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole('radio', { name: 'Lossless' }));
    expect(onValueChange).toHaveBeenCalledWith('lossless', expect.anything());
    expect(screen.getByRole('radio', { name: 'Balanced' })).toBeChecked();
    onValueChange.mockClear();
    rerender(
      <GlassRadioGroup
        label="Quality"
        options={options}
        value="balanced"
        onValueChange={onValueChange}
        disabled
      />,
    );
    await user.click(screen.getByRole('radio', { name: 'Lossless' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
