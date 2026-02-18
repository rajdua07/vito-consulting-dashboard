import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme/colors';

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  title: string;
  formatValue?: (v: number) => string;
}

export function BarChart({ data, title, formatValue = (v) => `$${(v / 1000).toFixed(0)}k` }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chart}>
        {data.map((item, index) => (
          <View key={index} style={styles.barGroup}>
            <Text style={styles.barValue}>{formatValue(item.value)}</Text>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.bar,
                  {
                    height: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color || colors.primary,
                  },
                ]}
              />
            </View>
            <Text style={styles.barLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 180,
    gap: spacing.sm,
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barValue: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  barTrack: {
    width: '60%',
    maxWidth: 40,
    flex: 1,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: borderRadius.sm,
    minHeight: 4,
  },
  barLabel: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
