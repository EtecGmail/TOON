import Link from 'next/link'

const FEATURE_CARDS = [
  {
    title: 'Aprender',
    description: 'Lições interativas com exercícios práticos',
    href: '/learn',
    icon: '📚',
  },
  {
    title: 'Playground',
    description: 'Converta JSON ↔ TOON em tempo real',
    href: '/playground',
    icon: '⚡',
  },
  {
    title: 'Validar',
    description: 'Validação strict com sugestões de correção',
    href: '/validator',
    icon: '✅',
  },
  {
    title: 'Benchmarks',
    description: 'Compare economia de tokens vs JSON/YAML/CSV',
    href: '/benchmarks',
    icon: '📊',
  },
  {
    title: 'Templates',
    description: 'Modelos prontos otimizados em TOON',
    href: '/templates',
    icon: '🎨',
  },
  {
    title: 'Documentação',
    description: 'Referência rápida e checklist',
    href: '/learn#docs',
    icon: '📖',
  },
]

const SAMPLE_JSON = {
  users: [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' },
  ],
}

const SAMPLE_TOON = `users[2]{id\tname\trole}:
1\tAlice\tadmin
2\tBob\tuser`

export default function Home() {
  return (
    <div className="container-ma">
      <section className="section-ma text-center">
        <h1 className="text-4xl font-bold text-primary-800">TOON Learning System</h1>
        <p className="mx-auto max-w-2xl text-xl text-primary-600">
          Aprenda e use <strong>TOON</strong> (Token-Oriented Object Notation) - formato otimizado
          para LLMs com 30-60% menos tokens que JSON.
        </p>
      </section>

      <section className="section-ma">
        <div className="grid grid-cols-1 gap-tatami-md md:grid-cols-2 lg:grid-cols-3">
          {FEATURE_CARDS.map((item) => (
            <Link key={item.title} href={item.href} className="card h-full">
              <div className="card-body text-center">
                <div className="mb-tatami-sm text-3xl" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="mb-tatami-xs text-lg font-semibold text-primary-800">
                  {item.title}
                </h3>
                <p className="text-sm text-primary-600">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-ma">
        <div className="card">
          <div className="card-body">
            <h2 className="mb-tatami-md text-2xl font-semibold text-primary-800">
              Exemplo Rápido: JSON → TOON
            </h2>
            <div className="grid grid-cols-1 gap-tatami-md lg:grid-cols-2">
              <div>
                <h3 className="mb-tatami-sm font-mono text-sm text-primary-600">JSON</h3>
                <pre className="overflow-x-auto rounded bg-primary-50 p-tatami-md text-left text-sm">
                  {JSON.stringify(SAMPLE_JSON, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="mb-tatami-sm font-mono text-sm text-primary-600">TOON (Tabular)</h3>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-primary-50 p-tatami-md text-left text-sm">
                  {SAMPLE_TOON}
                </pre>
              </div>
            </div>
            <div className="mt-tatami-md rounded border border-green-200 bg-green-50 p-tatami-md text-sm text-green-800">
              <strong>Economia:</strong> ~42% menos tokens com TOON tabular
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
