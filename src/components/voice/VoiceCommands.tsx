import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface VoiceCommandsProps {
  onCommand?: (command: string) => void;
}

export function VoiceCommands({ onCommand }: VoiceCommandsProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const navigate = useNavigate();
  const { t, language, isRTL } = useLanguage();

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const processCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();

    // Navigation commands
    const navigationMap: Record<string, string> = {
      // English
      'dashboard': '/',
      'home': '/',
      'accounting': '/accounting',
      'invoices': '/invoices',
      'budgets': '/budgets',
      'reports': '/reports',
      'settings': '/settings',
      // French
      'tableau de bord': '/',
      'comptabilité': '/accounting',
      'factures': '/invoices',
      'rapports': '/reports',
      'paramètres': '/settings',
      // Spanish
      'panel': '/',
      'contabilidad': '/accounting',
      'facturas': '/invoices',
      'presupuestos': '/budgets',
      'informes': '/reports',
      'configuración': '/settings',
      // Arabic transliterated
      'lawhat altahakum': '/',
      'almuhasaba': '/accounting',
    };

    for (const [key, path] of Object.entries(navigationMap)) {
      if (lowerCommand.includes(key)) {
        navigate(path);
        toast.success(t('voice.commandRecognized'), {
          description: `Navigating to ${key}`,
        });
        return;
      }
    }

    // Theme commands
    if (lowerCommand.includes('dark') || lowerCommand.includes('sombre') || lowerCommand.includes('oscuro')) {
      document.documentElement.classList.add('dark');
      toast.success(t('voice.commandRecognized'), { description: 'Dark mode activated' });
      return;
    }

    if (lowerCommand.includes('light') || lowerCommand.includes('clair') || lowerCommand.includes('claro')) {
      document.documentElement.classList.remove('dark');
      toast.success(t('voice.commandRecognized'), { description: 'Light mode activated' });
      return;
    }

    // Custom command callback
    onCommand?.(command);
  }, [navigate, onCommand, t]);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error('Voice commands are not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language === 'ar' ? 'ar-SA' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      const current = event.results[event.results.length - 1];
      const text = current[0].transcript;
      setTranscript(text);
      
      if (current.isFinal) {
        processCommand(text);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [language, processCommand]);

  if (!isSupported) return null;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startListening}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl transition-all",
          isListening
            ? "bg-destructive text-destructive-foreground"
            : "bg-muted/50 hover:bg-muted"
        )}
      >
        {isListening ? (
          <>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              <Mic className="w-4 h-4" />
            </motion.div>
            <span className="text-sm hidden sm:inline">{t('voice.listening')}</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm hidden sm:inline">{t('voice.clickToSpeak')}</span>
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {isListening && transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              "absolute top-full mt-2 z-50 bg-popover border border-border rounded-xl shadow-lg p-3 min-w-[200px]",
              isRTL ? "left-0" : "right-0"
            )}
          >
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-primary" />
              <p className="text-sm">{transcript}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
