import React from 'react';
import { motion } from 'framer-motion';

export function MorphingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Morphing gradient blobs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
          left: '-20%',
          top: '-20%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.35) 0%, transparent 70%)',
          right: '-10%',
          bottom: '-10%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Mesh gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(at 40% 20%, hsla(212, 95%, 55%, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 0%, hsla(189, 75%, 45%, 0.15) 0px, transparent 50%),
            radial-gradient(at 0% 50%, hsla(355, 85%, 65%, 0.1) 0px, transparent 50%),
            radial-gradient(at 80% 50%, hsla(212, 60%, 45%, 0.15) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(173, 80%, 45%, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 100%, hsla(270, 70%, 55%, 0.1) 0px, transparent 50%),
            radial-gradient(at 0% 0%, hsla(350, 70%, 55%, 0.1) 0px, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
