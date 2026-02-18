import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, borderRadius } from '../theme/colors';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  backgroundColor?: string;
}

export function ProgressBar({
  progress,
  color = colors.primary,
  height = 6,
  backgroundColor = colors.borderLight,
}: ProgressBarProps) {
  return (
    <View style={[styles.track, { height, backgroundColor, borderRadius: height / 2 }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${Math.min(100, Math.max(0, progress))}%`,
            backgroundColor: color,
            height,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {},
});
