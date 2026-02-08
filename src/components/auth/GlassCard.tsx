import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Outer glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 rounded-[28px] blur-2xl opacity-40" />

      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-3xl p-[1px] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.2), hsl(270 70% 60% / 0.2))',
        }}
      >
        <div className="absolute inset-[1px] rounded-[23px] bg-card/95 backdrop-blur-2xl" />
      </motion.div>

      {/* Content */}
      <div className="relative rounded-3xl p-7 sm:p-8 backdrop-blur-2xl bg-card/90 border border-border/30 shadow-2xl">
        {/* Inner highlights */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03] pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}
