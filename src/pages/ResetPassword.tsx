import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/language/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import financeErpLogo from '@/assets/finance-erp-logo.png';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { t, isRTL } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      emailSchema.parse({ email });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        return;
      }
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setSent(true);
        toast.success('Password reset email sent!');
      }
    } catch {
      toast.error('Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden lg:flex lg:w-1/2 bg-sidebar-background relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full h-full">
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

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs text-white/60">Secure Password Recovery</span>
            </div>
            
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
              Reset your password
            </h2>
            <p className="text-lg text-white/50 max-w-md">
              We'll send you a secure link to reset your password and regain access to your account.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-6 text-white/40 text-sm"
          >
            <span>🔒 Encrypted transmission</span>
            <span>⏱️ Link expires in 1 hour</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col bg-background">
        <div className="flex justify-between items-center p-4">
          <Link to="/auth" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to login</span>
          </Link>
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

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Check your email</h2>
                  <p className="text-muted-foreground">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    onClick={() => setSent(false)}
                    className="text-primary hover:underline"
                  >
                    try again
                  </button>
                </p>
                <Link to="/auth">
                  <Button variant="outline" className="w-full">
                    Back to login
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">{t('auth.forgotPassword')}</h2>
                  <p className="text-muted-foreground">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-sm">{t('auth.email')}</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        className="pl-10 h-12"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {error && <p className="text-sm text-destructive mt-1">{error}</p>}
                  </div>

                  <Button type="submit" className="w-full h-12" disabled={loading}>
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Send reset link'
                    )}
                  </Button>
                </form>

                <p className="text-sm text-muted-foreground text-center mt-6">
                  Remember your password?{' '}
                  <Link to="/auth" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
