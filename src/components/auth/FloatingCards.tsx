import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, PieChart, Activity, CreditCard, Wallet } from 'lucide-react';

const cards = [
  { Icon: TrendingUp, value: '+24.5%', label: 'Revenue', color: 'from-green-500/20 to-emerald-500/20', x: '5%', y: '15%' },
  { Icon: DollarSign, value: '$125K', label: 'Savings', color: 'from-blue-500/20 to-cyan-500/20', x: '75%', y: '20%' },
  { Icon: PieChart, value: '87%', label: 'Efficiency', color: 'from-purple-500/20 to-pink-500/20', x: '10%', y: '65%' },
  { Icon: Activity, value: '99.9%', label: 'Uptime', color: 'from-teal-500/20 to-cyan-500/20', x: '80%', y: '70%' },
];

export function FloatingCards() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: card.x, top: card.y }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: [0.6, 0.9, 0.6],
            y: [0, -15, 0],
            rotateY: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 6,
            delay: index * 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className={`bg-gradient-to-br ${card.color} backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl min-w-[120px]`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <card.Icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-xl font-bold text-white">{card.value}</div>
            <div className="text-xs text-white/60">{card.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
