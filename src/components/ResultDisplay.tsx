import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ResultDisplayProps {
  text: string;
}

export function ResultDisplay({ text }: ResultDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>You said:</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDE9FE',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B21A8',
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#581C87',
  },
});
