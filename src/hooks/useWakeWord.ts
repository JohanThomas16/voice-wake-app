import { useState, useEffect, useRef } from 'react';
import { PorcupineManager, BuiltInKeywords } from '@picovoice/porcupine-react-native';
import { PICOVOICE_ACCESS_KEY, WAKE_WORDS } from '../utils/constants';

export function useWakeWord() {
  const [isListening, setIsListening] = useState(false);
  const [isAwake, setIsAwake] = useState(false);
  const porcupineManager = useRef<PorcupineManager | null>(null);

  useEffect(() => {
    return () => {
      stopWakeWord();
    };
  }, []);

  async function initializeWakeWord() {
    try {
      if (porcupineManager.current) {
        await porcupineManager.current.start();
        setIsListening(true);
        return;
      }
      const callback = (keywordIndex: number) => {
        // Called when wake word detected
        setIsAwake(true);
      };
      const manager = await PorcupineManager.fromBuiltInKeywords(
        PICOVOICE_ACCESS_KEY,
        WAKE_WORDS.map(word => BuiltInKeywords[word]),
        callback
      );
      porcupineManager.current = manager;
      await manager.start();
      setIsListening(true);
    } catch (err) {
      console.error('Error while initializing Porcupine:', err);
      setIsListening(false);
    }
  }

  async function stopWakeWord() {
    if (porcupineManager.current) {
      await porcupineManager.current.stop();
      await porcupineManager.current.delete();
      porcupineManager.current = null;
    }
    setIsListening(false);
    setIsAwake(false);
  }

  function resetAwake() {
    setIsAwake(false);
  }

  return {
    isListening,
    isAwake,
    initializeWakeWord,
    stopWakeWord,
    resetAwake,
  };
}
