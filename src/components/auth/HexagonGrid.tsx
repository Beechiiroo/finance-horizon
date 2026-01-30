import React from 'react';
import { motion } from 'framer-motion';

export function HexagonGrid() {
  const hexagons = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: (i % 6) * 120 + (Math.floor(i / 6) % 2) * 60,
    y: Math.floor(i / 6) * 100,
    delay: i * 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="w-full h-full" viewBox="0 0 800 600">
        <defs>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.4)" />
            <stop offset="50%" stopColor="rgba(20,184,166,0.4)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.4)" />
          </linearGradient>
        </defs>
        {hexagons.map((hex) => (
          <motion.path
            key={hex.id}
            d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z"
            fill="none"
            stroke="url(#hexGradient)"
            strokeWidth="1"
            transform={`translate(${hex.x}, ${hex.y}) scale(0.8)`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 0.9, 0.8],
            }}
            transition={{
              duration: 4,
              delay: hex.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </div>
  );
}
