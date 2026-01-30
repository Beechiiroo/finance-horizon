import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Shield, Fingerprint, Scan } from 'lucide-react';
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
import { PasswordStrength } from '@/components/auth/PasswordStrength';
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
      if (error) toast.error(error.message || 'Failed to sign in with Google');
    } catch {
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
      if (error) toast.error(error.message || 'Failed to sign in with Apple');
    } catch {
      toast.error('Failed to sign in with Apple');
    } finally {
      setAppleLoading(false);
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const validateForm = () => {
    try {
      if (isLogin) loginSchema.parse(formData);
      else signupSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
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
          toast.error(error.message.includes('Invalid login credentials') ? 'Invalid email or password' : error.message);
        } else {
          toast.success('Welcome back!');
          navigate('/');
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          toast.error(error.message.includes('already registered') ? 'This email is already registered' : error.message);
        } else {
          toast.success('Account created! Please check your email to verify.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left - Minimal Dark Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden lg:flex lg:w-1/2 bg-sidebar-background relative overflow-hidden"
      >
        {/* Subtle gradient mesh */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full h-full">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/10">
              <img src={financeErpLogo} alt="Logo" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Finance ERP</h1>
              <p className="text-xs text-white/40">Enterprise Platform</p>
            </div>
          </motion.div>

          {/* Center content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs text-white/60">All systems operational</span>
              </motion.div>
              
              <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
                {isLogin ? 'Welcome back' : 'Get started'}
              </h2>
              <p className="text-lg text-white/50 max-w-md">
                {isLogin 
                  ? 'Sign in to access your financial dashboard and analytics.'
                  : 'Create your account to start managing your finances.'}
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-8">
              {[
                { value: '10K+', label: 'Users' },
                { value: '99.9%', label: 'Uptime' },
                { value: '$2.5B', label: 'Processed' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/40">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-6"
          >
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Shield className="w-4 h-4" />
              <span>SOC2 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Fingerprint className="w-4 h-4" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Scan className="w-4 h-4" />
              <span>GDPR</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right - Form */}
      <div className="flex-1 flex flex-col bg-background">
        <div className="flex justify-end p-4">
          <LanguageSwitcher />
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[400px]"
          >
            {/* Mobile logo */}
            <div className="lg:hidden mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <img src={financeErpLogo} alt="Logo" className="w-6 h-6" />
              </div>
              <span className="text-xl font-semibold">Finance ERP</span>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {isLogin ? t('auth.login') : t('auth.signup')}
              </h2>
              <p className="text-muted-foreground">
                {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                    setFormData({ ...formData, password: '', confirmPassword: '' });
                  }}
                  className="text-primary font-medium hover:underline"
                >
                  {isLogin ? t('auth.signup') : t('auth.login')}
                </button>
              </p>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button
                variant="outline"
                className="h-12 gap-3"
                onClick={handleGoogleSignIn}
                disabled={googleLoading || loading || appleLoading}
              >
                {googleLoading ? (
                  <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                )}
                <span className="text-sm">Google</span>
              </Button>
              <Button
                variant="outline"
                className="h-12 gap-3"
                onClick={handleAppleSignIn}
                disabled={appleLoading || loading || googleLoading}
              >
                {appleLoading ? (
                  <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                )}
                <span className="text-sm">Apple</span>
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-3 text-muted-foreground">{t('auth.orContinueWith')}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Label htmlFor="fullName" className="text-sm">{t('auth.fullName')}</Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        className="pl-10 h-12"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <Label htmlFor="email" className="text-sm">{t('auth.email')}</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="pl-10 h-12"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <Label htmlFor="password" className="text-sm">{t('auth.password')}</Label>
                  {isLogin && (
                    <button type="button" className="text-xs text-primary hover:underline" onClick={() => toast.info('Password reset coming soon!')}>
                      {t('auth.forgotPassword')}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
                <AnimatePresence>
                  {!isLogin && formData.password && <PasswordStrength password={formData.password} />}
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Label htmlFor="confirmPassword" className="text-sm">{t('auth.confirmPassword')}</Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 h-12"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              {isLogin && (
                <div className="flex items-center gap-2">
                  <Checkbox id="rememberMe" checked={rememberMe} onCheckedChange={(c) => setRememberMe(c as boolean)} />
                  <label htmlFor="rememberMe" className="text-sm cursor-pointer">{t('auth.rememberMe')}</label>
                </div>
              )}

              <Button type="submit" className="w-full h-12 mt-2" disabled={loading}>
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? t('auth.login') : t('auth.signup')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
