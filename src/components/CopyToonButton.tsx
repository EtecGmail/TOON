'use client';

import { useState } from 'react'

interface CopyToonButtonProps {
  toonText: string
}

export default function CopyToonButton({ toonText }: CopyToonButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!toonText.trim()) return

    try {
      const formatted = `\`\`\`toon\n${toonText}\n\`\`\``
      await navigator.clipboard.writeText(formatted)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Falha ao copiar:', error)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!toonText.trim()}
      className={`btn text-sm transition-all duration-200 ${
        copied
          ? 'border-green-500 bg-green-100 text-green-700'
          : 'border-primary-300 bg-white text-primary-700'
      }`}
    >
      {copied ? '✅ Copiado!' : '📋 Copy as ```toon```'}
    </button>
  )
}
