import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme/colors';

type StatusType = 'active' | 'prospect' | 'inactive' | 'planning' | 'on-hold' | 'completed' | 'paid' | 'pending' | 'overdue' | 'draft' | 'available' | 'busy' | 'away';

const statusConfig: Record<StatusType, { bg: string; text: string; label: string }> = {
  active: { bg: colors.success + '18', text: colors.success, label: 'Active' },
  prospect: { bg: colors.info + '18', text: colors.info, label: 'Prospect' },
  inactive: { bg: colors.textTertiary + '18', text: colors.textSecondary, label: 'Inactive' },
  planning: { bg: colors.info + '18', text: colors.info, label: 'Planning' },
  'on-hold': { bg: colors.warning + '18', text: '#E67E22', label: 'On Hold' },
  completed: { bg: colors.success + '18', text: colors.success, label: 'Completed' },
  paid: { bg: colors.success + '18', text: colors.success, label: 'Paid' },
  pending: { bg: colors.warning + '18', text: '#E67E22', label: 'Pending' },
  overdue: { bg: colors.danger + '18', text: colors.danger, label: 'Overdue' },
  draft: { bg: colors.textTertiary + '18', text: colors.textSecondary, label: 'Draft' },
  available: { bg: colors.success + '18', text: colors.success, label: 'Available' },
  busy: { bg: colors.danger + '18', text: colors.danger, label: 'Busy' },
  away: { bg: colors.warning + '18', text: '#E67E22', label: 'Away' },
};

export function StatusBadge({ status }: { status: StatusType }) {
  const config = statusConfig[status] || statusConfig.inactive;
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <View style={[styles.dot, { backgroundColor: config.text }]} />
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: spacing.xs + 2,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    ...typography.small,
    textTransform: 'capitalize',
  },
});
