import React from 'react';
import { normalizeText } from './format';

interface HighlightProps {
  text: string;
  query: string;
  className?: string;
}

export function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  
  const normalizedText = normalizeText(text);
  const normalizedQuery = normalizeText(query);
  
  if (!normalizedText.includes(normalizedQuery)) {
    return text;
  }
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  
  return parts.map((part, index) => {
    if (normalizeText(part) === normalizedQuery) {
      return (
        <span key={index} className="bg-yellow-200 font-semibold">
          {part}
        </span>
      );
    }
    return part;
  });
}

export function Highlight({ text, query, className = '' }: HighlightProps) {
  return (
    <span className={className}>
      {highlight(text, query)}
    </span>
  );
}
