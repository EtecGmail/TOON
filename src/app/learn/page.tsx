const LESSONS = [
  {
    title: 'Introdução ao TOON',
    description: 'Conceitos básicos e vantagens sobre JSON',
    steps: [
      {
        title: 'O que é TOON?',
        content:
          'TOON é um formato otimizado para LLMs que reduz significativamente o uso de tokens mantendo a estrutura dos dados.',
      },
      {
        title: 'Quando usar?',
        content:
          'Brilha em arrays uniformes de objetos com valores primitivos. Ideal para dados tabulares.',
      },
    ],
  },
  {
    title: 'Sintaxe Básica',
    description: 'Estrutura de cabeçalhos e dados',
    steps: [
      {
        title: 'Cabeçalhos',
        content: 'nome[N]{campo1,campo2}: - O [N] deve ser exato e os campos são separados por delimitador.',
      },
      {
        title: 'Dados Tabulares',
        content: 'Cada linha representa um objeto, com valores separados pelo mesmo delimitador.',
      },
    ],
  },
]

const DO_DONTS = [
  { type: 'do', text: 'Use delimitador TAB para dados com strings que contêm vírgulas.' },
  { type: 'do', text: 'Sempre declare [N] exato - ajuda na validação do LLM.' },
  { type: 'do', text: 'Prefira formato tabular para arrays uniformes.' },
  { type: 'dont', text: 'Não use TOON para dados altamente aninhados ou não uniformes.' },
  { type: 'dont', text: 'Evite vírgula como delimitador se os dados contêm vírgulas.' },
  { type: 'dont', text: 'Não esqueça do : no final do cabeçalho.' },
]

export default function Learn() {
  return (
    <div className="container-ma">
      <h1 className="mb-tatami-lg text-3xl font-bold text-primary-800">Aprenda TOON</h1>

      <div className="space-y-tatami-xl">
        {LESSONS.map((lesson) => (
          <section key={lesson.title} className="card">
            <div className="card-body">
              <h2 className="mb-tatami-sm text-2xl font-semibold text-primary-800">
                {lesson.title}
              </h2>
              <p className="mb-tatami-md text-primary-600">{lesson.description}</p>

              <div className="space-y-tatami-md">
                {lesson.steps.map((step) => (
                  <div key={step.title} className="rounded-lg bg-primary-50 p-tatami-md">
                    <h3 className="mb-tatami-xs font-semibold text-primary-800">{step.title}</h3>
                    <p className="text-sm text-primary-700">{step.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section id="docs" className="card">
          <div className="card-body">
            <h2 className="mb-tatami-md text-2xl font-semibold text-primary-800">
              Checklist Do/Don't
            </h2>
            <div className="grid grid-cols-1 gap-tatami-md md:grid-cols-2">
              <div>
                <h3 className="mb-tatami-sm text-lg font-semibold text-green-700">✅ Do</h3>
                <ul className="space-y-tatami-xs">
                  {DO_DONTS.filter((item) => item.type === 'do').map((item) => (
                  <li key={item.text} className="flex items-start text-sm text-primary-700">
                    <span className="mr-tatami-xs text-green-500" aria-hidden="true">
                      •
                    </span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-tatami-sm text-lg font-semibold text-red-700">❌ Don't</h3>
                <ul className="space-y-tatami-xs">
                  {DO_DONTS.filter((item) => item.type === 'dont').map((item) => (
                  <li key={item.text} className="flex items-start text-sm text-primary-700">
                    <span className="mr-tatami-xs text-red-500" aria-hidden="true">
                      •
                    </span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
