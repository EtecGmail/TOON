import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { validateToon } from '../src/lib/toon/validator'

describe('TOON Validator', () => {
  it('valida TOON correto', () => {
    const validToon = `users[2]{id\tname\trole}:
1\tAlice\tadmin
2\tBob\tuser`

    const result = validateToon(validToon)
    assert.equal(result.isValid, true)
    assert.equal(result.structure, 'users[2]{id, name, role}')
  })

  it('detecta contagem incorreta', () => {
    const invalidToon = `users[3]{id\tname}:
1\tAlice
2\tBob`

    const result = validateToon(invalidToon)
    assert.equal(result.isValid, false)
    assert.ok(result.error?.includes('Contagem de linhas incorreta'))
    assert.ok(result.suggestions?.includes('Ajuste o header para [2]'))
  })

  it('detecta header malformado', () => {
    const invalidToon = `users{id,name}:
1,Alice
2,Bob`

    const result = validateToon(invalidToon)
    assert.equal(result.isValid, false)
    assert.equal(result.error, 'Header malformado')
    assert.ok(result.suggestions?.includes('Adicione [N] com a contagem exata de itens.'))
  })

  it('sugere quoting quando necessário', () => {
    const toonWithColon = `products[1]{name\tdesc}:
Widget\tContains: colon`

    const result = validateToon(toonWithColon)
    assert.equal(result.isValid, false)
    assert.ok(result.suggestions?.some((suggestion) => suggestion.includes('use aspas')))
  })
})
