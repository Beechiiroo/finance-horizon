import React from 'react';
import { motion } from 'framer-motion';

export function DataFlowLines() {
  const lines = [
    { x1: 0, y1: 100, x2: 400, y2: 50, delay: 0 },
    { x1: 0, y1: 200, x2: 400, y2: 180, delay: 0.5 },
    { x1: 0, y1: 300, x2: 400, y2: 350, delay: 1 },
    { x1: 0, y1: 400, x2: 400, y2: 380, delay: 1.5 },
    { x1: 0, y1: 500, x2: 400, y2: 550, delay: 2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="rgba(59,130,246,0.6)" />
            <stop offset="70%" stopColor="rgba(20,184,166,0.6)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {lines.map((line, i) => (
          <g key={i}>
            {/* Static line */}
            <line
              x1={`${(line.x1 / 400) * 100}%`}
              y1={`${(line.y1 / 600) * 100}%`}
              x2={`${(line.x2 / 400) * 100}%`}
              y2={`${(line.y2 / 600) * 100}%`}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
            {/* Animated data packet */}
            <motion.circle
              r="3"
              fill="url(#lineGradient)"
              filter="url(#glow)"
              initial={{ 
                cx: `${(line.x1 / 400) * 100}%`, 
                cy: `${(line.y1 / 600) * 100}%`,
                opacity: 0 
              }}
              animate={{
                cx: [`${(line.x1 / 400) * 100}%`, `${(line.x2 / 400) * 100}%`],
                cy: [`${(line.y1 / 600) * 100}%`, `${(line.y2 / 600) * 100}%`],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: line.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
