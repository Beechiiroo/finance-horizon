import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ParallaxBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base gradient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,hsl(var(--primary)/0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_100%,hsl(var(--accent)/0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_60%,hsl(270_70%_60%/0.08),transparent_50%)]" />

      {/* Parallax orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]"
        animate={{
          x: -200 + mouse.x * 30,
          y: -200 + mouse.y * 20,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 100 }}
        style={{ top: '10%', left: '15%' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]"
        animate={{
          x: 100 + mouse.x * -20,
          y: 100 + mouse.y * -15,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 100 }}
        style={{ bottom: '5%', right: '10%' }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full blur-[100px]"
        style={{ background: 'hsl(270 70% 60% / 0.06)', top: '40%', left: '50%' }}
        animate={{
          x: mouse.x * 15,
          y: mouse.y * 10,
          scale: [1, 1.1, 1],
        }}
        transition={{ scale: { duration: 8, repeat: Infinity }, default: { type: 'spring', damping: 50 } }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--foreground)/0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.08) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating particles — financial flow metaphor */}
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `hsl(var(--${i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'accent' : 'foreground'}) / ${0.15 + Math.random() * 0.15})`,
          }}
          animate={{
            y: [0, -(20 + Math.random() * 40), 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
}
