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
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-[28px] blur-xl opacity-50" />
      
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-3xl p-[1px]"
        style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(20,184,166,0.5), rgba(139,92,246,0.5))',
        }}
      >
        <div className="absolute inset-[1px] rounded-[23px] bg-card/95 backdrop-blur-xl" />
      </motion.div>
      
      {/* Content */}
      <div className="relative rounded-3xl p-8 backdrop-blur-xl bg-card/90 border border-border/50 shadow-2xl">
        {/* Inner highlight */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-accent/10 to-transparent rounded-br-3xl" />
        
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}
