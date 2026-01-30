import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedChart() {
  const bars = [
    { height: 40, delay: 0 },
    { height: 65, delay: 0.1 },
    { height: 45, delay: 0.2 },
    { height: 80, delay: 0.3 },
    { height: 55, delay: 0.4 },
    { height: 90, delay: 0.5 },
    { height: 70, delay: 0.6 },
  ];

  return (
    <div className="flex items-end justify-center gap-2 h-32 mt-8">
      {bars.map((bar, index) => (
        <motion.div
          key={index}
          className="w-6 rounded-t-md bg-gradient-to-t from-white/20 to-white/40"
          initial={{ height: 0 }}
          animate={{ height: `${bar.height}%` }}
          transition={{
            duration: 1,
            delay: bar.delay + 0.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

export function AnimatedLineChart() {
  return (
    <svg className="w-full h-24 mt-4" viewBox="0 0 200 60" fill="none">
      <motion.path
        d="M0 50 Q 25 45, 50 35 T 100 25 T 150 15 T 200 10"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0 50 Q 25 45, 50 35 T 100 25 T 150 15 T 200 10"
        stroke="url(#gradient)"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
        </linearGradient>
      </defs>
      {/* Animated dots on the line */}
      {[
        { cx: 50, cy: 35 },
        { cx: 100, cy: 25 },
        { cx: 150, cy: 15 },
      ].map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r="4"
          fill="white"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 + i * 0.2 }}
        />
      ))}
    </svg>
  );
}
