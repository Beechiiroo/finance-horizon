import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/language/LanguageSwitcher';
import { AuthLeftPanel } from '@/components/auth/AuthLeftPanel';
import { AuthForm } from '@/components/auth/AuthForm';
import financeHorizonLogo from '@/assets/finance-horizon-logo.png';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left Panel - Branding */}
      <AuthLeftPanel isLogin={isLogin} />

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col bg-background">
        <div className="flex justify-end p-4">
          <LanguageSwitcher />
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-[420px]">
            {/* Mobile logo */}
            <div className="lg:hidden mb-8 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <img src={financeHorizonLogo} alt="Logo" className="w-7 h-7 rounded-lg" />
              </div>
              <div>
                <span className="text-xl font-bold">Finance ERP</span>
                <p className="text-xs text-muted-foreground">Enterprise Platform</p>
              </div>
            </div>

            <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}
