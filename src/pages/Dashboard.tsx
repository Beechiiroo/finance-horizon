import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { CashFlowChart } from '@/components/dashboard/CashFlowChart';
import { ExpensesByCategoryChart } from '@/components/dashboard/ExpensesByCategoryChart';
import { RevenueDistributionChart } from '@/components/dashboard/RevenueDistributionChart';
import { DateFilter } from '@/components/dashboard/DateFilter';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { kpiData } from '@/data/mockData';
import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');

  return (
    <MainLayout title="Finance Dashboard" subtitle="Overview of your financial performance">
      {/* Date Filter */}
      <div className="flex justify-end mb-6">
        <DateFilter selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Revenue"
          value={kpiData.totalRevenue}
          change={kpiData.revenueChange}
          icon={DollarSign}
          variant="primary"
          delay={0}
        />
        <KPICard
          title="Total Expenses"
          value={kpiData.totalExpenses}
          change={kpiData.expensesChange}
          icon={TrendingDown}
          variant="destructive"
          delay={1}
        />
        <KPICard
          title="Net Profit"
          value={kpiData.netProfit}
          change={kpiData.profitChange}
          icon={TrendingUp}
          variant="success"
          delay={2}
        />
        <KPICard
          title="Cash Balance"
          value={kpiData.cashBalance}
          change={kpiData.cashChange}
          icon={Wallet}
          variant="warning"
          delay={3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CashFlowChart />
        <RecentTransactions />
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpensesByCategoryChart />
        <RevenueDistributionChart />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
