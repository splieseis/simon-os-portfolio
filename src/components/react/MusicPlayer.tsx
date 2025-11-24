import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { currentTheme, getThemeAssetPath } from '../../store/theme-store';
import {
  isMusicEnabled,
  musicVolume,
  isPlaying,
  enableMusic,
  togglePlayback,
  pauseMusic,
  playMusic,
} from '../../store/music-store';
import { Music, Pause } from 'lucide-react';

/**
 * MusicPlayer Component
 * 
 * Simple music toggle button - click to play/pause background music.
 * Music is per-theme and requires user interaction to start.
 */
export const MusicPlayer: React.FC = () => {
  const theme = useStore(currentTheme);
  const enabled = useStore(isMusicEnabled);
  const volume = useStore(musicVolume);
  const playing = useStore(isPlaying);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get music path from theme
  const musicPath = theme.assets.music ? getThemeAssetPath(theme.assets.music) : null;

  useEffect(() => {
    if (!musicPath) return;

    const audio = new Audio(musicPath);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [musicPath]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current || !musicPath) return;

    const wasPlaying = playing;
    const currentTime = audioRef.current.currentTime;
    
    audioRef.current.pause();
    audioRef.current.src = musicPath;
    audioRef.current.load();
    
    audioRef.current.addEventListener('loadedmetadata', () => {
      if (wasPlaying && enabled) {
        audioRef.current.currentTime = Math.min(currentTime, audioRef.current.duration);
        audioRef.current.play().catch(() => {
          pauseMusic();
        });
      }
    }, { once: true });
  }, [theme.id]);

  useEffect(() => {
    if (!audioRef.current || !enabled) return;

    if (playing) {
      audioRef.current.play().catch((error) => {
        console.error('Failed to play music:', error);
        pauseMusic();
      });
    } else {
      audioRef.current.pause();
    }
  }, [playing, enabled]);

  const handleClick = () => {
    if (!enabled) {
      enableMusic(volume);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch((error) => {
            console.error('Failed to play music:', error);
          });
        }
        playMusic();
      }, 50);
    } else {
      togglePlayback();
    }
  };

  if (!musicPath) return null;

  return (
    <button
      onClick={handleClick}
      className="p-1 sm:p-1.5 border-2 border-neon bg-os-black hover:bg-neon/20 transition-all duration-200 flex items-center justify-center"
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      {playing ? (
        <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-neon" />
      ) : (
        <Music className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-neon" />
      )}
    </button>
  );
};

