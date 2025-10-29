import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function VoiceInstructions() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instructions:</Text>
      <Text style={styles.text}>
        1. Say "Porcupine" (or your custom wake word){"\n"}
        2. Wait for the green indicator{"\n"}
        3. Speak your command clearly{"\n"}
        4. View the recognized text
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
});
