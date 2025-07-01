"use client"

import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface BrailleCellProps {
  dots: boolean[];
  className?: string;
}

const BrailleCell: FC<BrailleCellProps> = ({ dots, className }) => {
  const dotPositions = [
    { cx: '25%', cy: '16.67%' }, // dot 1
    { cx: '25%', cy: '50%' },     // dot 2
    { cx: '25%', cy: '83.33%' }, // dot 3
    { cx: '75%', cy: '16.67%' }, // dot 4
    { cx: '75%', cy: '50%' },     // dot 5
    { cx: '75%', cy: '83.33%' }, // dot 6
  ];

  return (
    <div className={cn("inline-block w-8 h-12", className)}>
      <svg
        viewBox="0 0 100 150"
        aria-hidden="true"
        className="w-full h-full"
      >
        {dotPositions.map((pos, i) => (
          <circle
            key={i}
            cx={pos.cx}
            cy={pos.cy}
            r="14"
            className={dots[i] ? 'fill-foreground' : 'fill-muted'}
          />
        ))}
      </svg>
    </div>
  );
};

export { BrailleCell };
