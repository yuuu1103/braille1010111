"use client"

import { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { BrailleDisplay } from './braille-display';
import { englishToBraille, brailleToEnglish, zhuyinToBraille, brailleToZhuyin } from '@/lib/braille';

type Mode = 'english' | 'zhuyin';
type Direction = 'toBraille' | 'fromBraille';

export function BrailleConverter() {
  const [mode, setMode] = useState<Mode>('english');
  const [direction, setDirection] = useState<Direction>('toBraille');
  const [sourceText, setSourceText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handler = setTimeout(() => {
      if (sourceText === '') {
        setOutputText('');
        return;
      }
      
      if (direction === 'toBraille') {
        const result = mode === 'english' ? englishToBraille(sourceText) : zhuyinToBraille(sourceText);
        setOutputText(result);
      } else {
        const result = mode === 'english' ? brailleToEnglish(sourceText) : brailleToZhuyin(sourceText);
        setOutputText(result);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [sourceText, direction, mode, isMounted]);

  const handleSwap = () => {
    setDirection(prev => prev === 'toBraille' ? 'fromBraille' : 'toBraille');
    setSourceText(outputText);
    setOutputText(sourceText);
  };
  
  const handleModeChange = (newMode: string) => {
    setMode(newMode as Mode);
    setSourceText('');
    setOutputText('');
  }

  const { sourceLabel, outputLabel } = useMemo(() => {
    const language = mode === 'english' ? 'English' : '注音 (Zhuyin)';
    if (direction === 'toBraille') {
      return { sourceLabel: language, outputLabel: 'Braille' };
    }
    return { sourceLabel: 'Braille', outputLabel: language };
  }, [mode, direction]);

  const brailleOutputForDisplay = direction === 'toBraille' ? outputText : sourceText;

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <Tabs value={mode} onValueChange={handleModeChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="english">English</TabsTrigger>
            <TabsTrigger value="zhuyin">注音 (Zhuyin)</TabsTrigger>
          </TabsList>
          <TabsContent value="english">
            {/* Content is shared, logic is handled by state */}
          </TabsContent>
          <TabsContent value="zhuyin">
            {/* Content is shared, logic is handled by state */}
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 mt-4">
          <div className="w-full space-y-2">
            <Label htmlFor="source-input">{sourceLabel}</Label>
            <Textarea
              id="source-input"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={`Enter ${sourceLabel} here...`}
              className="min-h-[150px] resize-y"
              aria-label={`${sourceLabel} input`}
            />
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwap}
              aria-label="Swap conversion direction"
            >
              <ArrowRightLeft className="h-6 w-6 text-accent" />
            </Button>
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="output-input">{outputLabel}</Label>
            <Textarea
              id="output-input"
              value={outputText}
              readOnly
              placeholder={`${outputLabel} will appear here...`}
              className="min-h-[150px] resize-y bg-muted"
              aria-label={`${outputLabel} output`}
            />
          </div>
        </div>

        <BrailleDisplay brailleText={brailleOutputForDisplay} />
      </CardContent>
    </Card>
  );
}
