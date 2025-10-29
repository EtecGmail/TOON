import { create } from 'zustand'
import { decodeToon as decodeToonLib, encodeToon as encodeToonLib } from '@/lib/toon/encodeDecode'
import { estimateTokens } from '@/lib/tokenizer/estimate'

interface PlaygroundMetrics {
  jsonTokens: number
  toonTokens: number
  savings: number
}

interface PlaygroundState {
  jsonInput: string
  toonInput: string
  delimiter: string
  lengthMarker: string
  metrics: PlaygroundMetrics
  setJsonInput: (input: string) => void
  setToonInput: (input: string) => void
  setDelimiter: (delimiter: string) => void
  setLengthMarker: (marker: string) => void
  encodeToon: () => void
  decodeToon: () => void
  calculateMetrics: () => void
}

export const usePlaygroundStore = create<PlaygroundState>((set, get) => ({
  jsonInput: '',
  toonInput: '',
  delimiter: '\t',
  lengthMarker: '[]',
  metrics: {
    jsonTokens: 0,
    toonTokens: 0,
    savings: 0,
  },

  setJsonInput: (jsonInput: string) => {
    set({ jsonInput })
    get().calculateMetrics()
  },

  setToonInput: (toonInput: string) => {
    set({ toonInput })
    get().calculateMetrics()
  },

  setDelimiter: (delimiter: string) => {
    set({ delimiter })
    const { jsonInput } = get()
    if (jsonInput.trim()) {
      get().encodeToon()
    }
  },

  setLengthMarker: (lengthMarker: string) => {
    set({ lengthMarker })
    const { jsonInput } = get()
    if (jsonInput.trim()) {
      get().encodeToon()
    }
  },

  encodeToon: () => {
    const { jsonInput, delimiter, lengthMarker } = get()

    if (!jsonInput.trim()) {
      set({ toonInput: '' })
      set((state) => ({
        metrics: {
          ...state.metrics,
          toonTokens: 0,
          savings: 0,
        },
      }))
      return
    }

    try {
      const toonOutput = encodeToonLib(jsonInput, { delimiter, lengthMarker })
      set({ toonInput: toonOutput })
      get().calculateMetrics()
    } catch (error) {
      console.error('Erro na codificação TOON:', error)
      set({
        toonInput: 'Erro: JSON inválido ou estrutura não suportada',
        metrics: { jsonTokens: 0, toonTokens: 0, savings: 0 },
      })
    }
  },

  decodeToon: () => {
    const { toonInput, delimiter } = get()

    if (!toonInput.trim()) {
      set({ jsonInput: '' })
      set((state) => ({
        metrics: {
          ...state.metrics,
          jsonTokens: 0,
          savings: 0,
        },
      }))
      return
    }

    try {
      const jsonOutput = decodeToonLib(toonInput, { delimiter })
      set({ jsonInput: JSON.stringify(jsonOutput, null, 2) })
      get().calculateMetrics()
    } catch (error) {
      console.error('Erro na decodificação TOON:', error)
      set({
        jsonInput: 'Erro: TOON inválido ou malformado',
        metrics: { jsonTokens: 0, toonTokens: 0, savings: 0 },
      })
    }
  },

  calculateMetrics: () => {
    const { jsonInput, toonInput } = get()

    const jsonTokens = estimateTokens(jsonInput)
    const toonTokens = estimateTokens(toonInput)
    const savings = jsonTokens > 0 ? ((jsonTokens - toonTokens) / jsonTokens) * 100 : 0

    set({
      metrics: {
        jsonTokens,
        toonTokens,
        savings: Math.round(savings * 100) / 100,
      },
    })
  },
}))
