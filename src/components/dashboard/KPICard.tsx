import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change: number;
  icon: LucideIcon;
  variant?: 'primary' | 'success' | 'warning' | 'destructive';
  delay?: number;
}

const variantStyles = {
  primary: {
    iconBg: 'gradient-primary',
    glow: 'glow-primary',
    badge: 'bg-primary/10 text-primary',
  },
  success: {
    iconBg: 'gradient-success',
    glow: 'glow-success',
    badge: 'bg-success/10 text-success',
  },
  warning: {
    iconBg: 'gradient-warning',
    glow: 'glow-warning',
    badge: 'bg-warning/10 text-warning',
  },
  destructive: {
    iconBg: 'gradient-destructive',
    glow: 'glow-destructive',
    badge: 'bg-destructive/10 text-destructive',
  },
};

export function KPICard({
  title,
  value,
  prefix = '$',
  suffix,
  change,
  icon: Icon,
  variant = 'primary',
  delay = 0,
}: KPICardProps) {
  const { formattedValue, elementRef } = useAnimatedCounter(value, {
    duration: 2000,
    delay: delay * 100,
  });

  const styles = variantStyles[variant];
  const isPositive = change >= 0;

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "relative p-6 bg-card rounded-2xl border border-border overflow-hidden card-hover",
        styles.glow
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <Icon className="w-full h-full" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-3 rounded-xl", styles.iconBg)}>
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{Math.abs(change)}%</span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold tabular-nums">
            {prefix}
            {formattedValue}
            {suffix}
          </p>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          vs previous period
        </p>
      </div>
    </motion.div>
  );
}
