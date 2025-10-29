# TOON Learning System

Sistema interativo para aprender e usar TOON (Token-Oriented Object Notation) — formato otimizado para LLMs com 30-60% menos tokens que JSON.

## 🎯 Funcionalidades

- **Home**: introdução com exemplos rápidos.
- **Learn**: lições interativas com checklist do/don't.
- **Playground**: conversão JSON ↔ TOON em tempo real com medição de tokens.
- **Validator**: validação strict com sugestões de correção e auto-fix.
- **Benchmarks**: comparação de economia de tokens em datasets reais.
- **Templates**: modelos TOON otimizados para diferentes domínios.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Outros scripts úteis:

```bash
npm run build      # gera build de produção
npm test           # compila e executa testes (node:test)
npm run lint       # verificação de tipos com tsc --noEmit
npm run format     # aplica Prettier
```


## 🛠️ Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS com tema oriental customizado
- Zustand para gerenciamento de estado
- Node.js (node:test) para testes automatizados
- Codec TOON customizado em TypeScript

## ✅ Checklist TOON Ótimo

### Do

- Use delimitador TAB para dados com strings.
- Sempre declare `[N]` exato.
- Prefira formato tabular para arrays uniformes.
- Use aspas apenas quando necessário.

### Don't

- Não use TOON para dados altamente aninhados.
- Evite vírgula como delimitador se os dados contêm vírgulas.
- Não esqueça do `:` no header.
- Evite tabelar com muitos campos opcionais.

## 🧪 Testes

Todos os módulos possuem cobertura básica via node:test, incluindo o validador TOON e o estimador de tokens. Execute `npm test` para validar as regras de negócio.


## 📄 Licença

MIT License — veja [LICENSE](LICENSE) para detalhes.
