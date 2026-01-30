import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'validated' | 'pending' | 'rejected' | 'paid' | 'unpaid' | 'overdue' | 'on-track' | 'warning' | 'exceeded';
  size?: 'sm' | 'md';
}

const statusConfig = {
  validated: { label: 'Validated', className: 'bg-success/10 text-success border-success/20' },
  pending: { label: 'Pending', className: 'bg-warning/10 text-warning border-warning/20' },
  rejected: { label: 'Rejected', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  paid: { label: 'Paid', className: 'bg-success/10 text-success border-success/20' },
  unpaid: { label: 'Unpaid', className: 'bg-warning/10 text-warning border-warning/20' },
  overdue: { label: 'Overdue', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  'on-track': { label: 'On Track', className: 'bg-success/10 text-success border-success/20' },
  warning: { label: 'Warning', className: 'bg-warning/10 text-warning border-warning/20' },
  exceeded: { label: 'Exceeded', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium border rounded-full",
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        config.className
      )}
    >
      <span className={cn(
        "rounded-full mr-1.5",
        size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2',
        status === 'validated' || status === 'paid' || status === 'on-track' ? 'bg-success' :
        status === 'pending' || status === 'unpaid' || status === 'warning' ? 'bg-warning' :
        'bg-destructive'
      )} />
      {config.label}
    </span>
  );
}
