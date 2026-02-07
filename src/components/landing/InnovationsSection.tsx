import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Fingerprint,
  Globe,
  Cpu,
  ShieldCheck,
  Sparkles,
  Zap,
  Eye,
} from 'lucide-react';

const innovations = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'GPT-5 integrated financial assistant provides real-time analysis, anomaly detection, and predictive forecasting with natural language queries.',
    badge: 'AI',
    gradient: 'from-primary to-accent',
  },
  {
    icon: Fingerprint,
    title: 'Biometric Auth',
    description: 'Passwordless login with Face ID, fingerprint scanning, and passkey support for enterprise-grade zero-trust security.',
    badge: 'Security',
    gradient: 'from-success to-primary',
  },
  {
    icon: Eye,
    title: 'Ambient Intelligence',
    description: 'Context-aware UI that adapts layouts, themes, and data density based on user behavior, time of day, and device capabilities.',
    badge: 'UX',
    gradient: 'from-info to-accent',
  },
  {
    icon: Globe,
    title: 'Edge Computing',
    description: 'Sub-50ms response times with edge-deployed functions. Financial calculations run closest to your users, globally.',
    badge: 'Infra',
    gradient: 'from-warning to-destructive',
  },
  {
    icon: Cpu,
    title: 'Real-Time Collaboration',
    description: 'Multi-cursor editing, live presence indicators, and conflict-free replicated data types (CRDTs) for simultaneous teamwork.',
    badge: 'Collab',
    gradient: 'from-accent to-success',
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Knowledge Proofs',
    description: 'Verify financial data integrity without exposing sensitive information. Blockchain-anchored audit trails for regulatory compliance.',
    badge: 'Privacy',
    gradient: 'from-primary to-info',
  },
];

export function InnovationsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">2026 Innovations</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Built for the{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Future
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge technologies that set Finance-Horizon apart from legacy ERP systems.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-card border border-border rounded-2xl p-6 overflow-hidden transition-shadow hover:shadow-2xl"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${item.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>

                {/* Animated bottom line */}
                <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-card border border-border rounded-2xl"
        >
          {[
            { value: '<50ms', label: 'Edge Latency' },
            { value: '256-bit', label: 'Encryption' },
            { value: '99.99%', label: 'Availability' },
            { value: 'GPT-5', label: 'AI Engine' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
