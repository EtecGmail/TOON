import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { estimateTokens, estimateTokensDetailed } from '../src/lib/tokenizer/estimate'

describe('Token Estimator', () => {
  it('estima tokens para texto simples', () => {
    const text = 'Hello world'
    const tokens = estimateTokens(text)
    assert.ok(tokens > 0)
    assert.ok(tokens < 10)
  })

  it('retorna estimativas detalhadas', () => {
    const text = 'Hello world 123'
    const result = estimateTokensDetailed(text)
    assert.ok(result.cl100k_base > 0)
    assert.ok(result.o200k_base > 0)
    assert.ok(result.o200k_base <= result.cl100k_base)
  })

  it('lida com texto vazio', () => {
    assert.equal(estimateTokens(''), 0)
    assert.equal(estimateTokensDetailed('').cl100k_base, 0)
  })
})
