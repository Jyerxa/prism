import { storybookDocsUrl, storybookUrl } from '../lib/storybook-url';
import { useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Copy,
  Heart,
  Plus,
  Layers3,
  SlidersHorizontal,
  Code2,
  Sparkles,
  MoveUpRight,
  CircleHelp,
  AudioLines,
} from 'lucide-react';
import {
  GlassButton,
  GlassCard,
  GlassBadge,
  GlassSwitch,
  GlassSlider,
  GlassTabs,
  GlassInput,
  GlassSelect,
  GlassCheckbox,
  GlassDialog,
  GlassTooltip,
} from '@prism/ui';
import { guideFor, componentGuides } from '@prism/ui/guidance';
import { SiteShell } from './site-shell';

function CopyCode({ code }: { code: string }) {
  const [status, setStatus] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('Copied');
    } catch {
      setStatus('Select the code to copy');
    }
  }
  return (
    <div className="code-block">
      <div className="code-header">
        <span>React / TSX</span>
        <GlassButton tone="quiet" onClick={copy}>
          <Copy size={14} />
          {status || 'Copy'}
        </GlassButton>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
      <output className="sr-only">{status}</output>
    </div>
  );
}
function UsageDialog({ id }: { id: string }) {
  const guide = guideFor(id);
  return (
    <GlassDialog
      trigger={
        <GlassButton
          tone="quiet"
          className="usage-button"
          aria-label={`View ${guide.name} usage rules`}
        >
          <Code2 size={15} />
          <span>Usage</span>
          <ArrowUpRight size={13} />
        </GlassButton>
      }
      title={guide.name}
      description={guide.summary}
    >
      <div className="usage-rules">
        <span className="eyebrow">Use with intention</span>
        {guide.rules.map((rule) => (
          <p key={rule}>
            <Check size={15} />
            {rule}
          </p>
        ))}
      </div>
      <div className="avoid-note">
        <span>Avoid</span>
        <p>{guide.avoid}</p>
      </div>
      <CopyCode code={guide.code} />
      {storybookUrl && (
        <a
          className="text-link"
          href={storybookDocsUrl(id)}
          target="_blank"
          rel="noreferrer"
        >
          Explore states in Storybook <ArrowUpRight size={16} />
        </a>
      )}
    </GlassDialog>
  );
}
function Specimen({
  id,
  children,
  className = '',
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const g = guideFor(id);
  return (
    <article className={`specimen ${className}`}>
      <div className="specimen-stage">{children}</div>
      <div className="specimen-caption">
        <div>
          <h2>{g.name}</h2>
          <span>{g.category}</span>
        </div>
        <UsageDialog id={id} />
      </div>
    </article>
  );
}
function ButtonSample() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="button-samples">
      <GlassButton tone="primary" onClick={() => setSaved(!saved)}>
        {saved ? <Check /> : <Plus />}
        {saved ? 'Collection saved' : 'Create something'}
      </GlassButton>
      <div className="inline-controls">
        <GlassButton onClick={() => setSaved(!saved)} aria-pressed={saved}>
          <Heart fill={saved ? 'currentColor' : 'none'} />
          {saved ? 'Saved' : 'Save for later'}
        </GlassButton>
        <GlassTooltip content="A little extra possibility">
          <GlassButton
            aria-label="Show possibility"
            className="icon-button"
            onClick={() => setSaved(!saved)}
          >
            <ArrowUpRight />
          </GlassButton>
        </GlassTooltip>
      </div>
    </div>
  );
}
function MaterialSample() {
  const [blur, setBlur] = useState(24);
  return (
    <div className="material-sample">
      <div className="material-colors" />
      <GlassCard
        className="material-preview"
        style={{ '--glass-blur': `${blur}px` } as CSSProperties}
      >
        <Layers3 size={26} strokeWidth={1.3} />
        <div>
          <span className="eyebrow">A little perspective</span>
          <h3>Depth you can feel.</h3>
        </div>
        <span className="material-tag">Frosted / {blur}px</span>
      </GlassCard>
      <div className="material-control">
        <GlassSlider
          label="Refraction"
          min={0}
          max={40}
          unit="px"
          value={blur}
          onValueChange={setBlur}
        />
      </div>
    </div>
  );
}
function DialogSample() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState('');
  return (
    <div className="center-sample">
      <div className="sample-icon">
        <Layers3 strokeWidth={1.2} size={26} />
      </div>
      <h3>A space of your own.</h3>
      <GlassDialog
        open={open}
        onOpenChange={setOpen}
        trigger={
          <GlassButton>
            New collection <Plus />
          </GlassButton>
        }
        title="A new collection"
        description="Give your next listening moment a name."
      >
        <form
          className="stack"
          onSubmit={(event) => {
            event.preventDefault();
            if (name.trim()) {
              setSaved(name.trim());
              setOpen(false);
              setName('');
            }
          }}
        >
          <GlassInput
            label="Collection name"
            value={name}
            maxLength={60}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Sunday, slowly"
          />
          <GlassButton tone="primary" type="submit" disabled={!name.trim()}>
            Create collection <ArrowRight />
          </GlassButton>
        </form>
      </GlassDialog>
      <output className="sample-status">
        {saved
          ? `“${saved}” created for this preview.`
          : 'One task. A little more focus.'}
      </output>
    </div>
  );
}
function Sample({ id }: { id: string }) {
  if (id === 'button') return <ButtonSample />;
  if (id === 'card') return <MaterialSample />;
  if (id === 'switch')
    return (
      <div className="sample-settings">
        <span className="eyebrow">Make yourself comfortable</span>
        <GlassSwitch
          label="Spatial audio"
          description="A little more room for sound"
          defaultChecked
        />
        <div className="thin-rule" />
        <GlassSwitch
          label="Quiet mode"
          description="Fewer distractions. More focus."
        />
      </div>
    );
  if (id === 'slider')
    return (
      <div className="stack sample-sliders">
        <div className="sample-heading">
          <AudioLines size={21} />
          <span>Find your frequency</span>
        </div>
        <GlassSlider label="Volume" defaultValue={64} />
        <GlassSlider label="Atmosphere" defaultValue={38} />
      </div>
    );
  if (id === 'tabs')
    return (
      <GlassTabs
        label="Your listening mood"
        items={[
          {
            value: 'focus',
            label: 'Focus',
            content: (
              <div className="tab-sample-content">
                <Sparkles size={24} />
                <h3>Room for a deeper thought.</h3>
                <p>Gentle textures. A steady state of flow.</p>
              </div>
            ),
          },
          {
            value: 'unwind',
            label: 'Unwind',
            content: (
              <div className="tab-sample-content">
                <AudioLines size={24} />
                <h3>Let the day fall away.</h3>
                <p>Warm tones for the space between things.</p>
              </div>
            ),
          },
          {
            value: 'sleep',
            label: 'Sleep',
            content: (
              <div className="tab-sample-content">
                <Sparkles size={24} />
                <h3>Drift a little further.</h3>
                <p>Soft frequencies for a quieter night.</p>
              </div>
            ),
          },
        ]}
      />
    );
  if (id === 'badge')
    return (
      <div className="badge-samples">
        <div>
          <GlassBadge tone="verdigris">
            <span className="status-dot" />
            Available now
          </GlassBadge>
          <GlassBadge tone="blue">Spatial audio</GlassBadge>
        </div>
        <div>
          <GlassBadge>Ambient</GlassBadge>
          <GlassBadge>Vol. 01</GlassBadge>
          <GlassBadge tone="verdigris">New release</GlassBadge>
        </div>
        <p>A little context goes a long way.</p>
      </div>
    );
  if (id === 'input')
    return (
      <GlassInput
        label="Collection name"
        placeholder="Sunday, slowly"
        hint="Something that feels like you."
      />
    );
  if (id === 'select')
    return (
      <GlassSelect
        label="Your sound environment"
        defaultValue="coast"
        options={[
          { value: 'coast', label: 'Coastal dusk' },
          { value: 'rain', label: 'Rain on glass' },
          { value: 'space', label: 'Open atmosphere' },
        ]}
      />
    );
  if (id === 'checkbox')
    return (
      <div className="stack">
        <span className="eyebrow">Your listening ritual</span>
        <GlassCheckbox label="Include in my weekly mix" defaultChecked />
        <GlassCheckbox label="Download for a quiet moment" />
        <GlassCheckbox label="Share with my circle" />
      </div>
    );
  if (id === 'dialog') return <DialogSample />;
  return (
    <div className="center-sample">
      <div className="inline-controls">
        <GlassTooltip content="Save this moment">
          <GlassButton className="icon-button" aria-label="Save this moment">
            <Heart />
          </GlassButton>
        </GlassTooltip>
        <GlassTooltip content="Small hints. Nothing essential hidden.">
          <GlassButton className="icon-button" aria-label="About tooltips">
            <CircleHelp />
          </GlassButton>
        </GlassTooltip>
        <GlassTooltip content="Explore the listening room">
          <GlassButton
            className="icon-button"
            aria-label="Explore listening room"
            nativeButton={false}
            render={<Link to="/listening-room" />}
          >
            <MoveUpRight />
          </GlassButton>
        </GlassTooltip>
      </div>
      <p className="sample-status">Hover or focus for a helpful aside.</p>
    </div>
  );
}
export function ComponentExplorer() {
  const [filter, setFilter] = useState('All components');
  const categories = [
    'All components',
    'Actions',
    'Surfaces',
    'Inputs',
    'Navigation',
    'Feedback',
  ];
  const visible = componentGuides.filter(
    (g) => filter === 'All components' || g.category === filter,
  );
  return (
    <SiteShell>
      <main id="main">
        <section className="explorer-intro">
          <div>
            <div className="intro-kicker">
              <span className="status-dot" />
              AN OPEN CANVAS FOR YOUR NEXT IDEA<GlassBadge>v1.0</GlassBadge>
            </div>
            <h1>
              Glass, with
              <br />
              <span>substance.</span>
              <span className="heading-star" aria-hidden="true">
                ✳
              </span>
            </h1>
          </div>
          <div className="intro-aside">
            <p>
              Light on the surface.
              <br />
              Considered at every layer.
            </p>
            <span>
              A glass component system for interfaces that feel a little more
              alive. Built on shadcn/ui and Base UI.
            </span>
            <Link className="text-link" to="/foundations">
              Get to know the system <ArrowRight size={16} />
            </Link>
          </div>
        </section>
        <section className="component-section" aria-label="Component library">
          <div className="library-toolbar">
            <fieldset className="filter-buttons" aria-label="Filter components">
              {categories.map((category) => (
                <GlassButton
                  key={category}
                  tone="quiet"
                  className={filter === category ? 'filter-active' : ''}
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                >
                  {category}
                  {category === 'All components' && (
                    <span className="count">11</span>
                  )}
                </GlassButton>
              ))}
            </fieldset>
            <span className="toolbar-note">
              <SlidersHorizontal size={14} />
              Go ahead. Try everything.
            </span>
          </div>
          <div className="specimen-grid">
            {visible.map((g) => (
              <Specimen key={g.id} id={g.id}>
                <Sample id={g.id} />
              </Specimen>
            ))}
            {filter === 'All components' && (
              <Link to="/listening-room" className="demo-specimen">
                <img
                  width={1672}
                  height={941}
                  src="/prism-midnight-island.png"
                  alt="A volcanic island under a luminous midnight sky"
                />
                <div className="demo-specimen-top">
                  <GlassBadge>In the wild</GlassBadge>
                  <ArrowUpRight />
                </div>
                <div className="demo-specimen-copy">
                  <span className="eyebrow">THE LISTENING ROOM</span>
                  <h2>
                    Less noise.
                    <br />
                    More feeling.
                  </h2>
                  <span>
                    Experience Prism in its element <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            )}
          </div>
          <div className="library-bottom">
            <span>{visible.length} thoughtfully made components.</span>
            {storybookUrl && (
              <a
                className="text-link"
                href={storybookUrl}
                target="_blank"
                rel="noreferrer"
              >
                All states. Every detail. Open Storybook{' '}
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
