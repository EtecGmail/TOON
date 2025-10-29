'use client';

interface DelimiterToggleProps {
  value: string
  onChange: (delimiter: string) => void
}

const DELIMITERS = [
  { value: '\t', label: 'TAB', description: 'Recomendado - evita quoting' },
  { value: ',', label: 'Vírgula', description: 'JSON-like' },
  { value: '|', label: 'Pipe', description: 'Alternativo' },
  { value: ';', label: 'Ponto-e-vírgula', description: 'CSV-like' },
] as const

export default function DelimiterToggle({ value, onChange }: DelimiterToggleProps) {
  return (
    <div className="flex flex-col space-y-tatami-xs">
      <label className="text-sm font-medium text-primary-700">Delimitador</label>
      <div className="flex overflow-hidden rounded-lg border border-primary-300">
        {DELIMITERS.map((delimiter) => (
          <button
            key={delimiter.value}
            type="button"
            onClick={() => onChange(delimiter.value)}
            className={`min-w-16 flex-1 px-tatami-sm py-tatami-xs text-sm transition-colors ${
              value === delimiter.value
                ? 'bg-primary-600 text-white'
                : 'bg-white text-primary-700 hover:bg-primary-50'
            }`}
            title={delimiter.description}
          >
            {delimiter.label}
          </button>
        ))}
      </div>
    </div>
  )
}
