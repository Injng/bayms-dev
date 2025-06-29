import { writable } from 'svelte/store';

export interface Highlight {
  id: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  addedAt: Date;
}

// initialize with some default highlights or empty array
const defaultHighlights: Highlight[] = [];

export const highlights = writable<Highlight[]>(defaultHighlights);

// helper functions
export function addHighlight(highlight: Omit<Highlight, 'id' | 'addedAt'>) {
  const newHighlight: Highlight = {
    ...highlight,
    id: crypto.randomUUID(),
    addedAt: new Date()
  };
  
  highlights.update(current => [newHighlight, ...current]);
}

export function removeHighlight(id: string) {
  highlights.update(current => current.filter(h => h.id !== id));
}

export function updateHighlight(id: string, updates: Partial<Highlight>) {
  highlights.update(current => 
    current.map(h => h.id === id ? { ...h, ...updates } : h)
  );
} 