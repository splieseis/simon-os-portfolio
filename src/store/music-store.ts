import { atom } from 'nanostores';

/**
 * Music Store
 * Manages background music state and preferences
 */

// Whether user has enabled music
export const isMusicEnabled = atom<boolean>(false);

// Volume level (0-1)
export const musicVolume = atom<number>(0.5);

// Current playback state
export const isPlaying = atom<boolean>(false);

/**
 * Actions
 */
export const enableMusic = (volume: number) => {
  isMusicEnabled.set(true);
  musicVolume.set(volume);
};

export const setVolume = (volume: number) => {
  musicVolume.set(Math.max(0, Math.min(1, volume)));
};

export const togglePlayback = () => {
  isPlaying.set(!isPlaying.get());
};

export const pauseMusic = () => {
  isPlaying.set(false);
};

export const playMusic = () => {
  if (isMusicEnabled.get()) {
    isPlaying.set(true);
  }
};

