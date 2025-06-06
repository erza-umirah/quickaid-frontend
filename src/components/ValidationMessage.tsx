import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

interface ValidationMessageProps {
  type: 'error' | 'success';
  message: string;
  className?: string;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  type,
  message,
  className = ''
}) => {
  return (
    <div 
      className={clsx(
        'flex items-center gap-2 text-sm animate-slide-up',
        type === 'error' ? 'text-error-600' : 'text-success-600',
        className
      )}
    >
      {type === 'error' ? (
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
      ) : (
        <CheckCircle className="w-4 h-4 flex-shrink-0" />
      )}
      <span>{message}</span>
    </div>
  );
}; 