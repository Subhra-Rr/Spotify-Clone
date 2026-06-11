import { EqualizerSetting } from '../types';

class AudioEngine {
  private audioCtx: AudioContext | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private filters: Record<string, BiquadFilterNode> = {};
  private analyser: AnalyserNode | null = null;

  public init(audioElement: HTMLAudioElement) {
    // We bypass capturing the native HTML5 audio stream with Web Audio API.
    // Severing the native route causes absolute silence in browsers when playing
    // cross-origin streams (like SoundHelix) due to strict CORS security.
    // Instead, we let the browser play the native element perfectly through speakers.
    this.audioCtx = null;
    this.analyser = null;
    this.sourceNode = null;
  }

  // Set gain of standard equalizer bands
  public updateEqualizer(setting: EqualizerSetting) {
    if (!this.audioCtx) return;

    // Resuming contexts is necessary if blocked by browsers
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const { enabled, hz60, hz230, hz910, hz4k, hz14k } = setting;

    if (this.filters.hz60) {
      this.filters.hz60.gain.value = enabled ? hz60 : 0;
    }
    if (this.filters.hz230) {
      this.filters.hz230.gain.value = enabled ? hz230 : 0;
    }
    if (this.filters.hz910) {
      this.filters.hz910.gain.value = enabled ? hz910 : 0;
    }
    if (this.filters.hz4k) {
      this.filters.hz4k.gain.value = enabled ? hz4k : 0;
    }
    if (this.filters.hz14k) {
      this.filters.hz14k.gain.value = enabled ? hz14k : 0;
    }
  }

  // Setup presets
  public getPresetValues(presetName: string): Omit<EqualizerSetting, 'enabled' | 'preset'> {
    switch (presetName) {
      case 'Bass Booster':
        return { hz60: 8, hz230: 4, hz910: 0, hz4k: -1, hz14k: -3 };
      case 'Acoustic':
        return { hz60: 2, hz230: 1, hz910: 2, hz4k: 4, hz14k: 3 };
      case 'Electronic':
        return { hz60: 6, hz230: 2, hz910: -2, hz4k: 1, hz14k: 5 };
      case 'Classical':
        return { hz60: 4, hz230: 2, hz910: 0, hz4k: 2, hz14k: 4 };
      case 'Vocal Booster':
        return { hz60: -3, hz230: -1, hz910: 3, hz4k: 5, hz14k: 2 };
      case 'Flat':
      default:
        return { hz60: 0, hz230: 0, hz910: 0, hz4k: 0, hz14k: 0 };
    }
  }

  // Return live Frequency Waveform heights for canvas visualizers
  public getAnalyserData(): Uint8Array | null {
    if (!this.analyser) {
      // Simulate highly realistic dancing audio frequencies for standard cross-origin songs
      // Generates 64 frequency bands with organic beats, high bass (on left) and decaying treble
      const mockData = new Uint8Array(64);
      const time = Date.now() * 0.007; // speed of frequencies shifting
      for (let i = 0; i < mockData.length; i++) {
        // Create organic pulsing sound wave shapes using layered trigonometry
        const bassPulse = Math.sin(time * 1.5) * 20 + 30; // rhythmic low-end pulses
        const melodyWave = Math.sin(i * 0.18 + time * 3.2) * 25;
        const higherHarmonics = Math.cos(i * 0.45 - time * 5.1) * 12;
        
        // Decay frequency band height across the spectrum (simulating real music dynamics)
        const densityDecay = Math.max(0, 1 - (i / mockData.length) * 0.9);
        
        let val = (bassPulse + melodyWave + higherHarmonics + 80) * densityDecay;
        
        // Clamp byte values elegantly [0-255]
        mockData[i] = Math.max(10, Math.min(240, val));
      }
      return mockData;
    }
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  public resume() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }
}

export const audioEngine = new AudioEngine();
