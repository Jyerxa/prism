import { storybookUrl } from '../lib/storybook-url';
import { Link } from 'react-router';
import {
  ArrowRight,
  ArrowUpRight,
  Layers3,
  Focus,
  Hand,
  Sparkles,
} from 'lucide-react';
import { GlassBadge, GlassCard } from '@prism/ui';
import { SiteShell } from '../components/site-shell';
const materials = [
  {
    name: 'Clear',
    type: 'clear' as const,
    number: '01',
    blur: '12px',
    fill: '5%',
    use: 'Decorative surfaces and large, simple content over a controlled dark background.',
  },
  {
    name: 'Frosted',
    type: 'frosted' as const,
    number: '02',
    blur: '24px',
    fill: '62%',
    use: 'The everyday material. Compact cards, grouped controls, and small collections.',
  },
  {
    name: 'Solid',
    type: 'solid' as const,
    number: '03',
    blur: '0px',
    fill: '100%',
    use: 'Long-form reading, dense information, and environments where contrast comes first.',
  },
];
export default function Foundations() {
  return (
    <SiteShell active="foundations">
      <main id="main" className="foundations-main">
        <section className="foundation-intro">
          <GlassBadge tone="verdigris">
            The thinking beneath the surface
          </GlassBadge>
          <h1>
            Clarity is
            <br />
            the material.
          </h1>
          <p>
            Glass is more than a blur filter. It’s a way to give an interface
            depth, establish hierarchy, and let a little of its world show
            through.
          </p>
        </section>
        <section className="foundation-section" aria-labelledby="materials">
          <div className="foundation-heading">
            <span className="eyebrow">01 / MATERIAL</span>
            <h2 id="materials">Three layers. One language.</h2>
            <p>
              Choose the material for the content, then give it room to breathe.
            </p>
          </div>
          <div className="material-grid">
            {materials.map((material) => (
              <div key={material.name} className="material-doc">
                <div className="material-doc-stage">
                  <div className="material-doc-color" />
                  <GlassCard material={material.type}>
                    <Layers3 size={24} strokeWidth={1} />
                    <div>
                      <span className="eyebrow">
                        MATERIAL {material.number}
                      </span>
                      <h3>{material.name}</h3>
                    </div>
                    <div className="material-properties">
                      <span>Blur / {material.blur}</span>
                      <span>Fill / {material.fill}</span>
                    </div>
                  </GlassCard>
                </div>
                <p>{material.use}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="foundation-section palette-section">
          <div className="foundation-heading">
            <span className="eyebrow">02 / PALETTE</span>
            <h2>Night, with a little light.</h2>
            <p>A cool, quiet foundation. One warm flash of energy.</p>
          </div>
          <div className="palette-grid">
            {[
              ['Ink', '#0B1018', 'Canvas'],
              ['Mist', '#A5B1C2', 'Secondary text'],
              ['Frost', '#F2F5FA', 'Primary text'],
              ['Verdigris', '#74D1C4', 'Primary action'],
              ['Sky', '#AAD8FF', 'Information'],
            ].map(([name, color, usage]) => (
              <div className="color-swatch" key={name}>
                <div style={{ background: color }} />
                <h3>
                  {name}
                  <span>{color}</span>
                </h3>
                <p>{usage}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="foundation-section principle-section">
          <div className="foundation-heading">
            <span className="eyebrow">03 / PRINCIPLES</span>
            <h2>A little restraint goes a long way.</h2>
          </div>
          <div className="principle-grid">
            {[
              {
                icon: Focus,
                title: 'Readability is the effect.',
                text: 'Put a dark scrim behind image-backed text. Use solid material when content gets dense. Check text contrast against the final composite, including the brightest background.',
              },
              {
                icon: Layers3,
                title: 'Depth has a job to do.',
                text: 'Use one blur layer per region. Elevate the active surface and let the rest recede. A border and an inner highlight are often enough.',
              },
              {
                icon: Hand,
                title: 'Every input is welcome.',
                text: 'Keep controls at least 44 pixels tall. Preserve visible focus, accessible names, keyboard navigation, and error messages connected to their fields.',
              },
              {
                icon: Sparkles,
                title: 'Motion should feel natural.',
                text: 'Keep feedback around 180 milliseconds. Animate opacity and transforms. Honor reduced motion and reduced transparency, with solid fallbacks when blur is unavailable.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <div className="principle" key={title}>
                <Icon size={25} strokeWidth={1.4} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="foundation-section typography-section">
          <div className="foundation-heading">
            <span className="eyebrow">04 / TYPE & SPACE</span>
            <h2>Let the content breathe.</h2>
            <p>
              Geist for language. Geist Mono for the small, technical details. A
              4px spacing rhythm keeps everything in tune.
            </p>
          </div>
          <div className="type-specimen">
            <span className="eyebrow">
              DISPLAY / 64–96 PX · TRACKING −0.06EM
            </span>
            <p className="type-large">Less, but alive.</p>
            <div className="type-details">
              <div>
                <span className="eyebrow">BODY / 16 PX · LINE HEIGHT 1.6</span>
                <p>A place for your next idea to take shape.</p>
              </div>
              <div>
                <span className="eyebrow">SPACING / BASE 4 PX</span>
                <div className="spacing-scale">
                  {[4, 8, 12, 16, 24, 32, 48].map((n) => (
                    <div key={n}>
                      <span style={{ height: n }} />
                      <small>{n}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="foundation-section getting-started">
          <div className="foundation-heading">
            <span className="eyebrow">05 / BUILD WITH PRISM</span>
            <h2>Yours to make something with.</h2>
            <p>
              Prism is source you own: small React compositions over shadcn’s
              Base UI primitives. The styles and component guidance travel with
              it.
            </p>
          </div>
          <div className="code-block">
            <pre>
              <code>{`import { GlassCard, GlassButton } from '@prism/ui';\n\nexport function AQuietMoment() {\n  return (\n    <GlassCard material="frosted">\n      <h2>Make a little room.</h2>\n      <p>Something good starts here.</p>\n      <GlassButton tone="primary" onClick={startListening}>\n        Start listening\n      </GlassButton>\n    </GlassCard>\n  );\n}`}</code>
            </pre>
          </div>
          <div className="getting-started-links">
            <Link className="text-link" to="/">
              Find your first component <ArrowRight size={16} />
            </Link>
            {storybookUrl && (
              <a
                className="text-link"
                href={storybookUrl}
                target="_blank"
                rel="noreferrer"
              >
                Explore the Storybook <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
