import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, Globe, BarChart3, Wallet } from 'lucide-react';

const icons = [
  { Icon: TrendingUp, x: '10%', y: '20%', size: 24, delay: 0 },
  { Icon: Shield, x: '85%', y: '15%', size: 20, delay: 0.5 },
  { Icon: Zap, x: '75%', y: '75%', size: 22, delay: 1 },
  { Icon: Globe, x: '15%', y: '70%', size: 26, delay: 1.5 },
  { Icon: BarChart3, x: '60%', y: '85%', size: 20, delay: 2 },
  { Icon: Wallet, x: '90%', y: '45%', size: 22, delay: 2.5 },
];

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, x, y, size, delay }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0.3, 0],
            scale: [0.8, 1, 1, 0.8],
            y: [0, -20, -20, 0],
          }}
          transition={{
            duration: 8,
            delay: delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
            <Icon className="text-white/60" size={size} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
