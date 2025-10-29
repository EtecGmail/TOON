export interface ValidationResult {
  isValid: boolean
  error?: string
  details?: string
  suggestions?: string[]
  suggestedFix?: string
  diff?: {
    added?: string
    removed?: string
  }
  structure?: string
  dataLines?: number
  delimiter?: string
}

const DELIMITER_CANDIDATES = [',', '\t', '|', ';'] as const

export function validateToon(toonString: string): ValidationResult {
  if (!toonString.trim()) {
    return {
      isValid: false,
      error: 'TOON vazio',
      details: 'Insira dados TOON para validação.',
    }
  }

  const lines = toonString
    .split('\n')
    .map((line) => line.trimEnd())
    .filter((line) => line.trim().length > 0 && !line.trimStart().startsWith('//'))

  if (lines.length === 0) {
    return {
      isValid: false,
      error: 'Nenhuma linha válida encontrada',
    }
  }

  const headerLine = lines[0]
  const headerMatch = headerLine.match(/^(\w+)\s*([\[\{\(<])(\d+)([\]\}\)>])\s*\{([^}]+)\}:$/)

  if (!headerMatch) {
    return validateMalformedHeader(headerLine)
  }

  const [, name, , declaredCountRaw, , fieldsStr] = headerMatch
  const declaredCount = Number.parseInt(declaredCountRaw, 10)
  const fields = fieldsStr.split(/[,\t]/).map((field) => field.trim()).filter(Boolean)

  const dataLines = lines.slice(1)
  const delimiter = detectDelimiter(dataLines)

  if (dataLines.length !== declaredCount) {
    const fixedHeader = headerLine.replace(
      /([\[\{\(<])\d+([\]\}\)>])/,
      (_match, open: string, close: string) => `${open}${dataLines.length}${close}`,
    )
    return {
      isValid: false,
      error: 'Contagem de linhas incorreta',
      details: `Declarado [${declaredCount}], encontrado ${dataLines.length} linhas de dados.`,
      suggestions: [
        `Ajuste o header para [${dataLines.length}]`,
        dataLines.length < declaredCount
          ? `Adicione ${declaredCount - dataLines.length} linha(s) de dados.`
          : `Remova ${dataLines.length - declaredCount} linha(s) de dados.`,
      ],
      suggestedFix: toonString.replace(headerLine, fixedHeader),
      diff: {
        removed: `[${declaredCount}]`,
        added: `[${dataLines.length}]`,
      },
    }
  }

  for (let index = 0; index < dataLines.length; index += 1) {
    const line = dataLines[index]
    const values = line.split(delimiter)

    if (values.length !== fields.length) {
      return {
        isValid: false,
        error: `Número de campos incorreto na linha ${index + 1}`,
        details: `Esperado ${fields.length} campos, encontrado ${values.length}.`,
        suggestions: [
          `Verifique se o delimitador '${delimiter === '\t' ? 'TAB' : delimiter}' é consistente.`,
          `Verifique campos vazios ou delimitadores extras na linha ${index + 1}.`,
          'Considere usar aspas para valores que contenham o delimitador.',
        ],
      }
    }

    const quotingSuggestions = checkQuotingNeeded(values, fields, delimiter)
    if (quotingSuggestions.length > 0) {
      return {
        isValid: false,
        error: `Valores podem precisar de quoting na linha ${index + 1}`,
        details: 'Alguns valores contêm caracteres especiais.',
        suggestions: quotingSuggestions,
      }
    }
  }

  return {
    isValid: true,
    structure: `${name}[${declaredCount}]{${fields.join(', ')}}`,
    dataLines: dataLines.length,
    delimiter: delimiter === '\t' ? 'TAB' : delimiter,
  }
}

function detectDelimiter(dataLines: string[]): string {
  const sampleLine = dataLines.find((line) => line.trim().length > 0) ?? ''

  for (const candidate of DELIMITER_CANDIDATES) {
    if (sampleLine.includes(candidate)) {
      return candidate
    }
  }

  return ','
}

function validateMalformedHeader(headerLine: string): ValidationResult {
  const suggestions: string[] = []

  if (!headerLine.includes(':')) {
    suggestions.push('Adicione : no final do header.')
  }

  if (!/[\[\{\(<]\d+[\]\}\)>]/.test(headerLine)) {
    suggestions.push('Adicione [N] com a contagem exata de itens.')
  }

  if (!/\{[^}]+\}/.test(headerLine)) {
    suggestions.push('Adicione {campo1,campo2} com a lista de campos.')
  }

  return {
    isValid: false,
    error: 'Header malformado',
    details: 'O header deve seguir o formato: nome[N]{campo1,campo2}:',
    suggestions,
  }
}

function checkQuotingNeeded(values: string[], fields: string[], delimiter: string): string[] {
  const suggestions: string[] = []

  values.forEach((value, index) => {
    const trimmed = value.trim()
    const field = fields[index] ?? `Campo ${index + 1}`

    if (trimmed.includes(delimiter) && !isQuoted(trimmed)) {
      suggestions.push(`Campo "${field}": valor "${trimmed}" contém delimitador - use aspas.`)
    }

    if (trimmed.includes(':') && !isQuoted(trimmed)) {
      suggestions.push(`Campo "${field}": valor "${trimmed}" contém ':' - use aspas.`)
    }

    if (looksLikeNumber(trimmed) && value !== trimmed) {
      suggestions.push(`Campo "${field}": valor "${trimmed}" parece número mas tem espaços extras.`)
    }

    if (['true', 'false', 'null'].includes(trimmed) && !isQuoted(trimmed)) {
      suggestions.push(`Campo "${field}": valor "${trimmed}" é literal - use aspas se for string.`)
    }

    if (trimmed.startsWith('-') && looksLikeNumber(trimmed.slice(1)) && !isQuoted(trimmed)) {
      suggestions.push(`Campo "${field}": valor "${trimmed}" é número negativo - use aspas se for string.`)
    }
  })

  return suggestions
}

function isQuoted(value: string): boolean {
  return (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  )
}

function looksLikeNumber(value: string): boolean {
  return /^-?\d+(?:\.\d+)?$/.test(value.trim())
}
