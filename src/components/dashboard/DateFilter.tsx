import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';

interface DateFilterProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const periods = [
  { label: 'This Month', value: 'this-month' },
  { label: 'Last Month', value: 'last-month' },
  { label: 'This Quarter', value: 'this-quarter' },
  { label: 'This Year', value: 'this-year' },
  { label: 'Last Year', value: 'last-year' },
];

export function DateFilter({ selectedPeriod, onPeriodChange }: DateFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedLabel = periods.find((p) => p.value === selectedPeriod)?.label || 'Select Period';

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
      >
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 right-0 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
        >
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => {
                onPeriodChange(period.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors ${
                selectedPeriod === period.value ? 'bg-primary/10 text-primary font-medium' : ''
              }`}
            >
              {period.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
