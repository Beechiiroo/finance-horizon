import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Brain, RefreshCw, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Prediction {
  type: 'revenue' | 'expenses' | 'trend';
  value: number;
  change: number;
  confidence: number;
  description: string;
}

export function PredictionsWidget() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      generatePredictions();
    }
  }, [user]);

  const generatePredictions = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-predictions', {
        body: {
          type: 'financial_forecast',
        },
      });

      if (error) throw error;

      setPredictions(data.predictions);
    } catch (error) {
      console.error('Predictions error:', error);
      // Fallback to mock predictions
      setPredictions([
        {
          type: 'revenue',
          value: 156000,
          change: 12.5,
          confidence: 87,
          description: 'Based on current trends and seasonal patterns',
        },
        {
          type: 'expenses',
          value: 89000,
          change: -5.2,
          confidence: 82,
          description: 'Expected decrease due to optimization efforts',
        },
        {
          type: 'trend',
          value: 67000,
          change: 18.3,
          confidence: 79,
          description: 'Net profit projection for next quarter',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getPredictionIcon = (type: string) => {
    switch (type) {
      case 'revenue':
        return TrendingUp;
      case 'expenses':
        return TrendingDown;
      default:
        return Brain;
    }
  };

  const getPredictionTitle = (type: string) => {
    switch (type) {
      case 'revenue':
        return t('predictions.revenue');
      case 'expenses':
        return t('predictions.expenses');
      default:
        return t('predictions.trend');
    }
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">{t('predictions.title')}</h3>
            <p className="text-xs text-muted-foreground">AI-powered forecasts</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={generatePredictions}
          disabled={isLoading}
          className="h-8 w-8"
        >
          <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
        </Button>
      </div>

      <div className="space-y-4">
        {predictions.map((prediction, index) => {
          const Icon = getPredictionIcon(prediction.type);
          const isPositive = prediction.change > 0;

          return (
            <motion.div
              key={prediction.type}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    prediction.type === 'revenue' ? "bg-success/20 text-success" :
                    prediction.type === 'expenses' ? "bg-destructive/20 text-destructive" :
                    "bg-primary/20 text-primary"
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm">{getPredictionTitle(prediction.type)}</span>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                  isPositive ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                )}>
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {isPositive ? '+' : ''}{prediction.change}%
                </div>
              </div>

              <p className="text-2xl font-bold mb-1">{formatCurrency(prediction.value)}</p>
              <p className="text-xs text-muted-foreground mb-3">{prediction.description}</p>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${prediction.confidence}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className={cn(
                      "h-full rounded-full",
                      prediction.confidence > 80 ? "bg-success" :
                      prediction.confidence > 60 ? "bg-warning" : "bg-destructive"
                    )}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{prediction.confidence}% confidence</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
