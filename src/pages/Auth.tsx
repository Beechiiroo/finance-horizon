import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/language/LanguageSwitcher';
import { ParallaxBackground } from '@/components/auth/ParallaxBackground';
import { WelcomePanel } from '@/components/auth/WelcomePanel';
import { AuthForm } from '@/components/auth/AuthForm';
import { GlassCard } from '@/components/auth/GlassCard';
import financeHorizonLogo from '@/assets/finance-horizon-logo.png';
import { motion } from 'framer-motion';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex relative dark" dir={isRTL ? 'rtl' : 'ltr'}>
      <ParallaxBackground />

      {/* Left — Welcome panel */}
      <WelcomePanel isLogin={isLogin} />

      {/* Right — Auth form */}
      <div className="flex-1 flex flex-col relative z-10">
        <div className="flex justify-end p-4 gap-3">
          <LanguageSwitcher />
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
          <motion.div
            className="w-full max-w-[440px]"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Mobile logo */}
            <div className="lg:hidden mb-8 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <img src={financeHorizonLogo} alt="Logo" className="w-7 h-7 rounded-lg" />
              </div>
              <div>
                <span className="text-lg font-bold">Finance-Horizon</span>
                <p className="text-[11px] text-muted-foreground tracking-wider uppercase">Enterprise Platform</p>
              </div>
            </div>

            <GlassCard>
              <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
