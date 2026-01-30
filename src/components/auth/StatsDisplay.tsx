import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  value: string;
  label: string;
  delay: number;
  color: string;
}

function StatCard({ value, label, delay, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative group"
    >
      <motion.div
        className={`absolute inset-0 ${color} rounded-xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity`}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <motion.div
          className="text-2xl font-bold text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, type: 'spring' }}
        >
          {value}
        </motion.div>
        <div className="text-xs text-white/60 mt-1">{label}</div>
      </div>
    </motion.div>
  );
}

export function StatsDisplay() {
  const stats = [
    { value: '10K+', label: 'Active Users', delay: 0.8, color: 'bg-blue-500/30' },
    { value: '99.9%', label: 'Uptime', delay: 0.9, color: 'bg-green-500/30' },
    { value: '$2.5B', label: 'Processed', delay: 1.0, color: 'bg-purple-500/30' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mt-6">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
}
