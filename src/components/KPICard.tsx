import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography } from '../theme/colors';

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  trend?: { value: number; label: string };
}

export function KPICard({ title, value, subtitle, icon, iconColor = colors.primary, trend }: KPICardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '15' }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        {trend && (
          <View style={[styles.trendBadge, { backgroundColor: trend.value >= 0 ? colors.success + '15' : colors.danger + '15' }]}>
            <Ionicons
              name={trend.value >= 0 ? 'trending-up' : 'trending-down'}
              size={12}
              color={trend.value >= 0 ? colors.success : colors.danger}
            />
            <Text style={[styles.trendText, { color: trend.value >= 0 ? colors.success : colors.danger }]}>
              {Math.abs(trend.value)}%
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    minWidth: 160,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    gap: 2,
  },
  trendText: {
    ...typography.small,
  },
  value: {
    ...typography.h2,
    color: colors.text,
    marginBottom: 2,
  },
  title: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  subtitle: {
    ...typography.small,
    color: colors.textTertiary,
    marginTop: 2,
  },
});
