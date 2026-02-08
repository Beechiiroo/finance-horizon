import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { z } from 'zod';
import { lovable } from '@/integrations/lovable';
import { PasswordStrength } from '@/components/auth/PasswordStrength';
import { HumanVerification } from '@/components/auth/HumanVerification';
import { SecurityConfidence } from '@/components/auth/SecurityConfidence';

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

interface AuthFormProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

export function AuthForm({ isLogin, setIsLogin }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
  const [humanVerified, setHumanVerified] = useState(false);

  const { signIn, signUp } = useAuth();
  const { t } = useLanguage();
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
    if (!humanVerified) {
      toast.error('Please complete the human verification first');
      return;
    }
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast.error(error.message.includes('Invalid login credentials') ? 'Invalid email or password' : error.message);
        } else {
          setSuccess(true);
          setTimeout(() => navigate('/dashboard'), 1200);
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          toast.error(error.message.includes('already registered') ? 'This email is already registered' : error.message);
        } else {
          setSuccess(true);
          toast.success('Account created! Please check your email to verify.');
        }
      }
    } finally {
      if (!success) setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setSuccess(false);
    setFormData({ ...formData, password: '', confirmPassword: '' });
  };

  // Success state
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        >
          <CheckCircle2 className="w-16 h-16 text-success mb-4" />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">
          {isLogin ? 'Welcome back!' : 'Account created!'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {isLogin ? 'Redirecting to dashboard...' : 'Check your email to verify your account.'}
        </p>
        {isLogin && (
          <motion.div
            className="mt-4 h-1 w-40 rounded-full bg-muted overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full bg-success rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2 }}
            />
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      {/* Header */}
      <div className="mb-7">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4"
        >
          <Sparkles className="w-3 h-3" />
          {isLogin ? 'Secure Login' : 'Join 10K+ Users'}
        </motion.div>
        <h2 className="text-2xl font-bold mb-1.5">
          {isLogin ? t('auth.login') : t('auth.signup')}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
          <button onClick={switchMode} className="text-primary font-medium hover:underline transition-colors">
            {isLogin ? t('auth.signup') : t('auth.login')}
          </button>
        </p>
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <Button
          variant="outline"
          className="h-11 gap-2.5 rounded-xl bg-card/50 backdrop-blur-sm border-border/30 hover:bg-card/80 hover:border-primary/30 transition-all duration-300"
          onClick={handleGoogleSignIn}
          disabled={googleLoading || loading || appleLoading}
        >
          {googleLoading ? (
            <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          )}
          <span className="text-sm font-medium">Google</span>
        </Button>
        <Button
          variant="outline"
          className="h-11 gap-2.5 rounded-xl bg-card/50 backdrop-blur-sm border-border/30 hover:bg-card/80 hover:border-primary/30 transition-all duration-300"
          onClick={handleAppleSignIn}
          disabled={appleLoading || loading || googleLoading}
        >
          {appleLoading ? (
            <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          )}
          <span className="text-sm font-medium">Apple</span>
        </Button>
      </div>

      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/30" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card/90 px-4 text-muted-foreground">{t('auth.orContinueWith')}</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence mode="wait">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="fullName" className="text-xs font-medium text-muted-foreground">{t('auth.fullName')}</Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  className="pl-10 h-11 rounded-xl bg-card/50 backdrop-blur-sm border-border/30 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">{t('auth.email')}</Label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              className="pl-10 h-11 rounded-xl bg-card/50 backdrop-blur-sm border-border/30 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>

        <div>
          <div className="flex justify-between mb-1.5">
            <Label htmlFor="password" className="text-xs font-medium text-muted-foreground">{t('auth.password')}</Label>
            {isLogin && (
              <Link to="/reset-password" className="text-xs text-primary hover:underline">
                {t('auth.forgotPassword')}
              </Link>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-10 pr-10 h-11 rounded-xl bg-card/50 backdrop-blur-sm border-border/30 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
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
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="confirmPassword" className="text-xs font-medium text-muted-foreground">{t('auth.confirmPassword')}</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 h-11 rounded-xl bg-card/50 backdrop-blur-sm border-border/30 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
            </motion.div>
          )}
        </AnimatePresence>

        {isLogin && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(c) => setRememberMe(c as boolean)}
            />
            <label htmlFor="rememberMe" className="text-xs cursor-pointer text-muted-foreground">
              {t('auth.rememberMe')}
            </label>
          </div>
        )}

        {/* Human Verification */}
        <HumanVerification onVerified={setHumanVerified} verified={humanVerified} />

        {/* Security Confidence */}
        <SecurityConfidence email={formData.email} password={formData.password} verified={humanVerified} />

        {/* Submit — morphs into loader */}
        <motion.div whileHover={{ scale: loading ? 1 : 1.01 }} whileTap={{ scale: loading ? 1 : 0.98 }}>
          <Button
            type="submit"
            className="w-full h-11 rounded-xl gap-2 text-sm font-medium relative overflow-hidden group"
            disabled={loading}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex items-center gap-2">
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? t('auth.login') : t('auth.signup')}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </span>
          </Button>
        </motion.div>
      </form>

      <p className="text-[11px] text-muted-foreground text-center mt-5 leading-relaxed">
        By continuing, you agree to our{' '}
        <a href="#" className="text-primary hover:underline">Terms</a>
        {' '}and{' '}
        <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
      </p>
    </motion.div>
  );
}
