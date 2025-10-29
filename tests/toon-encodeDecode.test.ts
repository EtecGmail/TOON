import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { decodeToon, encodeToon } from '../src/lib/toon/encodeDecode'

describe('TOON encode/decode', () => {
  const sampleJson = JSON.stringify({
    users: [
      { id: 1, name: 'Alice', role: 'admin' },
      { id: 2, name: 'Bob', role: 'user' },
    ],
  })

  it('codifica JSON em TOON tabular', () => {
    const toon = encodeToon(sampleJson)
    assert.ok(toon.includes('users[2]{id\tname\trole}:'))
    assert.equal(toon.split('\n').length, 3)
  })

  it('codifica JSON com marcador de comprimento customizado', () => {
    const toon = encodeToon(sampleJson, { lengthMarker: '{}' })
    assert.ok(toon.startsWith('users{2}'))
  })

  it('decodifica TOON para JSON', () => {
    const toon = `users[2]{id\tname\trole}:
1\tAlice\tadmin
2\tBob\tuser`

    const result = decodeToon(toon)
    assert.deepEqual(result, {
      users: [
        { id: 1, name: 'Alice', role: 'admin' },
        { id: 2, name: 'Bob', role: 'user' },
      ],
    })
  })
})
