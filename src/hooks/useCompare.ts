import { useState } from 'react';

export function useCompare() {
  const [compareList, setCompareList] = useState<number[]>([]);

  const toggleCompare = (id: number) => {
    setCompareList(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const clearCompare = () => setCompareList([]);

  return { compareList, toggleCompare, clearCompare };
}
