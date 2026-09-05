import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  GlassButton,
  GlassInput,
  GlassSwitch,
  GlassCheckbox,
  GlassSlider,
  GlassTabs,
  GlassSelect,
  GlassDialog,
} from '@/components/prism';
import { componentGuides } from '@/lib/component-guidance';

describe('Prism component contracts', () => {
  it('activates a named button by keyboard and respects disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <GlassButton onClick={onClick}>Save</GlassButton>,
    );
    await user.tab();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(
      <GlassButton disabled onClick={onClick}>
        Save
      </GlassButton>,
    );
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('connects an input label and validation error to the field', () => {
    render(
      <GlassInput
        label="Email"
        type="email"
        error="Enter a valid email address."
      />,
    );
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Enter a valid email address.');
  });
  it('gives repeated input instances unique labels', () => {
    render(
      <>
        <GlassInput label="First" />
        <GlassInput label="Second" />
      </>,
    );
    expect(screen.getByLabelText('First').id).not.toBe(
      screen.getByLabelText('Second').id,
    );
  });
  it('applies switches immediately by label and keyboard', async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(
      <GlassSwitch label="Spatial audio" onCheckedChange={onCheckedChange} />,
    );
    const control = screen.getByRole('switch', { name: 'Spatial audio' });
    await user.click(screen.getByText('Spatial audio'));
    expect(control).toBeChecked();
    await user.keyboard(' ');
    expect(control).not.toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledTimes(2);
  });
  it('makes the checkbox label clickable', async () => {
    render(<GlassCheckbox label="Include in mix" />);
    await userEvent.click(screen.getByText('Include in mix'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
  it('exposes the slider name and value with units and handles input', async () => {
    const onValueChange = vi.fn();
    render(
      <GlassSlider
        label="Blur"
        defaultValue={24}
        min={0}
        max={40}
        unit="px"
        onValueChange={onValueChange}
      />,
    );
    const slider = await screen.findByRole('slider', { name: 'Blur' });
    expect(slider).toHaveAttribute('aria-valuetext', '24px');
    fireEvent.change(slider, { target: { value: '30' } });
    expect(onValueChange).toHaveBeenCalledWith(30);
    expect(slider).toHaveAttribute('aria-valuetext', '30px');
  });
  it('keeps a controlled slider value owned by the caller', async () => {
    const onValueChange = vi.fn();
    render(
      <GlassSlider label="Volume" value={50} onValueChange={onValueChange} />,
    );
    const slider = await screen.findByRole('slider', { name: 'Volume' });
    fireEvent.change(slider, { target: { value: '70' } });
    expect(onValueChange).toHaveBeenCalledWith(70);
    expect(slider).toHaveValue('50');
  });
  it('switches related panels and supports arrow keys', async () => {
    const user = userEvent.setup();
    render(
      <GlassTabs
        label="Mood"
        items={[
          { value: 'focus', label: 'Focus', content: 'Focus sounds' },
          { value: 'relax', label: 'Relax', content: 'Relax sounds' },
        ]}
      />,
    );
    const first = screen.getByRole('tab', { name: 'Focus' });
    first.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Relax' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Relax sounds');
  });
  it('names a select and renders the selected human label', () => {
    render(
      <GlassSelect
        label="Sound environment"
        defaultValue="coast"
        options={[{ value: 'coast', label: 'Coastal dusk' }]}
      />,
    );
    expect(
      screen.getByRole('combobox', { name: 'Sound environment' }),
    ).toHaveTextContent('Coastal dusk');
  });
  it('opens a named dialog and returns focus after Escape', async () => {
    const user = userEvent.setup();
    render(
      <GlassDialog
        trigger={<GlassButton>New collection</GlassButton>}
        title="Create a collection"
        description="Give it a name."
      >
        <GlassInput label="Name" />
      </GlassDialog>,
    );
    const trigger = screen.getByRole('button', { name: 'New collection' });
    await user.click(trigger);
    expect(
      await screen.findByRole('dialog', { name: 'Create a collection' }),
    ).toHaveAccessibleDescription('Give it a name.');
    await user.keyboard('{Escape}');
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
  });
  it('ships actionable guidance and an example for every public component', () => {
    expect(componentGuides).toHaveLength(11);
    for (const guide of componentGuides) {
      expect(guide.rules.length).toBeGreaterThanOrEqual(3);
      expect(guide.avoid.length).toBeGreaterThan(20);
      expect(guide.code).toContain('<Glass');
    }
    expect(new Set(componentGuides.map((g) => g.id)).size).toBe(11);
  });
});
