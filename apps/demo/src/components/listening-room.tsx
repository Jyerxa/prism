import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  AudioLines,
  Check,
  Heart,
  Headphones,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  Waves,
  Wind,
  Moon,
  ArrowLeft,
} from 'lucide-react';
import { Link } from 'react-router';
import {
  GlassBadge,
  GlassButton,
  GlassCard,
  GlassSelect,
  GlassSlider,
  GlassSwitch,
  GlassTooltip,
} from '@prism/ui';
import { SiteShell } from './site-shell';
import { AmbientEngine } from '../lib/ambient-engine';

const scenes = [
  {
    name: 'The quiet tide',
    mood: 'COASTAL · WEIGHTLESS',
    detail: 'A slow current. An open horizon.',
    icon: Waves,
    tone: 'coast',
  },
  {
    name: 'Somewhere softer',
    mood: 'WARM · UNHURRIED',
    detail: 'Warm frequencies. Nothing to rush.',
    icon: Wind,
    tone: 'warm',
  },
  {
    name: 'After the afterglow',
    mood: 'NOCTURNAL · SPACIOUS',
    detail: 'For the hours that belong to you.',
    icon: Moon,
    tone: 'night',
  },
];
export function ListeningRoom() {
  const engine = useRef<AmbientEngine | null>(null);
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [scene, setScene] = useState(0);
  const [volume, setVolume] = useState(48);
  const [atmosphere, setAtmosphere] = useState(38);
  const [spatial, setSpatial] = useState(true);
  const [saved, setSaved] = useState<number[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [timer, setTimer] = useState('off');
  const [status, setStatus] = useState('');
  const timerStart = useRef(0);
  useEffect(
    () => () => {
      void engine.current?.dispose();
    },
    [],
  );
  useEffect(() => {
    if (!playing) return;
    let lastTick = performance.now();
    const id = window.setInterval(() => {
      const seconds = Math.floor((performance.now() - lastTick) / 1000);
      if (seconds > 0) {
        lastTick += seconds * 1000;
        setElapsed((v) => v + seconds);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing]);
  useEffect(() => {
    if (
      playing &&
      timer !== 'off' &&
      elapsed - timerStart.current >= Number(timer) * 60
    ) {
      void engine.current?.pause();
      setPlaying(false);
      setTimer('off');
      setStatus('Your sleep timer has paused the sound.');
    }
  }, [elapsed, playing, timer]);
  async function toggle() {
    if (busy) return;
    setBusy(true);
    try {
      if (!engine.current) {
        engine.current = new AmbientEngine();
        engine.current.setScene(scene);
        engine.current.setAtmosphere(atmosphere);
        engine.current.setSpatial(spatial);
      }
      if (playing) await engine.current.pause();
      else await engine.current.play(volume);
      setPlaying(!playing);
      setStatus('');
    } catch {
      setStatus(
        'Audio could not start. Try playing again in a browser that supports Web Audio.',
      );
    } finally {
      setBusy(false);
    }
  }
  function selectScene(index: number) {
    setScene(index);
    engine.current?.setScene(index);
    setElapsed(0);
    timerStart.current = 0;
  }
  const current = scenes[scene];
  const isSaved = saved.includes(scene);
  return (
    <SiteShell active="demo">
      <main id="main" className="listening-main">
        <div className="room-meta">
          <Link to="/" className="text-link">
            <ArrowLeft size={14} />
            Back to the components
          </Link>
          <span>
            PRISM IN PRACTICE <span>/</span> 01
          </span>
        </div>
        <section
          className={`listening-scene scene-${current.tone}`}
          aria-label="Ambient listening room"
        >
          <img
            width={1672}
            height={941}
            fetchPriority="high"
            className="room-backdrop"
            src="/prism-midnight-island.png"
            alt="A quiet sea and volcanic island beneath a blue night sky"
          />
          <div className="room-topline">
            <div>
              <AudioLines size={19} />
              <span>THE LISTENING ROOM</span>
            </div>
            <GlassBadge>
              <span className="status-dot" />A quieter corner of the internet
            </GlassBadge>
          </div>
          <div className="room-content">
            <div className="room-title">
              <span className="eyebrow">SOUND FOR DOING A LITTLE LESS</span>
              <h1>
                Tune out.
                <br />
                <span>Drift in.</span>
              </h1>
              <p>
                No destination. No next thing.
                <br />
                Just a little space to be here.
              </p>
              <div className="room-start">
                <GlassButton tone="primary" onClick={toggle} disabled={busy}>
                  {playing ? (
                    <Pause fill="currentColor" />
                  ) : (
                    <Play fill="currentColor" />
                  )}
                  {playing ? 'Pause for a moment' : 'Find your quiet'}
                </GlassButton>
                <span>
                  <Headphones size={15} />
                  Headphones recommended
                </span>
              </div>
            </div>
            <GlassCard className="atmosphere-panel">
              <div className="atmosphere-heading">
                <span className="eyebrow">SETTLE IN</span>
                <AudioLines size={21} />
              </div>
              <h2>Make it your moment.</h2>
              <GlassSlider
                label="Atmosphere"
                value={atmosphere}
                onValueChange={(value) => {
                  setAtmosphere(value);
                  engine.current?.setAtmosphere(value);
                }}
              />
              <GlassSwitch
                label="Spatial sound"
                description="A wider place to wander"
                checked={spatial}
                onCheckedChange={(checked) => {
                  setSpatial(checked);
                  engine.current?.setSpatial(checked);
                }}
              />
              <div className="thin-rule" />
              <GlassSelect
                label="Sleep timer"
                value={timer}
                onValueChange={(value) => {
                  setTimer(value);
                  timerStart.current = elapsed;
                }}
                options={[
                  { value: 'off', label: 'Stay a little longer' },
                  { value: '5', label: 'Fade to quiet in 5 minutes' },
                  { value: '15', label: 'Fade to quiet in 15 minutes' },
                  { value: '30', label: 'Fade to quiet in 30 minutes' },
                ]}
              />
            </GlassCard>
          </div>
          <div className="room-coordinates">
            <span>AN OPEN HORIZON / AN OPEN MIND</span>
            <span>Original generative soundscapes</span>
          </div>
        </section>
        <section className="scene-collection" aria-labelledby="scene-heading">
          <div className="section-title">
            <div>
              <span className="eyebrow">THREE WAYS TO GET A LITTLE LOST</span>
              <h2 id="scene-heading">Where will you drift?</h2>
            </div>
            <span>Take your time. There’s no wrong turn.</span>
          </div>
          <div className="scene-cards">
            {scenes.map((item, index) => {
              const Icon = item.icon;
              return (
                <GlassButton
                  key={item.name}
                  className={`scene-card scene-card-${item.tone}`}
                  tone="glass"
                  aria-pressed={scene === index}
                  onClick={() => selectScene(index)}
                >
                  <span className="scene-art">
                    <Icon size={33} strokeWidth={1} />
                  </span>
                  <span className="scene-info">
                    <span className="eyebrow">{item.mood}</span>
                    <strong>{item.name}</strong>
                    <span>{item.detail}</span>
                  </span>
                  <span className="scene-choice">
                    {scene === index ? (
                      <AudioLines size={18} />
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
                  </span>
                </GlassButton>
              );
            })}
          </div>
        </section>
        <GlassCard className="room-player">
          <div className="player-track">
            <div className={`player-thumbnail scene-art ${current.tone}`}>
              <current.icon size={22} strokeWidth={1.5} />
            </div>
            <div>
              <span className="now-playing">
                {playing ? 'NOW DRIFTING' : 'READY WHEN YOU ARE'}
              </span>
              <h2>{current.name}</h2>
              <span>
                Prism originals <span className="player-divider">/</span>{' '}
                {String(Math.floor(elapsed / 60)).padStart(2, '0')}:
                {String(elapsed % 60).padStart(2, '0')}
              </span>
            </div>
          </div>
          <div className="player-transport">
            <GlassTooltip content="Previous soundscape">
              <GlassButton
                className="icon-button"
                tone="quiet"
                aria-label="Previous soundscape"
                onClick={() => selectScene((scene + 2) % 3)}
              >
                <SkipBack size={18} />
              </GlassButton>
            </GlassTooltip>
            <GlassButton
              className="player-play icon-button"
              tone="primary"
              aria-label={playing ? 'Pause soundscape' : 'Play soundscape'}
              onClick={toggle}
              disabled={busy}
            >
              {playing ? (
                <Pause fill="currentColor" />
              ) : (
                <Play fill="currentColor" />
              )}
            </GlassButton>
            <GlassTooltip content="Next soundscape">
              <GlassButton
                className="icon-button"
                tone="quiet"
                aria-label="Next soundscape"
                onClick={() => selectScene((scene + 1) % 3)}
              >
                <SkipForward size={18} />
              </GlassButton>
            </GlassTooltip>
          </div>
          <div className="player-options">
            <Volume2 size={17} />
            <GlassSlider
              label="Volume"
              value={volume}
              onValueChange={(value) => {
                setVolume(value);
                engine.current?.setVolume(value);
              }}
            />
            <GlassTooltip
              content={
                isSaved ? 'Remove from favorites' : 'Save for this visit'
              }
            >
              <GlassButton
                className="icon-button"
                tone="quiet"
                aria-label={
                  isSaved ? 'Remove from favorites' : 'Save soundscape'
                }
                aria-pressed={isSaved}
                onClick={() =>
                  setSaved((items) =>
                    isSaved
                      ? items.filter((item) => item !== scene)
                      : [...items, scene],
                  )
                }
              >
                {isSaved ? <Check /> : <Heart />}
              </GlassButton>
            </GlassTooltip>
          </div>
        </GlassCard>
        <output className="room-status">
          {status ||
            (isSaved
              ? 'Saved to your favorites for this visit.'
              : 'Audio starts only when you press play. Stay as long as you like.')}
        </output>
      </main>
    </SiteShell>
  );
}
