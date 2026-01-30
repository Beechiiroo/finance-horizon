import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { t } = useLanguage();

  const requirements = useMemo(() => {
    return [
      { label: t('auth.minChars'), met: password.length >= 6 },
      { label: t('auth.hasUppercase'), met: /[A-Z]/.test(password) },
      { label: t('auth.hasNumber'), met: /\d/.test(password) },
      { label: t('auth.hasSpecial'), met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];
  }, [password, t]);

  const strength = useMemo(() => {
    const metCount = requirements.filter((r) => r.met).length;
    if (metCount === 0) return { level: 0, label: '', color: '' };
    if (metCount === 1) return { level: 1, label: t('auth.weak'), color: 'bg-red-500' };
    if (metCount === 2) return { level: 2, label: t('auth.fair'), color: 'bg-orange-500' };
    if (metCount === 3) return { level: 3, label: t('auth.good'), color: 'bg-yellow-500' };
    return { level: 4, label: t('auth.strong'), color: 'bg-green-500' };
  }, [requirements, t]);

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-3 space-y-3"
    >
      {/* Strength bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">{t('auth.passwordStrength')}</span>
          <span className={`font-medium ${strength.level >= 3 ? 'text-green-500' : strength.level >= 2 ? 'text-yellow-500' : 'text-red-500'}`}>
            {strength.label}
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden flex gap-1">
          {[1, 2, 3, 4].map((level) => (
            <motion.div
              key={level}
              className={`flex-1 rounded-full ${level <= strength.level ? strength.color : 'bg-muted-foreground/20'}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: level <= strength.level ? 1 : 0 }}
              transition={{ duration: 0.3, delay: level * 0.05 }}
            />
          ))}
        </div>
      </div>

      {/* Requirements checklist */}
      <div className="grid grid-cols-2 gap-2">
        {requirements.map((req, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-1.5 text-xs ${req.met ? 'text-green-500' : 'text-muted-foreground'}`}
          >
            {req.met ? (
              <Check className="w-3 h-3" />
            ) : (
              <X className="w-3 h-3" />
            )}
            {req.label}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
