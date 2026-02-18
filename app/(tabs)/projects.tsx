import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBadge } from '../../src/components/StatusBadge';
import { ProgressBar } from '../../src/components/ProgressBar';
import { colors, spacing, borderRadius, typography } from '../../src/theme/colors';
import { projects } from '../../src/data/mockData';

type Filter = 'all' | 'active' | 'planning' | 'on-hold' | 'completed';

function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`;
  return `$${amount}`;
}

function getBudgetColor(spent: number, budget: number): string {
  const ratio = spent / budget;
  if (ratio > 0.9) return colors.danger;
  if (ratio > 0.7) return colors.warning;
  return colors.success;
}

export default function ProjectsScreen() {
  const [filter, setFilter] = useState<Filter>('all');
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const filtered = filter === 'all' ? projects : projects.filter(p => p.status === filter);

  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Stats */}
      <View style={[styles.statsRow, isWide && styles.statsRowWide]}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.primary + '15' }]}>
            <Ionicons name="briefcase" size={20} color={colors.primary} />
          </View>
          <Text style={styles.statValue}>{projects.length}</Text>
          <Text style={styles.statLabel}>Total Projects</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.success + '15' }]}>
            <Ionicons name="cash" size={20} color={colors.success} />
          </View>
          <Text style={styles.statValue}>{formatCurrency(totalBudget)}</Text>
          <Text style={styles.statLabel}>Total Budget</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.accent + '15' }]}>
            <Ionicons name="wallet" size={20} color={colors.accent} />
          </View>
          <Text style={styles.statValue}>{formatCurrency(totalSpent)}</Text>
          <Text style={styles.statLabel}>Total Spent</Text>
        </View>
      </View>

      {/* Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {(['all', 'active', 'planning', 'on-hold', 'completed'] as Filter[]).map(f => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? 'All' : f === 'on-hold' ? 'On Hold' : f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Project Cards */}
      <View style={styles.list}>
        {filtered.map(project => (
          <View key={project.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{project.name}</Text>
                <Text style={styles.cardSubtitle}>{project.clientName}</Text>
              </View>
              <StatusBadge status={project.status} />
            </View>

            {/* Progress */}
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Progress</Text>
                <Text style={styles.progressValue}>{project.progress}%</Text>
              </View>
              <ProgressBar
                progress={project.progress}
                color={project.progress >= 75 ? colors.success : project.progress >= 40 ? colors.primary : colors.info}
                height={8}
              />
            </View>

            {/* Budget */}
            <View style={styles.budgetSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Budget Usage</Text>
                <Text style={[styles.progressValue, { color: getBudgetColor(project.spent, project.budget) }]}>
                  {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                </Text>
              </View>
              <ProgressBar
                progress={(project.spent / project.budget) * 100}
                color={getBudgetColor(project.spent, project.budget)}
                height={8}
              />
            </View>

            {/* Meta */}
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.metaText}>{project.startDate} - {project.endDate}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="people-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.metaText}>{project.teamSize} members</Text>
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
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statsRowWide: {
    flexWrap: 'nowrap',
  },
  statCard: {
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
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    ...typography.h3,
    color: colors.text,
  },
  statLabel: {
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  cardTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
  cardSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  progressSection: {
    gap: spacing.xs,
  },
  budgetSection: {
    gap: spacing.xs,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  progressValue: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    ...typography.small,
    color: colors.textSecondary,
  },
});
