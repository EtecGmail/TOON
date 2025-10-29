'use client';

import { useState } from 'react'
import CopyToonButton from '@/components/CopyToonButton'
import DelimiterToggle from '@/components/DelimiterToggle'
import LengthMarkerToggle from '@/components/LengthMarkerToggle'
import TokenMeter from '@/components/TokenMeter'
import { usePlaygroundStore } from '@/store/usePlaygroundStore'

const TABS = [
  { id: 'json' as const, label: 'JSON' },
  { id: 'toon' as const, label: 'TOON' },
]

export default function Playground() {
  const {
    jsonInput,
    toonInput,
    delimiter,
    lengthMarker,
    setJsonInput,
    setToonInput,
    setDelimiter,
    setLengthMarker,
    encodeToon,
    decodeToon,
    metrics,
  } = usePlaygroundStore()

  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['id']>('json')

  return (
    <div className="container-ma">
      <div className="mb-tatami-lg flex flex-col gap-tatami-md md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-800">Playground</h1>
          <p className="text-primary-600">
            Experimente conversões JSON ↔ TOON em tempo real e acompanhe a economia de tokens.
          </p>
        </div>
        <div className="flex flex-wrap gap-tatami-md">
          <DelimiterToggle value={delimiter} onChange={setDelimiter} />
          <LengthMarkerToggle value={lengthMarker} onChange={setLengthMarker} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-tatami-lg xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="card">
            <div className="card-body">
              <div className="mb-tatami-md flex border-b border-primary-200">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`px-tatami-md py-tatami-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                      activeTab === tab.id
                        ? 'border-b-2 border-primary-600 text-primary-800'
                        : 'text-primary-500 hover:text-primary-700'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'json' ? (
                <textarea
                  value={jsonInput}
                  onChange={(event: { target: { value: string } }) =>
                    setJsonInput(event.target.value)
                  }
                  onBlur={encodeToon}
                  className="h-96 w-full resize-none rounded border border-primary-300 p-tatami-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Cole seu JSON aqui..."
                />
              ) : (
                <textarea
                  value={toonInput}
                  onChange={(event: { target: { value: string } }) =>
                    setToonInput(event.target.value)
                  }
                  onBlur={decodeToon}
                  className="h-96 w-full resize-none rounded border border-primary-300 p-tatami-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Cole seu TOON aqui..."
                />
              )}

              <div className="mt-tatami-md flex flex-col gap-tatami-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-tatami-sm">
                  <button
                    type="button"
                    onClick={encodeToon}
                    className="btn-primary"
                    disabled={!jsonInput.trim()}
                  >
                    JSON → TOON
                  </button>
                  <button
                    type="button"
                    onClick={decodeToon}
                    className="btn"
                    disabled={!toonInput.trim()}
                  >
                    TOON → JSON
                  </button>
                </div>

                <CopyToonButton toonText={toonInput} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-tatami-md">
          <TokenMeter metrics={metrics} />

          <div className="card">
            <div className="card-body">
              <h3 className="mb-tatami-sm font-semibold text-primary-800">Configuração Atual</h3>
              <dl className="space-y-tatami-xs text-sm">
                <div className="flex justify-between">
                  <dt className="text-primary-600">Delimitador:</dt>
                  <dd className="font-mono text-primary-800">{delimiter === '\t' ? 'TAB' : delimiter}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-primary-600">Length Marker:</dt>
                  <dd className="font-mono text-primary-800">{lengthMarker}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-primary-600">Tokens JSON:</dt>
                  <dd className="font-mono text-primary-800">{metrics.jsonTokens}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-primary-600">Tokens TOON:</dt>
                  <dd className="font-mono text-primary-800">{metrics.toonTokens}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
