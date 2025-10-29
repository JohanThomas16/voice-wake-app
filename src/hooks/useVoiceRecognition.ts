import { useState, useEffect } from 'react';
import Voice from '@react-native-voice/voice';

export function useVoiceRecognition() {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Voice.onSpeechStart = () => {
      setIsRecording(true);
      setError(null);
    };
    Voice.onSpeechEnd = () => {
      setIsRecording(false);
    };
    Voice.onSpeechResults = (e) => {
      if (e.value && e.value.length > 0) {
        setRecognizedText(e.value[0]);
      }
    };
    Voice.onSpeechError = (e) => {
      setError(e.error?.message || 'Unknown speech recognition error');
      setIsRecording(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  async function startRecording() {
    try {
      setRecognizedText('');
      setError(null);
      await Voice.start('en-US');
    } catch (err) {
      setError('Failed to start recording');
      console.error('Voice start error:', err);
    }
  }

  async function stopRecording() {
    try {
      await Voice.stop();
    } catch (err) {
      console.error('Voice stop error:', err);
    }
  }

  return {
    isRecording,
    recognizedText,
    error,
    startRecording,
    stopRecording,
  };
}
