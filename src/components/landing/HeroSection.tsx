import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-info/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Next-Gen Financial Platform</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground">Smart Financial</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent">
                Intelligence
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Transform your financial data into actionable insights. Finance-Horizon delivers 
              real-time analytics, intelligent forecasting, and enterprise-grade security.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button 
                size="lg" 
                className="gap-2 text-lg px-8 py-6"
                onClick={() => navigate('/auth')}
              >
                View Dashboard
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 text-lg px-8 py-6"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: '99.9%', label: 'Uptime' },
                { value: '$2.5B+', label: 'Processed' },
                { value: '500+', label: 'Companies' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Mock Dashboard Header */}
              <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
              </div>
              
              {/* Mock Dashboard Content */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: TrendingUp, value: '+24.5%', label: 'Revenue', color: 'text-success' },
                    { icon: Shield, value: '98.2%', label: 'Security', color: 'text-primary' },
                    { icon: Zap, value: '1.2s', label: 'Load Time', color: 'text-info' },
                  ].map((item, i) => (
                    <div key={i} className="bg-muted/30 rounded-xl p-4">
                      <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
                      <p className="text-xl font-bold">{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
                
                {/* Mock Chart */}
                <div className="bg-muted/30 rounded-xl p-4 h-48 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Real-time Updates</p>
                  <p className="text-xs text-muted-foreground">Live data sync</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
