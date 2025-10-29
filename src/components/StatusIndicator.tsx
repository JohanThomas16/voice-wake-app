import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

interface StatusIndicatorProps {
  status: 'idle' | 'listening' | 'awake' | 'processing' | 'result' | 'error';
}

const colorMap: Record<string, string> = {
  idle: '#6B7280',
  listening: '#3B82F6',
  awake: '#10B981',
  processing: '#F59E0B',
  result: '#8B5CF6',
  error: '#EF4444',
};

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const bgColor = colorMap[status] || colorMap.idle;

  return (
    <View style={[styles.circle, { backgroundColor: bgColor }]}>
      {status === 'processing' && <ActivityIndicator size="large" color="white" />}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
