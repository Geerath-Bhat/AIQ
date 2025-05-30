import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type RelevanceValue = 'Relevant' | 'NonRelevant' | null;

interface InteractiveRelevanceTagsProps {
  questionId: string | number;
  initialValue?: RelevanceValue;
  onChange: (questionId: string | number, value: RelevanceValue) => void;
}

const InteractiveRelevanceTags: React.FC<InteractiveRelevanceTagsProps> = ({
  questionId,
  initialValue = null,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<RelevanceValue>(initialValue);

  useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  const handleClick = (value: 'Relevant' | 'NonRelevant') => {
    const newValue = selectedValue === value ? null : value;
    setSelectedValue(newValue);
    onChange(questionId, newValue);
    console.log(`InteractiveRelevanceTags (ID: ${questionId}): Value changed to ${newValue}`);
  };

  console.log(`Rendering InteractiveRelevanceTags (ID: ${questionId}), selected: ${selectedValue}`);

  return (
    <div className="flex space-x-2">
      <Button
        variant={selectedValue === 'Relevant' ? 'default' : 'outline'}
        className={cn(
          "px-4 py-2 flex items-center transition-all duration-150 ease-in-out",
          selectedValue === 'Relevant' && "bg-green-500 hover:bg-green-600 text-white"
        )}
        onClick={() => handleClick('Relevant')}
        aria-pressed={selectedValue === 'Relevant'}
      >
        {selectedValue === 'Relevant' ? (
          <CheckCircle className="mr-2 h-5 w-5" />
        ) : (
          <ThumbsUp className="mr-2 h-5 w-5" />
        )}
        Relevant
      </Button>
      <Button
        variant={selectedValue === 'NonRelevant' ? 'default' : 'outline'}
        className={cn(
          "px-4 py-2 flex items-center transition-all duration-150 ease-in-out",
          selectedValue === 'NonRelevant' && "bg-red-500 hover:bg-red-600 text-white"
        )}
        onClick={() => handleClick('NonRelevant')}
        aria-pressed={selectedValue === 'NonRelevant'}
      >
        {selectedValue === 'NonRelevant' ? (
          <XCircle className="mr-2 h-5 w-5" />
        ) : (
          <ThumbsDown className="mr-2 h-5 w-5" />
        )}
        Non-Relevant
      </Button>
    </div>
  );
};

export default InteractiveRelevanceTags;