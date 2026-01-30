import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatusBadge } from '@/components/common/StatusBadge';
import { budgets, Budget } from '@/data/mockData';
import { 
  Plus, 
  AlertTriangle, 
  TrendingUp,
  Wallet,
  Target,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

const Budgets = () => {
  const [budgetList, setBudgetList] = useState(budgets);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stats
  const totalAllocated = budgetList.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgetList.reduce((sum, b) => sum + b.spent, 0);
  const exceeded = budgetList.filter((b) => b.status === 'exceeded').length;

  // Chart data
  const chartData = budgetList.map((b) => ({
    category: b.category,
    allocated: b.allocated,
    spent: b.spent,
  }));

  return (
    <MainLayout title="Budget Management" subtitle="Track and manage departmental budgets">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border border-border p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Total Allocated</span>
          </div>
          <p className="text-2xl font-bold tabular-nums">${totalAllocated.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-warning" />
            </div>
            <span className="text-sm text-muted-foreground">Total Spent</span>
          </div>
          <p className="text-2xl font-bold tabular-nums">${totalSpent.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <span className="text-sm text-muted-foreground">Utilization</span>
          </div>
          <p className="text-2xl font-bold tabular-nums">
            {((totalSpent / totalAllocated) * 100).toFixed(1)}%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border border-border p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <span className="text-sm text-muted-foreground">Exceeded</span>
          </div>
          <p className="text-2xl font-bold">{exceeded} Budgets</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget vs Actual Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Budget vs Actual</h3>
              <p className="text-sm text-muted-foreground">Comparison by category</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-1" />
                <span className="text-sm text-muted-foreground">Allocated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-3" />
                <span className="text-sm text-muted-foreground">Spent</span>
              </div>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={75}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Bar dataKey="allocated" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                <Bar dataKey="spent" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Budget List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Budget Overview</h3>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium gradient-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/25"
            >
              <Plus className="w-4 h-4" />
              Add Budget
            </motion.button>
          </div>

          <div className="space-y-4">
            {budgetList.map((budget, index) => (
              <BudgetCard key={budget.id} budget={budget} index={index} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Alerts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <h3 className="text-lg font-semibold mb-4">Alerts & Notifications</h3>
        <div className="space-y-3">
          {budgetList
            .filter((b) => b.status !== 'on-track')
            .map((budget, index) => (
              <motion.div
                key={budget.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border",
                  budget.status === 'exceeded'
                    ? "bg-destructive/5 border-destructive/20"
                    : "bg-warning/5 border-warning/20"
                )}
              >
                <AlertTriangle
                  className={cn(
                    "w-5 h-5",
                    budget.status === 'exceeded' ? "text-destructive" : "text-warning"
                  )}
                />
                <div className="flex-1">
                  <p className="font-medium">
                    {budget.category} budget {budget.status === 'exceeded' ? 'exceeded' : 'nearing limit'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {budget.status === 'exceeded'
                      ? `Over by $${Math.abs(budget.remaining).toLocaleString()}`
                      : `Only $${budget.remaining.toLocaleString()} remaining`}
                  </p>
                </div>
                <StatusBadge status={budget.status} size="sm" />
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <BudgetModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

interface BudgetCardProps {
  budget: Budget;
  index: number;
}

function BudgetCard({ budget, index }: BudgetCardProps) {
  const percentage = (budget.spent / budget.allocated) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-medium">{budget.category}</p>
          <p className="text-xs text-muted-foreground">{budget.period}</p>
        </div>
        <StatusBadge status={budget.status} size="sm" />
      </div>

      <div className="mb-2">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 1, delay: index * 0.1 }}
            className={cn(
              "h-full rounded-full",
              budget.status === 'on-track' ? "bg-success" :
              budget.status === 'warning' ? "bg-warning" : "bg-destructive"
            )}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          ${budget.spent.toLocaleString()} / ${budget.allocated.toLocaleString()}
        </span>
        <span
          className={cn(
            "font-medium tabular-nums",
            budget.status === 'on-track' ? "text-success" :
            budget.status === 'warning' ? "text-warning" : "text-destructive"
          )}
        >
          {percentage.toFixed(1)}%
        </span>
      </div>
    </motion.div>
  );
}

function BudgetModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    category: '',
    allocated: '',
    period: 'Q1 2024',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-2xl z-50 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Create New Budget</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Marketing"
                className="w-full h-11 px-4 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Allocated Amount</label>
              <input
                type="number"
                value={formData.allocated}
                onChange={(e) => setFormData({ ...formData, allocated: e.target.value })}
                placeholder="0.00"
                className="w-full h-11 px-4 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Period</label>
              <select
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="w-full h-11 px-4 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="Q1 2024">Q1 2024</option>
                <option value="Q2 2024">Q2 2024</option>
                <option value="Q3 2024">Q3 2024</option>
                <option value="Q4 2024">Q4 2024</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 border border-border rounded-xl font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 h-11 gradient-primary text-primary-foreground rounded-xl font-medium shadow-lg shadow-primary/25"
              >
                Create Budget
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default Budgets;
