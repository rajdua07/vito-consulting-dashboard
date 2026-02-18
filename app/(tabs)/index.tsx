import React from 'react';
import { View, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KPICard } from '../../src/components/KPICard';
import { BarChart } from '../../src/components/BarChart';
import { SectionHeader } from '../../src/components/SectionHeader';
import { StatusBadge } from '../../src/components/StatusBadge';
import { ProgressBar } from '../../src/components/ProgressBar';
import { Avatar } from '../../src/components/Avatar';
import { colors, spacing, borderRadius, typography } from '../../src/theme/colors';
import { kpis, revenueByMonth, revenueByIndustry, projects, invoices } from '../../src/data/mockData';
import { Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`;
  return `$${amount}`;
}

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const router = useRouter();

  const activeProjects = projects.filter(p => p.status === 'active').slice(0, 4);
  const recentInvoices = invoices.filter(p => p.status === 'pending' || p.status === 'overdue').slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* KPI Cards */}
      <View style={[styles.kpiGrid, isWide && styles.kpiGridWide]}>
        <KPICard
          title="Total Revenue"
          value={formatCurrency(kpis.totalRevenue)}
          icon="trending-up"
          iconColor={colors.success}
          trend={{ value: kpis.revenueGrowth, label: 'vs last quarter' }}
        />
        <KPICard
          title="Active Projects"
          value={`${kpis.activeProjects}`}
          subtitle={`${kpis.completedProjects} completed`}
          icon="briefcase"
          iconColor={colors.primary}
        />
        <KPICard
          title="Team Utilization"
          value={`${kpis.teamUtilization}%`}
          subtitle="8 team members"
          icon="people"
          iconColor={colors.accent}
        />
        <KPICard
          title="Outstanding"
          value={formatCurrency(kpis.outstandingInvoices)}
          subtitle="3 invoices"
          icon="receipt"
          iconColor={colors.warning}
        />
      </View>

      {/* Charts Row */}
      <View style={[styles.chartsRow, isWide && styles.chartsRowWide]}>
        <View style={isWide ? styles.chartHalf : undefined}>
          <BarChart
            data={revenueByMonth.map(d => ({ label: d.month, value: d.revenue, color: colors.primary }))}
            title="Revenue Trend"
          />
        </View>
        <View style={isWide ? styles.chartHalf : undefined}>
          <BarChart
            data={revenueByIndustry.map(d => ({ label: d.industry.slice(0, 5), value: d.revenue, color: d.color }))}
            title="Revenue by Industry"
          />
        </View>
      </View>

      {/* Active Projects */}
      <View style={styles.section}>
        <SectionHeader title="Active Projects" actionLabel="View All" onAction={() => router.push('/projects')} />
        <View style={[styles.listContainer]}>
          {activeProjects.map(project => (
            <View key={project.id} style={styles.projectCard}>
              <View style={styles.projectHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectClient}>{project.clientName}</Text>
                </View>
                <StatusBadge status={project.status} />
              </View>
              <View style={styles.projectProgress}>
                <View style={styles.progressRow}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <Text style={styles.progressValue}>{project.progress}%</Text>
                </View>
                <ProgressBar
                  progress={project.progress}
                  color={project.progress >= 75 ? colors.success : project.progress >= 40 ? colors.primary : colors.info}
                />
              </View>
              <View style={styles.projectMeta}>
                <Text style={styles.metaText}>Budget: {formatCurrency(project.budget)}</Text>
                <Text style={styles.metaText}>Spent: {formatCurrency(project.spent)}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Pending Invoices */}
      <View style={styles.section}>
        <SectionHeader title="Attention Needed" actionLabel="All Invoices" onAction={() => router.push('/invoices')} />
        <View style={styles.listContainer}>
          {recentInvoices.map(inv => (
            <View key={inv.id} style={styles.invoiceRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.invoiceNumber}>{inv.invoiceNumber}</Text>
                <Text style={styles.invoiceClient}>{inv.clientName}</Text>
              </View>
              <View style={styles.invoiceRight}>
                <Text style={styles.invoiceAmount}>{formatCurrency(inv.amount)}</Text>
                <StatusBadge status={inv.status} />
              </View>
            </View>
          ))}
        </View>
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
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  kpiGridWide: {
    flexWrap: 'nowrap',
  },
  chartsRow: {
    gap: spacing.md,
  },
  chartsRowWide: {
    flexDirection: 'row',
  },
  chartHalf: {
    flex: 1,
  },
  section: {},
  listContainer: {
    gap: spacing.sm,
  },
  projectCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  projectName: {
    ...typography.bodyBold,
    color: colors.text,
  },
  projectClient: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  projectProgress: {
    gap: spacing.xs,
  },
  progressRow: {
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
  projectMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  invoiceRow: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  invoiceNumber: {
    ...typography.bodyBold,
    color: colors.text,
  },
  invoiceClient: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  invoiceRight: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  invoiceAmount: {
    ...typography.bodyBold,
    color: colors.text,
  },
});
