
import React from 'react';

interface InputGroupProps {
  label: string;
  icon: string;
  // Fixed: Allow boolean values to resolve type errors on lines 175, 202, 203 in App.tsx
  value: number | string | boolean;
  onChange: (val: any) => void;
  type?: 'number' | 'text' | 'select' | 'checkbox';
  options?: { value: string; label: string }[];
  suffix?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({ 
  label, icon, value, onChange, type = 'number', options, suffix 
}) => {
  return (
    <div className="mb-4">
      <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
        <i className={`${icon} mr-2 text-emerald-600`}></i>
        {label}
      </label>
      
      {type === 'select' ? (
        <select 
          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
        >
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="ml-2 text-slate-600">Enabled</span>
        </label>
      ) : (
        <div className="relative">
          <input 
            type={type}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            value={value as string | number}
            onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          />
          {suffix && (
            <span className="absolute right-4 top-2 text-slate-400 text-sm">
              {suffix}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
