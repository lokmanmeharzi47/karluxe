'use client';

import { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { addColor } from '@/app/actions/colors';

type Color = { id: string; name: string; hex_code: string | null; }

export default function ColorSelectorClient({ 
  initialColors, 
  defaultSelected = [] 
}: { 
  initialColors: Color[], 
  defaultSelected?: string[] 
}) {
  const [colors, setColors] = useState<Color[]>(initialColors);
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelected);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newHex, setNewHex] = useState('#000000');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleColor = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleAddColor = async () => {
    if (!newName.trim() || !newHex) return;
    
    setIsSubmitting(true);
    const result = await addColor(newName.trim(), newHex);
    setIsSubmitting(false);

    if (result.success && result.color) {
      setColors(prev => [...prev, result.color]);
      setSelectedIds(prev => [...prev, result.color.id]);
      setIsAdding(false);
      setNewName('');
      setNewHex('#000000');
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="space-y-3">
      {/* Hidden inputs to pass data with native form submission */}
      {selectedIds.map(id => (
        <input key={id} type="hidden" name="colors" value={id} />
      ))}

      <div className="flex flex-wrap gap-2">
        {colors.map(color => (
          <label 
            key={color.id} 
            className={`flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer transition-colors ${
              selectedIds.includes(color.id) 
                ? 'border-primary bg-primary/5' 
                : 'border-outline-variant hover:bg-surface-variant'
            }`}
          >
            <input 
              type="checkbox" 
              checked={selectedIds.includes(color.id)}
              onChange={() => handleToggleColor(color.id)}
              className="text-primary rounded border-outline-variant focus:ring-primary" 
            />
            <div className="w-4 h-4 rounded-full border border-outline-variant/30" style={{ backgroundColor: color.hex_code || '#cccccc' }}></div>
            <span className="font-body-sm text-on-surface">{color.name}</span>
          </label>
        ))}

        {!isAdding && (
          <button 
            type="button" 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 px-3 py-2 border border-dashed border-primary text-primary rounded-md hover:bg-primary/5 transition-colors font-body-sm"
          >
            <Plus size={16} /> Ajouter une couleur
          </button>
        )}
      </div>

      {isAdding && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-surface-variant/30 border border-outline-variant rounded-md mt-2">
          <input 
            type="color" 
            value={newHex}
            onChange={(e) => setNewHex(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer p-0 border-0 bg-transparent"
          />
          <input 
            type="text" 
            placeholder="Nom (ex: Turquoise)" 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="px-3 py-1.5 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary w-40"
          />
          <button 
            type="button" 
            onClick={handleAddColor}
            disabled={isSubmitting || !newName.trim()}
            className="p-1.5 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <Check size={16} />
          </button>
          <button 
            type="button" 
            onClick={() => setIsAdding(false)}
            className="p-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
