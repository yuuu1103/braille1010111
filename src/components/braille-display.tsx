"use client"

import type { FC } from 'react';
import { getBrailleUnicodePattern } from '@/lib/braille';
import { BrailleCell } from './braille-cell';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface BrailleDisplayProps {
  brailleText: string;
}

const BrailleDisplay: FC<BrailleDisplayProps> = ({ brailleText }) => {
  if (!brailleText) {
    return null;
  }
  
  const brailleChars = brailleText.split('');

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Braille Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 p-2 bg-muted rounded-md" aria-label={`Braille visualization for: ${brailleText}`}>
          {brailleChars.map((char, index) => {
            if (char === '⠀') { // Handle space character
              return <div key={index} className="w-8 h-12" aria-label="space" />;
            }
            const dots = getBrailleUnicodePattern(char);
            return <BrailleCell key={index} dots={dots} />;
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export { BrailleDisplay };
