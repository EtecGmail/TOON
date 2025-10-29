interface TokenizerEstimate {
  cl100k_base: number
  o200k_base: number
}

const CHAR_WEIGHTS = {
  cl100k_base: {
    regular: 0.25,
    whitespace: 0.1,
    punctuation: 0.8,
    number: 0.3,
    emoji: 3.0,
  },
  o200k_base: {
    regular: 0.2,
    whitespace: 0.08,
    punctuation: 0.6,
    number: 0.25,
    emoji: 2.5,
  },
} as const

export function estimateTokens(text: string): number {
  if (!text) return 0

  let cl100kTokens = 0
  let o200kTokens = 0

  for (const char of Array.from(text)) {
    const weights = getCharWeights(char)
    cl100kTokens += weights.cl100k
    o200kTokens += weights.o200k
  }

  return Math.max(1, Math.round(cl100kTokens))
}

export function estimateTokensDetailed(text: string): TokenizerEstimate {
  if (!text) {
    return { cl100k_base: 0, o200k_base: 0 }
  }

  let cl100kTokens = 0
  let o200kTokens = 0

  for (const char of Array.from(text)) {
    const weights = getCharWeights(char)
    cl100kTokens += weights.cl100k
    o200kTokens += weights.o200k
  }

  return {
    cl100k_base: Math.max(1, Math.round(cl100kTokens)),
    o200k_base: Math.max(1, Math.round(o200kTokens)),
  }
}

function getCharWeights(char: string): { cl100k: number; o200k: number } {
  const cl = CHAR_WEIGHTS.cl100k_base
  const o2 = CHAR_WEIGHTS.o200k_base

  if (/\s/.test(char)) {
    return { cl100k: cl.whitespace, o200k: o2.whitespace }
  }

  if (/[0-9]/.test(char)) {
    return { cl100k: cl.number, o200k: o2.number }
  }

  if (/[!-/:-@[-`{-~]/.test(char)) {
    return { cl100k: cl.punctuation, o200k: o2.punctuation }
  }

  const codePoint = char.codePointAt(0)
  if (codePoint && codePoint > 127) {
    if (codePoint > 9000) {
      return { cl100k: cl.emoji, o200k: o2.emoji }
    }
  }

  return { cl100k: cl.regular, o200k: o2.regular }
}
