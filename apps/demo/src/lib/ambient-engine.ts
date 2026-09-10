/** Original, procedurally synthesized audio. No recordings, network, or autoplay. */
export class AmbientEngine {
  private disposed = false;
  private context: AudioContext;
  private master: GainNode;
  private texture: GainNode;
  private tones: OscillatorNode[] = [];
  private panners: StereoPannerNode[] = [];
  private sources: (OscillatorNode | AudioBufferSourceNode)[] = [];
  constructor() {
    this.context = new AudioContext();
    this.master = this.context.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.context.destination);
    this.texture = this.context.createGain();
    this.texture.gain.value = 0.06;
    this.texture.connect(this.master);
    const frequencies = [130.81, 196, 261.63, 329.63];
    frequencies.forEach((frequency, index) => {
      const oscillator = this.context.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      const gain = this.context.createGain();
      gain.gain.value = 0.035;
      const panner = this.context.createStereoPanner();
      panner.pan.value = index % 2 ? 0.5 : -0.5;
      const lfo = this.context.createOscillator();
      lfo.frequency.value = 0.05 + index * 0.015;
      const lfoGain = this.context.createGain();
      lfoGain.gain.value = 0.012;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      oscillator.connect(gain);
      gain.connect(panner);
      panner.connect(this.master);
      oscillator.start();
      lfo.start();
      this.tones.push(oscillator);
      this.panners.push(panner);
      this.sources.push(oscillator, lfo);
    });
    const buffer = this.context.createBuffer(
      2,
      this.context.sampleRate * 8,
      this.context.sampleRate,
    );
    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let last = 0;
      let seed = 7821 + channel;
      for (let i = 0; i < data.length; i++) {
        seed = (seed * 16807) % 2147483647;
        const white = (seed / 2147483647) * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
      // Fade the loop boundary to avoid clicks.
      for (let i = 0; i < 1200; i++) {
        data[i] *= i / 1200;
        data[data.length - 1 - i] *= i / 1200;
      }
    }
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 700;
    noise.connect(filter);
    filter.connect(this.texture);
    noise.start();
    this.sources.push(noise);
  }
  async play(volume: number) {
    await this.context.resume();
    this.setVolume(volume);
  }
  async pause() {
    if (this.disposed) return;
    this.master.gain.setTargetAtTime(0, this.context.currentTime, 0.08);
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (!this.disposed) await this.context.suspend();
  }
  setVolume(volume: number) {
    this.master.gain.setTargetAtTime(
      Math.max(0, Math.min(volume, 100)) / 100,
      this.context.currentTime,
      0.12,
    );
  }
  setAtmosphere(amount: number) {
    this.texture.gain.setTargetAtTime(
      amount / 300,
      this.context.currentTime,
      0.3,
    );
  }
  setSpatial(enabled: boolean) {
    this.panners.forEach((p, i) =>
      p.pan.setTargetAtTime(
        enabled ? (i % 2 ? 0.65 : -0.65) : 0,
        this.context.currentTime,
        0.3,
      ),
    );
  }
  setScene(index: number) {
    const chords = [
      [130.81, 196, 261.63, 329.63],
      [110, 164.81, 220, 293.66],
      [146.83, 220, 293.66, 369.99],
    ];
    const chord = chords[index] ?? chords[0];
    this.tones.forEach((tone, i) =>
      tone.frequency.setTargetAtTime(chord[i], this.context.currentTime, 1.6),
    );
  }
  async dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.sources.forEach((source) => source.stop());
    await this.context.close();
  }
}
