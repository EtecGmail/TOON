interface EncodeOptions {
  delimiter?: string
  lengthMarker?: string
}

interface DecodeOptions {
  delimiter?: string
}

interface ToonTable {
  name: string
  rows: Record<string, unknown>[]
  fields: string[]
}

function normalizeLengthMarker(marker: string) {
  return marker.length === 2 ? marker : '[]'
}

function inferTable(data: unknown): ToonTable {
  if (Array.isArray(data)) {
    return buildTableFromArray('items', data)
  }

  if (data && typeof data === 'object') {
    const entries = Object.entries(data as Record<string, unknown>)
    for (const [key, value] of entries) {
      if (Array.isArray(value) && value.every((item) => item && typeof item === 'object')) {
        return buildTableFromArray(key, value)
      }
    }
  }

  throw new Error('Estrutura JSON não suportada para TOON.')
}

function buildTableFromArray(name: string, array: unknown[]): ToonTable {
  if (array.length === 0) {
    throw new Error('Arrays vazios não podem ser convertidos para TOON.')
  }

  const rows = array.map((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      throw new Error('Apenas arrays de objetos planos são suportados.')
    }
    return item as Record<string, unknown>
  })

  const fields = Array.from(
    rows.reduce<Set<string>>((acc, row) => {
      Object.keys(row).forEach((key) => acc.add(key))
      return acc
    }, new Set<string>()),
  )

  return { name, rows, fields }
}

function formatValue(value: unknown, delimiter: string): string {
  if (value === null || value === undefined) {
    return 'null'
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  const stringValue = String(value)
  if (stringValue.includes('\n')) {
    throw new Error('Valores não podem conter quebras de linha em TOON.')
  }

  if (stringValue.includes(delimiter) || stringValue.includes(':')) {
    return `"${stringValue.replace(/"/g, '\\"')}"`
  }

  return stringValue
}

function parseValue(value: string): unknown {
  const trimmed = value.trim()
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"')
  }

  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (trimmed === 'null') return null

  const asNumber = Number(trimmed)
  if (!Number.isNaN(asNumber) && trimmed !== '') {
    return asNumber
  }

  return trimmed
}

export function encodeToon(jsonString: string, options: EncodeOptions = {}): string {
  const { delimiter = '\t', lengthMarker = '[]' } = options

  let data: unknown
  try {
    data = JSON.parse(jsonString)
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Erro desconhecido'
    throw new Error(`JSON inválido: ${reason}`)
  }

  const table = inferTable(data)
  const marker = normalizeLengthMarker(lengthMarker)
  const [open, close] = marker.split('')

  const header = `${table.name}${open}${table.rows.length}${close}{${table.fields.join(delimiter)}}:`
  const body = table.rows
    .map((row) => table.fields.map((field) => formatValue(row[field], delimiter)).join(delimiter))
    .join('\n')

  return `${header}\n${body}`
}

export function decodeToon(toonString: string, options: DecodeOptions = {}): Record<string, unknown> {
  const { delimiter = '\t' } = options

  if (!toonString.trim()) {
    return {}
  }

  const lines = toonString.split('\n').map((line) => line.trimEnd()).filter(Boolean)
  const header = lines.shift()

  if (!header) {
    throw new Error('TOON inválido: header ausente.')
  }

  const headerMatch = header.match(/^(\w+)\s*([\[\{\(<])(\d+)([\]\}\)>])\s*\{([^}]+)\}:$/)
  if (!headerMatch) {
    throw new Error('TOON inválido: header malformado.')
  }

  const [, name, , declaredCountRaw, , fieldsRaw] = headerMatch
  const declaredCount = Number.parseInt(declaredCountRaw, 10)
  const fields = fieldsRaw.split(delimiter).map((field) => field.trim())

  if (lines.length !== declaredCount) {
    throw new Error(`TOON inválido: esperado ${declaredCount} linha(s), recebido ${lines.length}.`)
  }

  const records = lines.map((line, index) => {
    const values = line.split(delimiter)
    if (values.length !== fields.length) {
      throw new Error(`TOON inválido: número de campos incorreto na linha ${index + 1}.`)
    }

    return fields.reduce<Record<string, unknown>>((acc, field, fieldIndex) => {
      acc[field] = parseValue(values[fieldIndex])
      return acc
    }, {})
  })

  return { [name]: records }
}
