'use client';

import { use, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { renderMermaid, THEMES } from 'beautiful-mermaid';

export function Mermaid({ chart }: { chart: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return <MermaidContent chart={chart} />;
}

const cache = new Map<string, Promise<unknown>>();

function cachePromise<T>(
  key: string,
  setPromise: () => Promise<T>,
): Promise<T> {
  const cached = cache.get(key);
  if (cached) return cached;

  const promise = setPromise();
  cache.set(key, promise);
  return promise;
}

function MermaidContent({ chart }: { chart: string }) {
  const { resolvedTheme } = useTheme();
  use(cachePromise('mermaid', () => import('mermaid')));

  const baseTheme = resolvedTheme === 'dark' ? THEMES['catppuccin-mocha'] : THEMES['catppuccin-latte'];

  const svg = use(
    cachePromise(`${chart}-${resolvedTheme}`, async () => {
      const code = chart.replaceAll('\\n', '\n');
      
      return renderMermaid(code, baseTheme);
    })
  );

  return (
    <div
      className="flex justify-center my-6 overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
