import React from 'react';
import { motion } from 'framer-motion';

export function PulsingRings() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Center pulsing rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{
              width: 200 + i * 150,
              height: 200 + i * 150,
              left: -(100 + i * 75),
              top: -(100 + i * 75),
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Corner accent rings */}
      <motion.div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full border-2 border-teal-400/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute top-4 left-4 right-4 bottom-4 rounded-full border border-blue-400/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full border-2 border-purple-400/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute top-8 left-8 right-8 bottom-8 rounded-full border border-teal-400/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </div>
  );
}
