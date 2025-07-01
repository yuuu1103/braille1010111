"use client"

import { useState, type FC } from 'react';
import { Button } from '@/components/ui/button';
import { braillePatternToChar } from '@/lib/braille';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BrailleDotInputProps {
  onAddChar: (char: string) => void;
  className?: string;
}

const BrailleDotInput: FC<BrailleDotInputProps> = ({ onAddChar, className }) => {
  const [dots, setDots] = useState<boolean[]>(Array(6).fill(false));

  const toggleDot = (index: number) => {
    const newDots = [...dots];
    newDots[index] = !newDots[index];
    setDots(newDots);
  };

  const handleAddChar = () => {
    const brailleChar = braillePatternToChar(dots);
    onAddChar(brailleChar);
    setDots(Array(6).fill(false)); // Clear after adding
  };

  const handleClear = () => {
    setDots(Array(6).fill(false));
  };
  
  const dotPositions = [
    { top: '16.67%', left: '25%' }, // dot 1
    { top: '50%', left: '25%' },     // dot 2
    { top: '83.33%', left: '25%' }, // dot 3
    { top: '16.67%', left: '75%' }, // dot 4
    { top: '50%', left: '75%' },     // dot 5
    { top: '83.33%', left: '75%' }, // dot 6
  ];

  return (
    <Card className={cn("mt-4", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Braille Dot Input</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-4">
        <div className="relative w-16 h-24 bg-muted rounded-md p-2">
          {dotPositions.map((pos, i) => (
            <button
              key={i}
              aria-label={`Dot ${i + 1}`}
              onClick={() => toggleDot(i)}
              className={cn(
                "absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-colors",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                dots[i] ? 'bg-foreground' : 'bg-background border'
              )}
              style={{ top: pos.top, left: pos.left }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={handleAddChar}>Add Character</Button>
          <Button onClick={handleClear} variant="outline">Clear Dots</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { BrailleDotInput };
