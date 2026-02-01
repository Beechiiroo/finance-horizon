import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  LineChart, 
  FileText, 
  Brain, 
  UserCog,
  Wallet,
  PieChart,
  Settings2
} from 'lucide-react';

const modules = [
  {
    icon: LayoutDashboard,
    title: 'Financial Dashboard',
    description: 'Comprehensive overview of all financial metrics, KPIs, and real-time data visualization.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: LineChart,
    title: 'Interactive Analytics',
    description: 'Dynamic charts and graphs with drill-down capabilities and custom date ranges.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: FileText,
    title: 'Financial Reports',
    description: 'Automated report generation with customizable templates and export options.',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: Brain,
    title: 'AI Forecasting',
    description: 'Machine learning-powered predictions and trend analysis for strategic planning.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: UserCog,
    title: 'Access Management',
    description: 'Role-based permissions, audit logs, and secure multi-user collaboration.',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: Wallet,
    title: 'Budget Control',
    description: 'Track budgets vs actuals with alerts and automated variance analysis.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: PieChart,
    title: 'Expense Tracking',
    description: 'Categorize and monitor expenses with smart categorization and insights.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: Settings2,
    title: 'System Configuration',
    description: 'Customize workflows, integrations, and platform settings to match your needs.',
    color: 'from-amber-500 to-amber-600',
  },
];

export function ModulesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-info/10 text-info text-sm font-medium mb-4">
            Platform Modules
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Complete ERP Suite
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Integrated modules designed to handle every aspect of your financial operations.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className="relative h-full bg-card border border-border rounded-2xl p-6 overflow-hidden hover:border-primary/30 transition-all duration-300">
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4`}>
                  <module.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{module.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
