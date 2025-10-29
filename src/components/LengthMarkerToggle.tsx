'use client';

interface LengthMarkerToggleProps {
  value: string
  onChange: (marker: string) => void
}

const MARKERS = [
  { value: '[]', label: '[N]' },
  { value: '{}', label: '{N}' },
  { value: '()', label: '(N)' },
  { value: '<>', label: '<N>' },
] as const

export default function LengthMarkerToggle({ value, onChange }: LengthMarkerToggleProps) {
  return (
    <div className="flex flex-col space-y-tatami-xs">
      <label className="text-sm font-medium text-primary-700">Length Marker</label>
      <div className="flex overflow-hidden rounded-lg border border-primary-300">
        {MARKERS.map((marker) => (
          <button
            key={marker.value}
            type="button"
            onClick={() => onChange(marker.value)}
            className={`min-w-12 flex-1 px-tatami-sm py-tatami-xs text-sm transition-colors ${
              value === marker.value
                ? 'bg-primary-600 text-white'
                : 'bg-white text-primary-700 hover:bg-primary-50'
            }`}
          >
            {marker.label}
          </button>
        ))}
      </div>
    </div>
  )
}
