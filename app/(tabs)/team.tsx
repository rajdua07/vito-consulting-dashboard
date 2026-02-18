import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../src/components/Avatar';
import { StatusBadge } from '../../src/components/StatusBadge';
import { ProgressBar } from '../../src/components/ProgressBar';
import { colors, spacing, borderRadius, typography } from '../../src/theme/colors';
import { team } from '../../src/data/mockData';

type Filter = 'all' | 'available' | 'busy' | 'away';

function getUtilizationColor(util: number): string {
  if (util >= 90) return colors.danger;
  if (util >= 70) return colors.warning;
  if (util >= 40) return colors.success;
  return colors.info;
}

export default function TeamScreen() {
  const [filter, setFilter] = useState<Filter>('all');
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const filtered = filter === 'all' ? team : team.filter(m => m.status === filter);

  const avgUtil = Math.round(team.reduce((s, m) => s + m.utilization, 0) / team.length);
  const availableCount = team.filter(m => m.status === 'available').length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Summary */}
      <View style={[styles.summaryRow, isWide && styles.summaryRowWide]}>
        <View style={styles.summaryCard}>
          <View style={[styles.summaryIcon, { backgroundColor: colors.primary + '15' }]}>
            <Ionicons name="people" size={22} color={colors.primary} />
          </View>
          <Text style={styles.summaryValue}>{team.length}</Text>
          <Text style={styles.summaryLabel}>Team Members</Text>
        </View>
        <View style={styles.summaryCard}>
          <View style={[styles.summaryIcon, { backgroundColor: colors.success + '15' }]}>
            <Ionicons name="checkmark-circle" size={22} color={colors.success} />
          </View>
          <Text style={[styles.summaryValue, { color: colors.success }]}>{availableCount}</Text>
          <Text style={styles.summaryLabel}>Available</Text>
        </View>
        <View style={styles.summaryCard}>
          <View style={[styles.summaryIcon, { backgroundColor: colors.accent + '15' }]}>
            <Ionicons name="speedometer" size={22} color={colors.accent} />
          </View>
          <Text style={[styles.summaryValue, { color: colors.accent }]}>{avgUtil}%</Text>
          <Text style={styles.summaryLabel}>Avg Utilization</Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        {(['all', 'available', 'busy', 'away'] as Filter[]).map(f => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Team List */}
      <View style={styles.list}>
        {filtered.map(member => (
          <View key={member.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Avatar name={member.name} color={member.avatarColor} size={52} />
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
                <Text style={styles.memberDept}>{member.department}</Text>
              </View>
              <StatusBadge status={member.status} />
            </View>

            <View style={styles.utilSection}>
              <View style={styles.utilHeader}>
                <Text style={styles.utilLabel}>Utilization</Text>
                <Text style={[styles.utilValue, { color: getUtilizationColor(member.utilization) }]}>
                  {member.utilization}%
                </Text>
              </View>
              <ProgressBar
                progress={member.utilization}
                color={getUtilizationColor(member.utilization)}
                height={8}
              />
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.footerItem}>
                <Ionicons name="briefcase-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.footerText}>{member.activeProjects} active projects</Text>
              </View>
              <View style={styles.footerItem}>
                <Ionicons name="mail-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.footerText}>{member.email}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  summaryRowWide: {
    flexWrap: 'nowrap',
  },
  summaryCard: {
    flex: 1,
    minWidth: 120,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryValue: {
    ...typography.h2,
    color: colors.text,
  },
  summaryLabel: {
    ...typography.small,
    color: colors.textSecondary,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  filterTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.textOnPrimary,
    fontWeight: '600',
  },
  list: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    ...typography.bodyBold,
    color: colors.text,
  },
  memberRole: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  memberDept: {
    ...typography.small,
    color: colors.textTertiary,
    marginTop: 1,
  },
  utilSection: {
    gap: spacing.xs,
  },
  utilHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  utilLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  utilValue: {
    ...typography.caption,
    fontWeight: '600',
  },
  cardFooter: {
    gap: spacing.xs,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  footerText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
