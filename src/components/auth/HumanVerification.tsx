import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RotateCcw, ShieldCheck } from 'lucide-react';

interface HumanVerificationProps {
  onVerified: (verified: boolean) => void;
  verified: boolean;
}

export function HumanVerification({ onVerified, verified }: HumanVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sliderX, setSliderX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const threshold = 85; // percentage needed to verify

  const handleDragStart = () => {
    if (verified) return;
    setIsDragging(true);
  };

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging || !trackRef.current || verified) return;
    const rect = trackRef.current.getBoundingClientRect();
    const maxX = rect.width - 48;
    const x = Math.max(0, Math.min(clientX - rect.left - 24, maxX));
    const pct = (x / maxX) * 100;
    setSliderX(x);
    setProgress(pct);
  }, [isDragging, verified]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (progress >= threshold) {
      setIsVerifying(true);
      // Simulate server-side verification
      setTimeout(() => {
        setIsVerifying(false);
        onVerified(true);
      }, 800);
    } else {
      setSliderX(0);
      setProgress(0);
    }
  }, [isDragging, progress, onVerified]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientX);
    const onEnd = () => handleDragEnd();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const reset = () => {
    onVerified(false);
    setSliderX(0);
    setProgress(0);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          Security Verification
        </span>
        {verified && (
          <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      <div
        ref={trackRef}
        className={`relative h-12 rounded-xl border overflow-hidden select-none transition-colors ${
          verified
            ? 'bg-success/10 border-success/30'
            : 'bg-muted/50 border-muted-foreground/20'
        }`}
      >
        {/* Fill */}
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-xl ${
            verified ? 'bg-success/20' : 'bg-primary/10'
          }`}
          style={{ width: verified ? '100%' : `${progress}%` }}
          animate={verified ? { width: '100%' } : undefined}
        />

        {/* Label */}
        <AnimatePresence mode="wait">
          {verified ? (
            <motion.div
              key="verified"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center gap-2 text-success font-medium text-sm"
            >
              <Check className="w-4 h-4" />
              Verified — You're human
            </motion.div>
          ) : isVerifying ? (
            <motion.div
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center gap-2 text-muted-foreground text-sm"
            >
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              Verifying...
            </motion.div>
          ) : (
            <motion.div
              key="slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm pointer-events-none"
            >
              Slide to verify you're human
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slider thumb */}
        {!verified && !isVerifying && (
          <motion.div
            className="absolute top-1 left-1 w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg"
            style={{ x: sliderX }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            whileHover={{ scale: 1.05 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  );
}
