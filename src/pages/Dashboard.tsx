import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { CashFlowChart } from '@/components/dashboard/CashFlowChart';
import { ExpensesByCategoryChart } from '@/components/dashboard/ExpensesByCategoryChart';
import { RevenueDistributionChart } from '@/components/dashboard/RevenueDistributionChart';
import { DateFilter } from '@/components/dashboard/DateFilter';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { PredictionsWidget } from '@/components/predictions/PredictionsWidget';
import { kpiData } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const { t } = useLanguage();

  return (
    <MainLayout title={t('dashboard.title')} subtitle={t('dashboard.subtitle')}>
      {/* Date Filter */}
      <div className="flex justify-end mb-6">
        <DateFilter selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title={t('dashboard.totalRevenue')}
          value={kpiData.totalRevenue}
          change={kpiData.revenueChange}
          icon={DollarSign}
          variant="primary"
          delay={0}
        />
        <KPICard
          title={t('dashboard.totalExpenses')}
          value={kpiData.totalExpenses}
          change={kpiData.expensesChange}
          icon={TrendingDown}
          variant="destructive"
          delay={1}
        />
        <KPICard
          title={t('dashboard.netProfit')}
          value={kpiData.netProfit}
          change={kpiData.profitChange}
          icon={TrendingUp}
          variant="success"
          delay={2}
        />
        <KPICard
          title={t('dashboard.cashBalance')}
          value={kpiData.cashBalance}
          change={kpiData.cashChange}
          icon={Wallet}
          variant="warning"
          delay={3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <CashFlowChart />
        </div>
        <PredictionsWidget />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RecentTransactions />
        <ExpensesByCategoryChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6">
        <RevenueDistributionChart />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
