import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useWakeWord } from './hooks/useWakeWord';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import { usePermissions } from './hooks/usePermissions';
import { useAppStore } from './store/appStore';

import { StatusIndicator } from './components/StatusIndicator';
import { ResultDisplay } from './components/ResultDisplay';
import { VoiceInstructions } from './components/VoiceInstructions';

const App = () => {
  const { micPermissionGranted, requestPermissions } = usePermissions();

  const {
    isListening,
    isAwake,
    initializeWakeWord,
    stopWakeWord,
    resetAwake,
  } = useWakeWord();

  const {
    isRecording,
    recognizedText,
    error: voiceError,
    startRecording,
    stopRecording,
  } = useVoiceRecognition();

  const {
    currentState,
    resultText,
    errorMessage,
    setState,
    setResult,
    setError,
    reset,
  } = useAppStore();

  // Request permission on mount
  useEffect(() => {
    if (!micPermissionGranted) {
      requestPermissions();
    }
  }, [micPermissionGranted]);

  // Initialize wake word detection after permission granted
  useEffect(() => {
    if (micPermissionGranted) {
      initializeWakeWord();
      setState('listening');
    }
    return () => {
      stopWakeWord();
    };
  }, [micPermissionGranted]);

  // When wake word is detected, start voice recording
  useEffect(() => {
    if (isAwake && currentState !== 'processing') {
      setState('awake');
      startRecording();
    }
  }, [isAwake]);

  // When voice recording completes with text
  useEffect(() => {
    if (recognizedText.length > 0 && !isRecording) {
      setState('processing');
      setTimeout(() => {
        setResult(recognizedText);
      }, 500);
    }
  }, [recognizedText, isRecording]);

  // Handle voice errors
  useEffect(() => {
    if (voiceError) {
      setError(voiceError);
    }
  }, [voiceError]);

  const onTryAgain = () => {
    reset();
    resetAwake();
    setState('listening');
  };

  const getStatusText = () => {
    switch (currentState) {
      case 'idle':
        return 'Not started';
      case 'listening':
        return 'Listening for wake word...';
      case 'awake':
        return 'Wake word detected! Speak now...';
      case 'processing':
        return 'Processing your input...';
      case 'result':
        return 'Result';
      case 'error':
        return 'Error occurred';
      default:
        return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Voice Wake-Word App</Text>
        <StatusIndicator status={currentState} />
        <Text style={styles.statusText}>{getStatusText()}</Text>

        {currentState === 'result' && <ResultDisplay text={resultText} />}

        {currentState === 'error' && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        {(currentState === 'result' || currentState === 'error') && (
          <TouchableOpacity style={styles.button} onPress={onTryAgain}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        )}

        <VoiceInstructions />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 40,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 24,
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
  },
  errorText: {
    color: '#991B1B',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 32,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
