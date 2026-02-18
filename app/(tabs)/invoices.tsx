import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBadge } from '../../src/components/StatusBadge';
import { colors, spacing, borderRadius, typography } from '../../src/theme/colors';
import { invoices } from '../../src/data/mockData';

type Filter = 'all' | 'paid' | 'pending' | 'overdue' | 'draft';

function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`;
  return `$${amount}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function InvoicesScreen() {
  const [filter, setFilter] = useState<Filter>('all');
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const filtered = filter === 'all' ? invoices : invoices.filter(i => i.status === filter);

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);
  const totalDraft = invoices.filter(i => i.status === 'draft').reduce((s, i) => s + i.amount, 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Summary */}
      <View style={[styles.summaryRow, isWide && styles.summaryRowWide]}>
        <View style={[styles.summaryCard, { borderLeftColor: colors.success, borderLeftWidth: 4 }]}>
          <Text style={[styles.summaryValue, { color: colors.success }]}>{formatCurrency(totalPaid)}</Text>
          <Text style={styles.summaryLabel}>Paid</Text>
        </View>
        <View style={[styles.summaryCard, { borderLeftColor: '#E67E22', borderLeftWidth: 4 }]}>
          <Text style={[styles.summaryValue, { color: '#E67E22' }]}>{formatCurrency(totalPending)}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
        <View style={[styles.summaryCard, { borderLeftColor: colors.danger, borderLeftWidth: 4 }]}>
          <Text style={[styles.summaryValue, { color: colors.danger }]}>{formatCurrency(totalOverdue)}</Text>
          <Text style={styles.summaryLabel}>Overdue</Text>
        </View>
        <View style={[styles.summaryCard, { borderLeftColor: colors.textTertiary, borderLeftWidth: 4 }]}>
          <Text style={[styles.summaryValue, { color: colors.textSecondary }]}>{formatCurrency(totalDraft)}</Text>
          <Text style={styles.summaryLabel}>Draft</Text>
        </View>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {(['all', 'paid', 'pending', 'overdue', 'draft'] as Filter[]).map(f => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? `All (${invoices.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${invoices.filter(i => i.status === f).length})`}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Invoice List */}
      <View style={styles.list}>
        {filtered.map(inv => (
          <View key={inv.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={{ flex: 1 }}>
                <View style={styles.invoiceHeaderRow}>
                  <Text style={styles.invoiceNumber}>{inv.invoiceNumber}</Text>
                  <StatusBadge status={inv.status} />
                </View>
                <Text style={styles.clientName}>{inv.clientName}</Text>
                <Text style={styles.projectName}>{inv.projectName}</Text>
              </View>
            </View>

            <View style={styles.cardBottom}>
              <View style={styles.dateRow}>
                <View style={styles.dateItem}>
                  <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
                  <Text style={styles.dateLabel}>Issued:</Text>
                  <Text style={styles.dateValue}>{formatDate(inv.issueDate)}</Text>
                </View>
                <View style={styles.dateItem}>
                  <Ionicons name="alarm-outline" size={14} color={inv.status === 'overdue' ? colors.danger : colors.textSecondary} />
                  <Text style={[styles.dateLabel, inv.status === 'overdue' && { color: colors.danger }]}>Due:</Text>
                  <Text style={[styles.dateValue, inv.status === 'overdue' && { color: colors.danger }]}>{formatDate(inv.dueDate)}</Text>
                </View>
              </View>
              <Text style={styles.amount}>{formatCurrency(inv.amount)}</Text>
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
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryValue: {
    ...typography.h3,
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  cardTop: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  invoiceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  invoiceNumber: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  clientName: {
    ...typography.body,
    color: colors.text,
  },
  projectName: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  dateRow: {
    gap: spacing.xs,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dateLabel: {
    ...typography.small,
    color: colors.textSecondary,
  },
  dateValue: {
    ...typography.small,
    color: colors.text,
    fontWeight: '500',
  },
  amount: {
    ...typography.h2,
    color: colors.text,
  },
});
