'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

interface Props {
  text: string;
  autoPlay?: boolean;
}

export default function TTSPlayer({ text, autoPlay = false }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setIsSupported(true);

      // Load voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  useEffect(() => {
    if (autoPlay && isSupported) {
      playTTS();
    }
  }, [autoPlay, isSupported]);

  const playTTS = () => {
    if (!isSupported || !text) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Use first English voice if available
    const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopTTS = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={isPlaying ? stopTTS : playTTS}
      className={`p-1 rounded hover:bg-gray-200 transition-colors ${
        isPlaying ? 'text-blue-500' : 'text-gray-500'
      }`}
      title={isPlaying ? 'Stop speaking' : 'Read aloud'}
    >
      {isPlaying ? <Loader2 size={16} className="animate-spin" /> : <Volume2 size={16} />}
    </button>
  );
}
