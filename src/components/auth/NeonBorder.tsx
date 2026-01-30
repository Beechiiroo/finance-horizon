import React from 'react';
import { motion } from 'framer-motion';

interface NeonBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function NeonBorder({ children, className = '' }: NeonBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Animated neon border */}
      <motion.div
        className="absolute -inset-[2px] rounded-3xl opacity-75"
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #14b8a6, #8b5cf6, #ec4899, #3b82f6)',
          backgroundSize: '400% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Inner shadow for depth */}
      <motion.div
        className="absolute -inset-[4px] rounded-[28px] blur-md opacity-50"
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #14b8a6, #8b5cf6, #ec4899, #3b82f6)',
          backgroundSize: '400% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}
