import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Shield, Zap, BarChart3, Globe2, CheckCircle2, Fingerprint, Sparkles } from 'lucide-react';
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
  { icon: Shield, key: 'feature1' },
  { icon: BarChart3, key: 'feature2' },
  { icon: Zap, key: 'feature3' },
  { icon: Globe2, key: 'feature4' },
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
    <div className="min-h-screen bg-background flex" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left Panel - Ultra Creative Animated Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex lg:w-[55%] relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 30%, #0891b2 70%, #14b8a6 100%)',
        }}
      >
        {/* Multiple animated background layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <GlowingOrbs />
        <AnimatedGrid />
        <FloatingParticles />
        <FloatingElements />
        
        {/* Animated aurora effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 flex flex-col justify-center p-12 xl:p-16 text-white w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl"
          >
            {/* Animated Logo with 3D effect */}
            <motion.div
              className="flex items-center gap-4 mb-12"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="relative"
                animate={{ 
                  rotateY: [0, 10, 0, -10, 0],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <motion.div
                  className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 flex items-center justify-center overflow-hidden shadow-2xl"
                  animate={{ 
                    boxShadow: [
                      '0 0 30px rgba(20, 184, 166, 0.3)',
                      '0 0 60px rgba(59, 130, 246, 0.4)',
                      '0 0 30px rgba(20, 184, 166, 0.3)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <img src={financeErpLogo} alt="Finance ERP" className="w-14 h-14 object-contain" />
                </motion.div>
                {/* Glow ring */}
                <motion.div
                  className="absolute -inset-2 rounded-[28px] border-2 border-white/20"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <motion.h1 
                  className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-teal-200 bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Finance ERP
                </motion.h1>
                <p className="text-sm text-white/60 mt-1">Enterprise Resource Planning</p>
              </div>
            </motion.div>

            {/* Main heading with gradient text */}
            <motion.div className="mb-8">
              <motion.div
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="w-5 h-5 text-teal-300" />
                <span className="text-sm font-medium text-teal-300 uppercase tracking-wider">
                  AI-Powered Platform
                </span>
              </motion.div>
              <motion.h2
                className="text-5xl xl:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-white via-teal-100 to-cyan-200 bg-clip-text text-transparent">
                  {isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
                </span>
              </motion.h2>
              <motion.p
                className="text-xl text-white/70 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {isLogin ? t('auth.loginSubtitle') : t('auth.signupSubtitle')}
              </motion.p>
            </motion.div>

            {/* Features grid with hover effects */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderColor: 'rgba(255,255,255,0.3)',
                  }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 cursor-default transition-all"
                >
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400/30 to-blue-500/30 flex items-center justify-center"
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="w-6 h-6 text-teal-300" />
                  </motion.div>
                  <span className="text-sm font-medium">{t(`auth.${feature.key}`)}</span>
                </motion.div>
              ))}
            </div>

            {/* Live stats */}
            <StatsDisplay />

            {/* Animated analytics preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-8 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-teal-300" />
                  <span className="text-sm text-white/70">Performance Analytics</span>
                </div>
                <motion.span 
                  className="text-xs text-green-400 flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle2 className="w-3 h-3" /> Live
                </motion.span>
              </div>
              <AnimatedChart />
              <AnimatedLineChart />
            </motion.div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 border-2 border-white/20 flex items-center justify-center text-xs font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.8 + i * 0.1 }}
                  >
                    {String.fromCharCode(64 + i)}
                  </motion.div>
                ))}
              </div>
              <div className="text-sm text-white/60">
                <Shield className="w-4 h-4 inline mr-1" />
                {t('auth.trustedBy')}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative blurs */}
        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[100px]" />
        <div className="absolute top-32 -right-32 w-64 h-64 rounded-full bg-blue-500/20 blur-[80px]" />
        <div className="absolute bottom-48 -left-32 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />
      </motion.div>

      {/* Right Panel - Form with Glassmorphism */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(120,119,198,0.1),transparent_50%)]" />
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
                className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-2xl overflow-hidden relative"
                whileHover={{ rotate: 5 }}
                animate={{ boxShadow: ['0 0 30px rgba(59,130,246,0.3)', '0 0 60px rgba(20,184,166,0.4)', '0 0 30px rgba(59,130,246,0.3)'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <img src={financeErpLogo} alt="Finance ERP" className="w-16 h-16 object-contain" />
              </motion.div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
                {isLogin ? t('auth.login') : t('auth.signup')}
              </h1>
            </motion.div>

            {/* Form card with premium glassmorphism */}
            <motion.div
              className="bg-card/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-border/50 relative overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Decorative gradient border */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-50"
                style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, transparent 50%, rgba(20,184,166,0.1) 100%)',
                }}
              />

              <div className="relative z-10">
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
                            className="pl-12 h-14 rounded-xl text-base transition-all border-2 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/10"
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
                        className="pl-12 h-14 rounded-xl text-base transition-all border-2 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/10"
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
                          className="text-xs text-primary hover:underline font-medium"
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
                        className="pl-12 pr-12 h-14 rounded-xl text-base transition-all border-2 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/10"
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
                            className="pl-12 h-14 rounded-xl text-base transition-all border-2 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/10"
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

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full h-14 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          {isLogin ? t('auth.login') : t('auth.signup')}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
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

                {/* Social login buttons */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Google Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-14 text-base font-medium rounded-xl hover:bg-muted/50 transition-all border-2"
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
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-14 text-base font-medium rounded-xl hover:bg-muted/50 transition-all border-2"
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
                      className="text-primary font-semibold hover:underline transition-all"
                    >
                      {isLogin ? t('auth.signup') : t('auth.login')}
                    </button>
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Security badges */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-full">
                <Shield className="w-4 h-4 text-green-500" />
                <span>{t('auth.secureLogin')}</span>
              </div>
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-full">
                <Fingerprint className="w-4 h-4 text-blue-500" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>GDPR Compliant</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
