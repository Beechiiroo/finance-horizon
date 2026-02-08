import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye } from 'lucide-react';

interface SecurityConfidenceProps {
  email: string;
  password: string;
  verified: boolean;
}

export function SecurityConfidence({ email, password, verified }: SecurityConfidenceProps) {
  const checks = [
    { label: 'Encrypted connection', active: true, icon: Lock },
    { label: 'Email validated', active: email.includes('@') && email.includes('.'), icon: Shield },
    { label: 'Human verified', active: verified, icon: Eye },
  ];

  const score = checks.filter((c) => c.active).length;
  const pct = Math.round((score / checks.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="rounded-xl bg-card/40 backdrop-blur-sm border border-border/20 p-3"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Security Confidence</span>
        <span className={`text-xs font-semibold ${pct === 100 ? 'text-success' : 'text-primary'}`}>{pct}%</span>
      </div>
      <div className="h-1 rounded-full bg-muted overflow-hidden mb-2.5">
        <motion.div
          className={`h-full rounded-full ${pct === 100 ? 'bg-success' : 'bg-primary'}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="flex gap-3">
        {checks.map((check, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <check.icon className={`w-3 h-3 ${check.active ? 'text-success' : 'text-muted-foreground/40'}`} />
            <span className={`text-[10px] ${check.active ? 'text-foreground/70' : 'text-muted-foreground/40'}`}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
