'use client';

import { useState } from 'react'
import { validateToon, type ValidationResult } from '@/lib/toon/validator'

export default function Validator() {
  const [toonInput, setToonInput] = useState('')
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)

  const handleValidate = () => {
    const result = validateToon(toonInput)
    setValidationResult(result)
  }

  const handleAutoFix = () => {
    if (validationResult?.suggestedFix) {
      setToonInput(validationResult.suggestedFix)
      requestAnimationFrame(() => {
        setValidationResult(validateToon(validationResult.suggestedFix ?? ''))
      })
    }
  }

  return (
    <div className="container-ma">
      <h1 className="mb-tatami-lg text-3xl font-bold text-primary-800">Validador TOON</h1>

      <div className="grid grid-cols-1 gap-tatami-lg lg:grid-cols-2">
        <div className="card">
          <div className="card-body">
            <h2 className="mb-tatami-md text-xl font-semibold text-primary-800">
              Insira o TOON para validar
            </h2>

        <textarea
          value={toonInput}
          onChange={(event: { target: { value: string } }) =>
            setToonInput(event.target.value)
          }
              className="h-80 w-full resize-none rounded border border-primary-300 p-tatami-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Cole seu TOON aqui para validação..."
            />

            <div className="mt-tatami-md flex gap-tatami-sm">
              <button type="button" onClick={handleValidate} className="btn-primary" disabled={!toonInput.trim()}>
                Validar TOON
              </button>

              {validationResult?.suggestedFix && (
                <button type="button" onClick={handleAutoFix} className="btn">
                  Aplicar Correção
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="mb-tatami-md text-xl font-semibold text-primary-800">
              Resultado da Validação
            </h2>

            {!validationResult ? (
              <div className="py-tatami-xl text-center text-primary-500">
                Insira TOON e clique em Validar para ver os resultados.
              </div>
            ) : validationResult.isValid ? (
              <div className="rounded border border-green-200 bg-green-50 p-tatami-md">
                <div className="flex items-center text-green-800">
                  <span className="mr-tatami-sm text-lg" aria-hidden="true">
                    ✅
                  </span>
                  <span className="font-semibold">TOON válido!</span>
                </div>
                <div className="mt-tatami-sm space-y-tatami-xs text-sm text-green-700">
                  <p>Estrutura: {validationResult.structure}</p>
                  <p>Linhas de dados: {validationResult.dataLines}</p>
                  <p>Delimitador: {validationResult.delimiter}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-tatami-md">
                <div className="rounded border border-red-200 bg-red-50 p-tatami-md">
                  <div className="flex items-center text-red-800">
                    <span className="mr-tatami-sm text-lg" aria-hidden="true">
                      ❌
                    </span>
                    <span className="font-semibold">{validationResult.error}</span>
                  </div>
                  {validationResult.details && (
                    <p className="mt-tatami-xs text-sm text-red-700">{validationResult.details}</p>
                  )}
                </div>

                {validationResult.suggestions && validationResult.suggestions.length > 0 && (
                  <div className="rounded border border-yellow-200 bg-yellow-50 p-tatami-md">
                    <h3 className="mb-tatami-sm font-semibold text-yellow-800">Sugestões:</h3>
                    <ul className="space-y-tatami-xs text-sm text-yellow-700">
                      {validationResult.suggestions.map((suggestion) => (
                        <li key={suggestion}>• {suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {validationResult.diff && (
                  <div className="rounded border border-blue-200 bg-blue-50 p-tatami-md">
                    <h3 className="mb-tatami-sm font-semibold text-blue-800">Preview da Correção:</h3>
                    <div className="rounded bg-white p-tatami-sm font-mono text-xs">
                      {validationResult.diff.added && (
                        <pre className="text-green-600">+ {validationResult.diff.added}</pre>
                      )}
                      {validationResult.diff.removed && (
                        <pre className="text-red-600">- {validationResult.diff.removed}</pre>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
