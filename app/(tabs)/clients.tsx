import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../src/components/Avatar';
import { StatusBadge } from '../../src/components/StatusBadge';
import { colors, spacing, borderRadius, typography } from '../../src/theme/colors';
import { clients } from '../../src/data/mockData';

type Filter = 'all' | 'active' | 'prospect' | 'inactive';

function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`;
  return `$${amount}`;
}

export default function ClientsScreen() {
  const [filter, setFilter] = useState<Filter>('all');
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const filtered = filter === 'all' ? clients : clients.filter(c => c.status === filter);

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    prospects: clients.filter(c => c.status === 'prospect').length,
    totalRevenue: clients.reduce((sum, c) => sum + c.revenue, 0),
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Summary Cards */}
      <View style={[styles.summaryRow, isWide && styles.summaryRowWide]}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{stats.total}</Text>
          <Text style={styles.summaryLabel}>Total Clients</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryValue, { color: colors.success }]}>{stats.active}</Text>
          <Text style={styles.summaryLabel}>Active</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryValue, { color: colors.info }]}>{stats.prospects}</Text>
          <Text style={styles.summaryLabel}>Prospects</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>{formatCurrency(stats.totalRevenue)}</Text>
          <Text style={styles.summaryLabel}>Total Revenue</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(['all', 'active', 'prospect', 'inactive'] as Filter[]).map(f => (
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

      {/* Client List */}
      <View style={styles.list}>
        {filtered.map(client => (
          <View key={client.id} style={styles.clientCard}>
            <View style={styles.clientHeader}>
              <Avatar name={client.name} color={client.avatarColor} size={48} />
              <View style={styles.clientInfo}>
                <Text style={styles.clientName}>{client.name}</Text>
                <Text style={styles.clientIndustry}>{client.industry}</Text>
              </View>
              <StatusBadge status={client.status} />
            </View>

            <View style={styles.clientDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="person-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.detailText}>{client.contactName}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="mail-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.detailText}>{client.contactEmail}</Text>
              </View>
            </View>

            <View style={styles.clientFooter}>
              <View style={styles.footerItem}>
                <Text style={styles.footerValue}>{formatCurrency(client.revenue)}</Text>
                <Text style={styles.footerLabel}>Revenue</Text>
              </View>
              <View style={styles.footerDivider} />
              <View style={styles.footerItem}>
                <Text style={styles.footerValue}>{client.projectCount}</Text>
                <Text style={styles.footerLabel}>Projects</Text>
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
    minWidth: 140,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryValue: {
    ...typography.h2,
    color: colors.text,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
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
  clientCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  clientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    ...typography.bodyBold,
    color: colors.text,
  },
  clientIndustry: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  clientDetails: {
    gap: spacing.xs,
    paddingLeft: spacing.xxl + spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  clientFooter: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerValue: {
    ...typography.bodyBold,
    color: colors.text,
  },
  footerLabel: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  footerDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
});
