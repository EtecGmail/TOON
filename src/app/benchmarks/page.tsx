'use client';

import { useMemo, useState } from 'react'
import { estimateTokens } from '@/lib/tokenizer/estimate'
import { analyticsSample, ecommerceSample } from '@/samples/templates'

const SAMPLE_OPTIONS = [
  { id: 'ecommerce', label: 'E-commerce (Pedidos)' },
  { id: 'analytics', label: 'Analytics (Métricas)' },
] as const

type SampleId = (typeof SAMPLE_OPTIONS)[number]['id']

const SAMPLE_MAP: Record<SampleId, { json: string; toon: string }> = {
  ecommerce: ecommerceSample,
  analytics: analyticsSample,
}

function calculateSavings(json: string, toon: string) {
  const jsonTokens = estimateTokens(json)
  const toonTokens = estimateTokens(toon)
  const savings = jsonTokens > 0 ? ((jsonTokens - toonTokens) / jsonTokens) * 100 : 0

  return {
    jsonTokens,
    toonTokens,
    savings: Math.round(savings * 100) / 100,
    absoluteSavings: jsonTokens - toonTokens,
  }
}

export default function Benchmarks() {
  const [selectedSample, setSelectedSample] = useState<SampleId>('ecommerce')

  const sample = SAMPLE_MAP[selectedSample]

  const results = useMemo(() => calculateSavings(sample.json, sample.toon), [sample.json, sample.toon])

  return (
    <div className="container-ma">
      <h1 className="mb-tatami-lg text-3xl font-bold text-primary-800">Benchmarks</h1>

      <div className="grid grid-cols-1 gap-tatami-lg lg:grid-cols-3">
        <div className="space-y-tatami-md">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-tatami-md text-xl font-semibold text-primary-800">Configuração</h2>

              <div className="space-y-tatami-md">
                <div>
                  <label className="mb-tatami-xs block text-sm font-medium text-primary-700" htmlFor="sample-select">
                    Dataset de Exemplo
                  </label>
                  <select
                    id="sample-select"
                    value={selectedSample}
                    onChange={(event: { target: { value: string } }) =>
                      setSelectedSample(event.target.value as SampleId)
                    }
                    className="w-full rounded border border-primary-300 p-tatami-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {SAMPLE_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-tatami-xs block text-sm font-medium text-primary-700" htmlFor="tokenizer-select">
                    Tokenizer
                  </label>
                  <select
                    id="tokenizer-select"
                    defaultValue="cl100k"
                    className="w-full rounded border border-primary-300 p-tatami-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled
                  >
                    <option value="cl100k">cl100k_base (GPT-3.5/4)</option>
                    <option value="o200k">o200k_base (o1)</option>
                  </select>
                  <p className="mt-tatami-xs text-xs text-primary-500">
                    * Estimativa local com pesos aproximados. Para precisão absoluta use tokenizers oficiais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h2 className="mb-tatami-md text-xl font-semibold text-primary-800">Economia de Tokens</h2>

              <div className="space-y-tatami-sm text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-600">Tokens JSON:</span>
                  <span className="font-mono text-primary-800">{results.jsonTokens}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600">Tokens TOON:</span>
                  <span className="font-mono text-primary-800">{results.toonTokens}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600">Economia Absoluta:</span>
                  <span
                    className={`font-mono ${
                      results.absoluteSavings >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {results.absoluteSavings >= 0
                      ? `-${results.absoluteSavings}`
                      : `+${Math.abs(results.absoluteSavings)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-primary-700">Economia Percentual:</span>
                  <span className="font-mono text-green-600">{results.savings}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-tatami-md text-xl font-semibold text-primary-800">Comparação JSON vs TOON</h2>

              <div className="grid grid-cols-1 gap-tatami-md lg:grid-cols-2">
                <div>
                  <h3 className="mb-tatami-sm font-mono text-sm text-primary-600">
                    JSON ({results.jsonTokens} tokens)
                  </h3>
                  <pre className="h-96 overflow-x-auto rounded bg-primary-50 p-tatami-md text-xs">{sample.json}</pre>
                </div>
                <div>
                  <h3 className="mb-tatami-sm font-mono text-sm text-primary-600">
                    TOON ({results.toonTokens} tokens)
                  </h3>
                  <pre className="h-96 overflow-x-auto rounded bg-primary-50 p-tatami-md text-xs">{sample.toon}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
