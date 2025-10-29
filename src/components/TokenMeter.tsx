'use client';

interface TokenMetrics {
  jsonTokens: number
  toonTokens: number
  savings: number
}

interface TokenMeterProps {
  metrics: TokenMetrics
}

export default function TokenMeter({ metrics }: TokenMeterProps) {
  const { jsonTokens, toonTokens, savings } = metrics
  const ratio = jsonTokens > 0 ? (toonTokens / jsonTokens) * 100 : 0

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="mb-tatami-md text-xl font-semibold text-primary-800">Medidor de Tokens</h2>

        <div className="mb-tatami-md">
          <div className="mb-tatami-xs flex justify-between text-sm text-primary-600">
            <span>JSON: {jsonTokens} tokens</span>
            <span>TOON: {toonTokens} tokens</span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-primary-100">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${Math.max(10, Math.min(100, ratio || 0))}%` }}
            />
          </div>
        </div>

        <div className="space-y-tatami-sm text-sm">
          <div className="flex justify-between">
            <span className="text-primary-600">Economia:</span>
            <span
              className={`font-semibold ${
                savings > 0
                  ? 'text-green-600'
                  : savings < 0
                    ? 'text-red-600'
                    : 'text-primary-600'
              }`}
            >
              {savings > 0 ? `-${savings}%` : `${Math.abs(savings)}%`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-primary-600">Tokens salvos:</span>
            <span className="font-mono text-green-600">{jsonTokens - toonTokens}</span>
          </div>

          {savings > 30 && (
            <div className="rounded border border-green-200 bg-green-50 p-tatami-sm text-center text-sm text-green-700">
              🎯 TOON Ótimo
            </div>
          )}

          {savings < 10 && savings > 0 && (
            <div className="rounded border border-yellow-200 bg-yellow-50 p-tatami-sm text-center text-sm text-yellow-700">
              💡 Pode melhorar
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
