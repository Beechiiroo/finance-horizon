import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Shield, Zap, BarChart3, Globe2, CheckCircle2, Fingerprint, Sparkles, Star, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/language/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { z } from 'zod';
import { lovable } from '@/integrations/lovable';
import { FloatingParticles } from '@/components/auth/FloatingParticles';
import { FloatingElements } from '@/components/auth/FloatingElements';
import { AnimatedChart, AnimatedLineChart } from '@/components/auth/AnimatedChart';
import { PasswordStrength } from '@/components/auth/PasswordStrength';
import { GlowingOrbs } from '@/components/auth/GlowingOrbs';
import { AnimatedGrid } from '@/components/auth/AnimatedGrid';
import { StatsDisplay } from '@/components/auth/StatsDisplay';
import { MorphingBackground } from '@/components/auth/MorphingBackground';
import { HexagonGrid } from '@/components/auth/HexagonGrid';
import { PulsingRings } from '@/components/auth/PulsingRings';
import { DataFlowLines } from '@/components/auth/DataFlowLines';
import { FloatingCards } from '@/components/auth/FloatingCards';
import { TypewriterText } from '@/components/auth/TypewriterText';
import { NeonBorder } from '@/components/auth/NeonBorder';
import { AnimatedLogo3D } from '@/components/auth/AnimatedLogo3D';
import { GlassCard } from '@/components/auth/GlassCard';
import financeErpLogo from '@/assets/finance-erp-logo.png';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const features = [
  { icon: Shield, key: 'feature1', gradient: 'from-blue-500 to-cyan-500' },
  { icon: BarChart3, key: 'feature2', gradient: 'from-green-500 to-emerald-500' },
  { icon: Zap, key: 'feature3', gradient: 'from-yellow-500 to-orange-500' },
  { icon: Globe2, key: 'feature4', gradient: 'from-purple-500 to-pink-500' },
];

