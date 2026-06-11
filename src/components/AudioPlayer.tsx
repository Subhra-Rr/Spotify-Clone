import React, { useRef, useEffect, useState } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Volume1,
  Maximize2,
  Music,
  Download,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Cast,
  Check,
  Disc,
  FileAudio,
  Shuffle,
  Repeat
} from 'lucide-react';
import { Track, EqualizerSetting } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface AudioPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPreviousTrack: () => void;
  audioElementRef: React.RefObject<HTMLAudioElement | null>;
  isPremium: boolean;
  offlineDownloads: string[];
  onToggleDownloadTrack: (trackId: string) => void;
  equalizer: EqualizerSetting;
  onChangeEqualizer: (eq: EqualizerSetting) => void;
  onImportLocalFile: (file: File) => void;
  isOffline: boolean;
  isShuffle?: boolean;
  isRepeat?: boolean;
  onToggleShuffle?: () => void;
  onToggleRepeat?: () => void;
}

export default function AudioPlayer({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPreviousTrack,
  audioElementRef,
  isPremium,
  offlineDownloads,
  onToggleDownloadTrack,
  equalizer,
  onChangeEqualizer,
  onImportLocalFile,
  isOffline,
  isShuffle,
  isRepeat,
  onToggleShuffle,
  onToggleRepeat
}: AudioPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  // Fallback states if not lifting state
  const [localShuffle, setLocalShuffle] = useState(false);
  const [localRepeat, setLocalRepeat] = useState(false);

  const shuffleActive = isShuffle !== undefined ? isShuffle : localShuffle;
  const repeatActive = isRepeat !== undefined ? isRepeat : localRepeat;

  const handleShuffleToggle = onToggleShuffle || (() => setLocalShuffle(!localShuffle));
  const handleRepeatToggle = onToggleRepeat || (() => setLocalRepeat(!localRepeat));

  const [showEqModal, setShowEqModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [activeCastDevice, setActiveCastDevice] = useState<string | null>(null);
  
  // Waveform visualization canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Parse lyrics from synchronized timestamp string if available
  const [lyricsLines, setLyricsLines] = useState<Array<{ time: number; text: string }>>([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [showLyrics, setShowLyrics] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (currentTrack) {
      setCurrentTime(0);
      setDuration(currentTrack.duration_ms / 1000 || 180);
      
      // Parse lyrics
      if (currentTrack.lyrics) {
        const lines = currentTrack.lyrics.split('\n').map(line => {
          const match = line.match(/\[(\d+):(\d+)\](.*)/);
          if (match) {
            const min = parseInt(match[1]);
            const sec = parseInt(match[2]);
            return {
              time: min * 60 + sec,
              text: match[3].trim()
            };
          }
          return { time: 0, text: line };
        }).filter(l => l.text !== '');
        setLyricsLines(lines);
      } else {
        setLyricsLines([]);
      }
    }
  }, [currentTrack]);

  // Audio elements event listeners setup
  useEffect(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    // Instant duration sync for cached files
    if (audio.duration) {
      setDuration(audio.duration);
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      // Track parsed lyrics sync
      if (lyricsLines.length > 0) {
        const matchIdx = lyricsLines.findIndex((line, idx) => {
          const nextLine = lyricsLines[idx + 1];
          return audio.currentTime >= line.time && (!nextLine || audio.currentTime < nextLine.time);
        });
        setCurrentLyricIndex(matchIdx);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 180);
      // Initialize web audio engine once playing
      audioEngine.init(audio);
      audioEngine.updateEqualizer(equalizer);
    };

    const handleEnded = () => {
      onNextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioElementRef, currentTrack, lyricsLines, equalizer]);

  // Apply volume changes
  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, audioElementRef]);

  // Trigger web audio equalizer shifts when sliders or status change
  useEffect(() => {
    audioEngine.updateEqualizer(equalizer);
  }, [equalizer]);

  // Track playback states visually with canvas waveforms
  useEffect(() => {
    if (isPlaying) {
      drawVisualizer();
    } else if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isPlaying]);

  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      animationFrameIdRef.current = requestAnimationFrame(draw);
      const data = audioEngine.getAnalyserData();
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#10b981'; // emerald green waves

      if (data) {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          sum += data[i];
        }
        const isSilent = sum < 10;

        if (isSilent && isPlaying) {
          ctx.beginPath();
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 1.5;
          const time = Date.now() * 0.006;
          for (let i = 0; i < canvas.width; i++) {
            const y = canvas.height / 2 + Math.sin(i * 0.08 + time) * 12 * Math.cos(i * 0.02 + time * 0.4);
            if (i === 0) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
          }
          ctx.stroke();
        } else {
          const sliceWidth = canvas.width / data.length;
          let x = 0;

          for (let i = 0; i < data.length; i++) {
            const v = data[i] / 128.0;
            const y = (v * canvas.height) / 2;

            ctx.fillRect(x, canvas.height - y, sliceWidth - 1, y);
            x += sliceWidth;
          }
        }
      } else {
        // Draw elegant standby wave
        ctx.fillStyle = '#262626';
        ctx.fillRect(0, canvas.height / 2 - 1, canvas.width, 2);
      }
    };

    draw();
  };

  const handleSliderSeeking = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioElementRef.current) {
      audioElementRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePresetChange = (presetName: any) => {
    const bandValues = audioEngine.getPresetValues(presetName);
    onChangeEqualizer({
      ...equalizer,
      preset: presetName,
      ...bandValues
    });
  };

  const handleSliderBandChange = (band: keyof Omit<EqualizerSetting, 'enabled' | 'preset'>, val: number) => {
    onChangeEqualizer({
      ...equalizer,
      preset: 'Custom',
      [band]: val
    });
  };

  const triggerUploadInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImportLocalFile(files[0]);
    }
  };

  const isDownloaded = currentTrack ? offlineDownloads.includes(currentTrack.track_id) : false;

  return (
    <div id="playback-audio-footer" className="w-full bg-[#121212] border-t border-neutral-900/60 px-6 py-3.5 z-45 flex flex-col md:flex-row items-center justify-between gap-3 text-white flex-shrink-0 relative">
      {/* Track Details Side info */}
      <div className="flex items-center gap-3 w-full md:w-1/4 min-w-0">
        {currentTrack ? (
          <>
            <img
              src={currentTrack.artwork_url}
              alt="track art"
              className="w-12 h-12 rounded object-cover shadow border border-neutral-800"
            />
            <div className="min-w-0">
              <h4 className="text-sm font-semibold truncate hover:underline text-white cursor-pointer flex items-center gap-1.5">
                {currentTrack.title}
                {currentTrack.explicit && (
                  <span className="text-[9px] bg-red-950 text-red-500 px-1 rounded font-bold font-mono">E</span>
                )}
              </h4>
              <p className="text-xs text-neutral-400 truncate hover:underline cursor-pointer">
                {currentTrack.artist}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 bg-neutral-900 rounded flex items-center justify-center border border-neutral-800">
              <Music className="w-5 h-5 text-neutral-500" />
            </div>
            <div>
              <h4 className="text-sm text-neutral-400 italic">Select a song</h4>
              <p className="text-xs text-neutral-600">to continue streaming</p>
            </div>
          </>
        )}
      </div>

      {/* Primary Transport Timeline controls */}
      <div className="flex flex-col items-center gap-1.5 w-full md:w-2/4">
        <div className="flex items-center gap-6">
          <button
            onClick={handleShuffleToggle}
            className={`relative transition p-1.5 cursor-pointer ${
              shuffleActive ? 'text-emerald-500 hover:text-emerald-400' : 'text-neutral-400 hover:text-white'
            }`}
            title={`Shuffle (${shuffleActive ? 'On' : 'Off'})`}
          >
            <Shuffle className="w-4.5 h-4.5" />
            {shuffleActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
            )}
          </button>

          <button
            onClick={onPreviousTrack}
            className="text-neutral-400 hover:text-white transition p-1.5 cursor-pointer"
            title="Previous Track"
          >
            <SkipBack className="w-5 h-5 fill-current text-current" />
          </button>

          <button
            onClick={onTogglePlay}
            disabled={!currentTrack}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-xl bg-white text-black disabled:opacity-50 disabled:hover:scale-100 flex-shrink-0`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-black text-black" />
            ) : (
              <Play className="w-5 h-5 fill-black text-black translate-x-0.5" />
            )}
          </button>

          <button
            onClick={onNextTrack}
            className="text-neutral-400 hover:text-white transition p-1.5 cursor-pointer"
            title="Next Track"
          >
            <SkipForward className="w-5 h-5 fill-current text-current" />
          </button>

          <button
            onClick={handleRepeatToggle}
            className={`relative transition p-1.5 cursor-pointer ${
              repeatActive ? 'text-emerald-500 hover:text-emerald-400' : 'text-neutral-400 hover:text-white'
            }`}
            title={`Repeat (${repeatActive ? 'On' : 'Off'})`}
          >
            <Repeat className="w-4.5 h-4.5" />
            {repeatActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Waves overlaying timeline */}
        <div className="flex items-center gap-2.5 w-full text-[10px] font-mono text-neutral-500">
          <span>{formatTime(currentTime)}</span>
          <div className="flex-1 relative group py-2">
            <canvas
              ref={canvasRef}
              width={350}
              height={14}
              className="absolute left-0 right-0 bottom-2.5 w-full pointer-events-none opacity-30 h-3.5"
            />
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSliderSeeking}
              className="w-full h-1 bg-neutral-800 accent-emerald-500 rounded-lg appearance-none cursor-pointer group-hover:h-1.5 transition-all text-emerald-500"
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Advanced Sound Controls */}
      <div className="flex items-center justify-end gap-3 w-full md:w-1/4">
        <button
          onClick={() => setShowLyrics(!showLyrics)}
          disabled={!currentTrack || !currentTrack.lyrics}
          className={`p-1.5 rounded transition ${
            showLyrics
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'text-neutral-400 hover:text-white disabled:opacity-30'
          }`}
          title="Synced Lyrics"
        >
          <span className="text-[10px] font-bold tracking-wider uppercase font-sans">Lyrics</span>
        </button>

        <button
          onClick={() => setShowEqModal(!showEqModal)}
          className={`p-1.5 rounded transition hover:bg-neutral-900 text-neutral-400 hover:text-white ${
            equalizer.enabled ? 'text-emerald-400' : ''
          }`}
          title="Audio Equalizer (60Hz to 14kHz)"
        >
          <Sliders className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowCastModal(true)}
          className={`p-1.5 rounded transition hover:bg-neutral-900 text-neutral-400 hover:text-white ${
            activeCastDevice ? 'text-emerald-400 animate-pulse' : ''
          }`}
          title="Connect to a Smart Speaker"
        >
          <Cast className="w-4 h-4" />
        </button>

        {currentTrack && (
          <button
            onClick={() => {
              if (isPremium) {
                onToggleDownloadTrack(currentTrack.track_id);
              } else {
                alert('Premium Subscription is required for downloading tracks for offline listening.');
              }
            }}
            className={`p-1.5 rounded transition hover:bg-neutral-900 ${
              isDownloaded
                ? 'text-emerald-400'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
            title={isDownloaded ? 'Downloaded Offline (Stored Encrypted)' : 'Download Track'}
          >
            <Download className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={triggerUploadInput}
          className="p-1.5 rounded transition hover:bg-neutral-900 text-neutral-400 hover:text-white"
          title="Import Local Audio Track"
        >
          <FileAudio className="w-4 h-4" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="audio/*"
          className="hidden"
        />



        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-neutral-400 hover:text-white transition p-1 cursor-pointer"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : volume < 0.4 ? (
              <Volume1 className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-1 bg-neutral-800 accent-white rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Equalizer Popover Drawer */}
      {showEqModal && (
        <div className="fixed bottom-16 right-4 bg-neutral-900/95 border border-neutral-800 rounded-xl p-4 w-72 text-white shadow-2xl z-50 animate-fadeIn backdrop-blur">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-2 mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-emerald-400">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" /> Graphic Equalizer
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="eq-active-cb"
                checked={equalizer.enabled}
                onChange={(e) => onChangeEqualizer({ ...equalizer, enabled: e.target.checked })}
                className="rounded cursor-pointer accent-emerald-500"
              />
              <label htmlFor="eq-active-cb" className="text-[10px] uppercase font-mono text-neutral-400 cursor-pointer">
                {equalizer.enabled ? 'Active' : 'Bypass'}
              </label>
              <button onClick={() => setShowEqModal(false)} className="text-neutral-500 hover:text-white text-xs pl-2">✕</button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1.5">Presets</label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 text-[10px]">
              {['Flat', 'Bass Booster', 'Acoustic', 'Electronic', 'Classical', 'Vocal Booster'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePresetChange(preset)}
                  className={`py-1 rounded text-center border font-semibold transition ${
                    equalizer.preset === preset
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                      : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-2.5 h-28 pt-2">
            {[
              { label: '60Hz', key: 'hz60' },
              { label: '230Hz', key: 'hz230' },
              { label: '910Hz', key: 'hz910' },
              { label: '4kHz', key: 'hz4k' },
              { label: '14kHz', key: 'hz14k' }
            ].map((band) => (
              <div key={band.label} className="flex flex-col items-center flex-1">
                <input
                  type="range"
                  min={-12}
                  max={12}
                  step={1}
                  disabled={!equalizer.enabled}
                  value={equalizer[band.key as keyof Omit<EqualizerSetting, 'enabled' | 'preset'>]}
                  onChange={(e) => handleSliderBandChange(band.key as any, parseInt(e.target.value, 10))}
                  className="h-20 appearance-none bg-neutral-950 accent-emerald-500 rounded disabled:opacity-20 cursor-pointer vertical-slider"
                  style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' } as any}
                />
                <span className="text-[9px] font-mono mt-1 text-neutral-400">{band.label}</span>
                <span className="text-[8px] font-mono text-neutral-600">
                  {equalizer[band.key as keyof Omit<EqualizerSetting, 'enabled' | 'preset'>]} dB
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Smart speaker cast selector modal */}
      {showCastModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 w-80 shadow-2xl relative">
            <h4 className="text-sm font-semibold flex items-center gap-2 mb-4 text-white">
              <Cast className="w-5 h-5 text-emerald-500" />
              Connect to a Smart Speaker
            </h4>

            <div className="flex flex-col gap-2.5">
              {[
                { id: 'nest-1', name: 'Google Nest Hub Max', loc: 'Living Room' },
                { id: 'nest-2', name: 'Google Nest Mini', loc: 'Kitchen' },
                { id: 'alexa-1', name: 'Amazon Echo Studio', loc: 'Bedroom Master' },
                { id: 'homepod-1', name: 'Apple HomePod Stereo Pair', loc: 'Sound Studio' }
              ].map((dev) => (
                <button
                  type="button"
                  key={dev.id}
                  onClick={() => {
                    setActiveCastDevice(activeCastDevice === dev.id ? null : dev.id);
                    setShowCastModal(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg border text-xs flex justify-between items-center transition ${
                    activeCastDevice === dev.id
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                      : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <div>
                    <p className="font-semibold">{dev.name}</p>
                    <p className="text-[10px] text-neutral-500">{dev.loc}</p>
                  </div>
                  {activeCastDevice === dev.id ? (
                    <span className="p-1 bg-emerald-500/20 text-emerald-400 rounded-full font-mono text-[9px] font-bold">CONNECTED</span>
                  ) : (
                    <span className="text-[10px] text-neutral-500 font-mono">CAST</span>
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowCastModal(false)}
              className="mt-4 w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white py-1.5 rounded transition text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Scrollable lyrics panel overlay */}
      {showLyrics && currentTrack && lyricsLines.length > 0 && (
        <div id="lyrics-scrolling-overlay" className="fixed right-4 bottom-16 bg-neutral-950 border border-neutral-900 p-4 rounded-xl shadow-2xl w-80 h-[280px] overflow-y-auto z-45 flex flex-col gap-4 text-center scrollbar-thin animate-fadeIn font-sans pb-12">
          <div className="flex justify-between items-center sticky top-0 bg-neutral-950 pb-2 border-b border-neutral-900 z-10">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">Synced Lyrics feed</span>
            <button onClick={() => setShowLyrics(false)} className="text-neutral-500 hover:text-white text-xs">✕</button>
          </div>
          <div className="flex flex-col gap-3 py-2">
            {lyricsLines.map((line, idx) => {
              const active = idx === currentLyricIndex;
              return (
                <p
                  key={idx}
                  className={`text-xs transition-all duration-300 ${
                    active
                      ? 'text-emerald-400 font-bold scale-105 opacity-100'
                      : idx < currentLyricIndex
                      ? 'text-neutral-600 line-through opacity-40'
                      : 'text-neutral-400 opacity-80'
                  }`}
                >
                  {line.text}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}