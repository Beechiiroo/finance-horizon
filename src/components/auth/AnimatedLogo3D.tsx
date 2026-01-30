import React from 'react';
import { motion } from 'framer-motion';
import financeErpLogo from '@/assets/finance-erp-logo.png';

export function AnimatedLogo3D() {
  return (
    <motion.div
      className="relative perspective-1000"
      whileHover={{ scale: 1.05 }}
    >
      {/* Outer glow rings */}
      <motion.div
        className="absolute -inset-8 rounded-full"
        animate={{
          boxShadow: [
            '0 0 60px 20px rgba(59,130,246,0.2)',
            '0 0 80px 30px rgba(20,184,166,0.2)',
            '0 0 60px 20px rgba(139,92,246,0.2)',
            '0 0 60px 20px rgba(59,130,246,0.2)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Rotating outer ring */}
      <motion.div
        className="absolute -inset-4 rounded-full border-2 border-dashed border-white/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Counter-rotating inner ring */}
      <motion.div
        className="absolute -inset-2 rounded-full border border-white/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Main logo container with 3D effect */}
      <motion.div
        className="relative w-24 h-24 rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.3)',
        }}
        animate={{
          rotateY: [0, 10, 0, -10, 0],
          rotateX: [0, -5, 0, 5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={financeErpLogo} alt="Finance ERP" className="w-16 h-16 object-contain" />
        </div>
      </motion.div>
      
      {/* Floating particles around logo */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/40"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos(i * 60 * Math.PI / 180) * 60],
            y: [0, Math.sin(i * 60 * Math.PI / 180) * 60],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  );
}
