import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Fingerprint, Scan, TrendingUp, Users, Zap } from 'lucide-react';
import financeHorizonLogo from '@/assets/finance-horizon-logo.png';

interface AuthLeftPanelProps {
  isLogin: boolean;
}

export function AuthLeftPanel({ isLogin }: AuthLeftPanelProps) {
  const features = [
    { icon: TrendingUp, label: 'Real-time Analytics', color: 'text-emerald-400' },
    { icon: Users, label: '10K+ Active Users', color: 'text-blue-400' },
    { icon: Zap, label: 'Lightning Fast', color: 'text-amber-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hidden lg:flex lg:w-1/2 bg-sidebar-background relative overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px]"
          animate={{
            x: ['-50%', '-40%', '-50%'],
            y: ['-50%', '-40%', '-50%'],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px]"
          animate={{
            x: ['30%', '40%', '30%'],
            y: ['30%', '40%', '30%'],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col justify-between p-12 w-full h-full">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div 
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-2xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src={financeHorizonLogo} alt="Logo" className="w-9 h-9 rounded-lg" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Finance-Horizon</h1>
            <p className="text-xs text-white/40 tracking-wide uppercase">Enterprise Platform</p>
          </div>
        </motion.div>

        {/* Center content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Status badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.span 
              className="w-2.5 h-2.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-white/70">All systems operational</span>
          </motion.div>
          
          <div>
            <motion.h2 
              className="text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {isLogin ? (
                <>
                  Welcome<br />
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    back
                  </span>
                </>
              ) : (
                <>
                  Get<br />
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    started
                  </span>
                </>
              )}
            </motion.h2>
            <p className="text-lg text-white/50 max-w-md leading-relaxed">
              {isLogin 
                ? 'Sign in to access your financial dashboard, analytics, and insights in real-time.'
                : 'Create your account and start managing your finances with powerful tools.'}
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
              >
                <feature.icon className={`w-4 h-4 ${feature.color}`} />
                <span className="text-sm text-white/70">{feature.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 pt-4">
            {[
              { value: '10K+', label: 'Users', color: 'from-primary to-accent' },
              { value: '99.9%', label: 'Uptime', color: 'from-accent to-primary' },
              { value: '$2.5B', label: 'Processed', color: 'from-primary to-accent' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 mt-1 uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-8"
        >
          {[
            { icon: Shield, label: 'SOC2 Certified' },
            { icon: Fingerprint, label: '256-bit SSL' },
            { icon: Scan, label: 'GDPR Compliant' },
          ].map((badge, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 text-white/40 text-sm"
              whileHover={{ scale: 1.05, color: 'rgba(255,255,255,0.7)' }}
            >
              <badge.icon className="w-4 h-4" />
              <span>{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-white/5 rounded-full" />
      <div className="absolute bottom-40 left-20 w-48 h-48 border border-white/5 rounded-full" />
    </motion.div>
  );
}
