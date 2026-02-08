import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Shield, Fingerprint, Scan, Activity, TrendingUp, Users, Zap, Lock } from 'lucide-react';
import financeHorizonLogo from '@/assets/finance-horizon-logo.png';

interface WelcomePanelProps {
  isLogin: boolean;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return 'Working late?';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Burning midnight oil?';
}

function AnimatedKPI({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 20 }}
      className="relative group"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      <div className="relative rounded-2xl bg-card/40 backdrop-blur-md border border-border/30 p-4 text-center">
        <motion.span
          className="block text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.15, type: 'spring', stiffness: 300 }}
        >
          {value}
        </motion.span>
        <span className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1 block">{label}</span>
      </div>
    </motion.div>
  );
}

function SystemPulse() {
  return (
    <motion.div
      className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-card/30 backdrop-blur-sm border border-border/20"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <span className="relative flex h-2.5 w-2.5">
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75"
          animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
      </span>
      <span className="text-xs text-muted-foreground">All systems operational</span>
      <Activity className="w-3 h-3 text-success" />
    </motion.div>
  );
}

export function WelcomePanel({ isLogin }: WelcomePanelProps) {
  const greeting = useMemo(getGreeting, []);
  const features = [
    { icon: TrendingUp, label: 'Real-time Analytics' },
    { icon: Users, label: '10K+ Users' },
    { icon: Zap, label: 'Lightning Fast' },
    { icon: Lock, label: 'Bank-Grade Security' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative z-10 p-10 xl:p-14"
    >
      <div className="flex flex-col justify-between w-full h-full">
        {/* Logo + pulse */}
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3.5"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl flex items-center justify-center border border-border/20 shadow-glow"
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src={financeHorizonLogo} alt="Finance-Horizon" className="w-7 h-7 rounded-lg" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Finance-Horizon</h1>
              <p className="text-[11px] text-muted-foreground tracking-widest uppercase">Enterprise Platform</p>
            </div>
          </motion.div>
          <SystemPulse />
        </div>

        {/* Center — dynamic greeting */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-8 -mt-8"
        >
          <div>
            <motion.p
              className="text-sm text-muted-foreground mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {greeting} 👋
            </motion.p>
            <motion.h2
              className="text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {isLogin ? (
                <>
                  Welcome{' '}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                    back
                  </span>
                </>
              ) : (
                <>
                  Get{' '}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                    started
                  </span>
                </>
              )}
            </motion.h2>
            <p className="text-base text-muted-foreground mt-4 max-w-md leading-relaxed">
              {isLogin
                ? 'Sign in to access your financial dashboard, analytics, and AI-powered insights in real-time.'
                : 'Create your account and unlock intelligent financial tools trusted by 10,000+ professionals.'}
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2.5">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/30 backdrop-blur-sm border border-border/20 text-xs text-muted-foreground"
              >
                <feat.icon className="w-3.5 h-3.5 text-primary" />
                {feat.label}
              </motion.div>
            ))}
          </div>

          {/* KPI counters */}
          <div className="grid grid-cols-3 gap-3">
            <AnimatedKPI value="10K+" label="Users" delay={0.5} />
            <AnimatedKPI value="99.9%" label="Uptime" delay={0.6} />
            <AnimatedKPI value="$2.5B" label="Processed" delay={0.7} />
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-6"
        >
          {[
            { icon: Shield, label: 'SOC2 Certified' },
            { icon: Fingerprint, label: '256-bit SSL' },
            { icon: Scan, label: 'GDPR Compliant' },
          ].map((badge, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 text-muted-foreground text-xs"
              whileHover={{ scale: 1.05, color: 'hsl(var(--foreground))' }}
            >
              <badge.icon className="w-3.5 h-3.5" />
              <span>{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