const typewriterTexts = [
  'Financial Analytics',
  'Real-time Insights',
  'Smart Automation',
  'Secure Banking',
  'AI Predictions',
];

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);

  const { signIn, signUp, user } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast.error(error.message || 'Failed to sign in with Google');
      }
    } catch (err) {
      toast.error('Failed to sign in with Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setAppleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("apple", {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast.error(error.message || 'Failed to sign in with Apple');
      }
    } catch (err) {
      toast.error('Failed to sign in with Apple');
    } finally {
      setAppleLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      if (isLogin) {
        loginSchema.parse(formData);
      } else {
        signupSchema.parse(formData);
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Welcome back!');
          navigate('/');
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Account created! Please check your email to verify.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left Panel - Ultra Creative Animated Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex lg:w-[55%] relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0f1c 0%, #0f172a 25%, #1e3a5f 50%, #0f766e 75%, #134e4a 100%)',
        }}
      >
        {/* Multiple animated background layers */}
        <MorphingBackground />
        <HexagonGrid />
        <PulsingRings />
        <DataFlowLines />
        <GlowingOrbs />
        <AnimatedGrid />
        <FloatingParticles />
        <FloatingElements />
        <FloatingCards />
        
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 flex flex-col justify-center p-12 xl:p-16 text-white w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl"
          >
            {/* 3D Animated Logo */}
            <motion.div className="flex items-center gap-5 mb-12">
              <AnimatedLogo3D />
              <div>
                <motion.h1 
                  className="text-4xl xl:text-5xl font-bold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 50%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Finance ERP
                </motion.h1>
                <motion.p 
                  className="text-sm text-white/50 mt-1 tracking-widest uppercase"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Enterprise Resource Planning
                </motion.p>
              </div>
            </motion.div>

            {/* Main heading with typewriter effect */}
            <motion.div className="mb-10">
              <motion.div
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-5 h-5 text-teal-400" />
                </motion.div>
                <span className="text-sm font-medium text-teal-400 uppercase tracking-wider">
                  Next-Gen Platform
                </span>
              </motion.div>
              
              <motion.h2
                className="text-5xl xl:text-6xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-white via-blue-100 to-teal-200 bg-clip-text text-transparent">
                  {isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
                </span>
              </motion.h2>
              
              <motion.div
                className="text-2xl text-white/60 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TypewriterText 
                  texts={typewriterTexts} 
                  className="text-teal-300 font-semibold"
                />
              </motion.div>
              
              <motion.p
                className="text-lg text-white/50 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {isLogin ? t('auth.loginSubtitle') : t('auth.signupSubtitle')}
              </motion.p>
            </motion.div>

            {/* Features grid with 3D hover effects */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    z: 50,
                  }}
                  className="group relative cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                    style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}
                  />
                  <div className="relative flex items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all group-hover:bg-white/10 group-hover:border-white/20">
                    <motion.div 
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 10 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <span className="text-sm font-medium group-hover:text-white transition-colors">{t(`auth.${feature.key}`)}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live stats with enhanced design */}
            <StatsDisplay />

            {/* Live analytics preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-8 relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-purple-500/20 rounded-[28px] blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-teal-400" />
                    <span className="text-sm text-white/70">Performance Analytics</span>
                  </div>
                  <motion.span 
                    className="text-xs flex items-center gap-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 px-3 py-1.5 rounded-full border border-green-500/20"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Live
                  </motion.span>
                </div>
                <AnimatedChart />
                <AnimatedLineChart />
              </div>
            </motion.div>

            {/* Trust badges with enhanced design */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <div className="flex -space-x-3">
                {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
                  <motion.div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 border-2 border-slate-900 flex items-center justify-center text-xs font-bold shadow-lg"
                    initial={{ scale: 0, x: -20 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ delay: 1.8 + i * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  >
                    {letter}
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-semibold">4.9</span>
                </div>
                <span>•</span>
                <span>{t('auth.trustedBy')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative corner elements */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-transparent to-transparent blur-3xl" />
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 via-transparent to-transparent blur-3xl" />
        </motion.div>
      </motion.div>

      {/* Right Panel - Form with Ultra Premium Glassmorphism */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Animated background for right panel */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)' }}
            animate={{ 
              x: [0, 30, 0], 
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 70%)' }}
            animate={{ 
              x: [0, -20, 0], 
              y: [0, 20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        <div className="flex justify-end p-4 relative z-10">
          <LanguageSwitcher />
        </div>

        <div className="flex-1 flex items-center justify-center p-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <motion.div
              className="lg:hidden mb-8 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <motion.div
                className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-2xl overflow-hidden relative"
                whileHover={{ rotate: 5 }}
                animate={{ 
                  boxShadow: [
                    '0 0 30px rgba(59,130,246,0.3)', 
                    '0 0 60px rgba(20,184,166,0.4)', 
                    '0 0 30px rgba(59,130,246,0.3)'
                  ] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <img src={financeErpLogo} alt="Finance ERP" className="w-12 h-12 object-contain" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {isLogin ? t('auth.login') : t('auth.signup')}
              </h1>
            </motion.div>

            {/* Form card with neon border */}
            <NeonBorder>
              <GlassCard>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <AnimatePresence mode="wait">
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="fullName" className="text-sm font-medium">{t('auth.fullName')}</Label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="fullName"
                            type="text"
                            placeholder="John Doe"
                            className="pl-12 h-14 rounded-xl text-base transition-all border-2 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/10 bg-background/50"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          />
                        </div>
                        {errors.fullName && (
                          <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-sm text-destructive"
                          >
                            {errors.fullName}
                          </motion.p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">{t('auth.email')}</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-12 h-14 rounded-xl text-base transition-all border-2 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/10 bg-background/50"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-destructive"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="text-sm font-medium">{t('auth.password')}</Label>
                      {isLogin && (
                        <button
                          type="button"
                          className="text-xs text-primary hover:underline font-medium transition-colors hover:text-primary/80"
                          onClick={() => toast.info('Password reset coming soon!')}
                        >
                          {t('auth.forgotPassword')}
                        </button>
                      )}
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-12 pr-12 h-14 rounded-xl text-base transition-all border-2 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/10 bg-background/50"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-destructive"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                    
                    <AnimatePresence>
                      {!isLogin && formData.password && (
                        <PasswordStrength password={formData.password} />
                      )}
                    </AnimatePresence>
                  </div>

                  <AnimatePresence mode="wait">
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">{t('auth.confirmPassword')}</Label>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="pl-12 h-14 rounded-xl text-base transition-all border-2 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/10 bg-background/50"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-sm text-destructive"
                          >
                            {errors.confirmPassword}
                          </motion.p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Remember me checkbox */}
                  {isLogin && (
                    <motion.div
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Checkbox
                        id="rememberMe"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        className="w-5 h-5"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {t('auth.rememberMe')}
                      </label>
                    </motion.div>
                  )}

                  {/* Premium submit button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full h-14 text-base font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group"
                      disabled={loading}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
                        style={{ backgroundSize: '200% 100%' }}
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            {isLogin ? t('auth.login') : t('auth.signup')}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t-2 border-muted/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-4 text-muted-foreground font-medium">
                      {t('auth.orContinueWith')}
                    </span>
                  </div>
                </div>

                {/* Social login buttons with enhanced styling */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Google Button */}
                  <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-14 text-base font-medium rounded-xl hover:bg-muted/50 transition-all border-2 hover:border-primary/30 hover:shadow-lg"
                      onClick={handleGoogleSignIn}
                      disabled={googleLoading || loading || appleLoading}
                    >
                      {googleLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full"
                        />
                      ) : (
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                      )}
                    </Button>
                  </motion.div>

                  {/* Apple Button */}
                  <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-14 text-base font-medium rounded-xl hover:bg-muted/50 transition-all border-2 hover:border-primary/30 hover:shadow-lg"
                      onClick={handleAppleSignIn}
                      disabled={appleLoading || loading || googleLoading}
                    >
                      {appleLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full"
                        />
                      ) : (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                      )}
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-muted-foreground">
                    {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setErrors({});
                        setFormData({ ...formData, password: '', confirmPassword: '' });
                      }}
                      className="text-primary font-semibold hover:underline transition-all hover:text-primary/80"
                    >
                      {isLogin ? t('auth.signup') : t('auth.login')}
                    </button>
                  </p>
                </motion.div>
              </GlassCard>
            </NeonBorder>

            {/* Security badges with enhanced design */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: Shield, text: t('auth.secureLogin'), color: 'text-green-500' },
                { icon: Fingerprint, text: '256-bit SSL', color: 'text-blue-500' },
                { icon: Award, text: 'SOC2 Certified', color: 'text-purple-500' },
                { icon: CheckCircle2, text: 'GDPR', color: 'text-teal-500' },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-full border border-border/50 hover:border-primary/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <badge.icon className={`w-4 h-4 ${badge.color}`} />
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
