import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MinusCircle, TrendingDown, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AIQLevel = 'High' | 'Medium' | 'Low' | null;

interface AIQLevelIndicatorProps {
  level: AIQLevel;
  summary?: string;
  showIcon?: boolean;
  showText?: boolean;
}

const levelConfig = {
  High: {
    bgColor: 'bg-green-100 dark:bg-green-900',
    textColor: 'text-green-700 dark:text-green-300',
    borderColor: 'border-green-500',
    icon: TrendingUp,
    text: 'High AIQ',
  },
  Medium: {
    bgColor: 'bg-yellow-100 dark:bg-yellow-900',
    textColor: 'text-yellow-700 dark:text-yellow-300',
    borderColor: 'border-yellow-500',
    icon: MinusCircle,
    text: 'Medium AIQ',
  },
  Low: {
    bgColor: 'bg-red-100 dark:bg-red-900',
    textColor: 'text-red-700 dark:text-red-300',
    borderColor: 'border-red-500',
    icon: TrendingDown,
    text: 'Low AIQ',
  },
  null: {
    bgColor: 'bg-gray-100 dark:bg-gray-700',
    textColor: 'text-gray-600 dark:text-gray-300',
    borderColor: 'border-gray-400',
    icon: Info,
    text: 'AIQ Not Calculated',
  }
};

const AIQLevelIndicator: React.FC<AIQLevelIndicatorProps> = ({
  level,
  summary,
  showIcon = true,
  showText = true,
}) => {
  console.log(`Rendering AIQLevelIndicator with level: ${level}`);

  const config = level ? levelConfig[level] : levelConfig.null;
  const IconComponent = config.icon;

  return (
    <div className={cn(
        "p-4 rounded-lg border-2 flex flex-col items-center space-y-2 shadow-sm w-full max-w-xs mx-auto",
        config.bgColor,
        config.borderColor
      )}
    >
      <div className="flex items-center space-x-2">
        {showIcon && <IconComponent className={cn("h-8 w-8", config.textColor)} />}
        {showText && (
            <span className={cn("text-xl font-semibold", config.textColor)}>
            {config.text}
            </span>
        )}
      </div>
      {level && (
        <Badge 
            variant="outline" 
            className={cn(
                "text-sm font-medium px-3 py-1",
                config.textColor,
                `border-${config.textColor.split('-')[1]}-500` // e.g. border-green-500
            )}
        >
            Level: {level}
        </Badge>
      )}
      {summary && (
        <p className={cn("text-xs text-center", config.textColor, "opacity-80")}>
          {summary}
        </p>
      )}
    </div>
  );
};

export default AIQLevelIndicator;