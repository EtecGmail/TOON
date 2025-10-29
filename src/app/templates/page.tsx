import { analyticsSample, ecommerceSample, logsSample, usersSample } from '@/samples/templates'

const TEMPLATES = [
  {
    name: 'E-commerce',
    description: 'Pedidos com produtos e quantidades',
    sample: ecommerceSample,
  },
  {
    name: 'Analytics',
    description: 'Métricas diárias de usuários e visualizações',
    sample: analyticsSample,
  },
  {
    name: 'Users',
    description: 'Usuários com perfis e roles',
    sample: usersSample,
  },
  {
    name: 'Logs',
    description: 'Logs de aplicação com timestamps',
    sample: logsSample,
  },
]

export default function Templates() {
  return (
    <div className="container-ma">
      <h1 className="mb-tatami-lg text-3xl font-bold text-primary-800">Templates</h1>

      <div className="grid grid-cols-1 gap-tatami-lg lg:grid-cols-2">
        {TEMPLATES.map((template) => (
          <div key={template.name} className="card">
            <div className="card-body">
              <h2 className="mb-tatami-sm text-xl font-semibold text-primary-800">{template.name}</h2>
              <p className="mb-tatami-md text-primary-600">{template.description}</p>

              <div className="space-y-tatami-md text-xs">
                <div>
                  <h3 className="mb-tatami-xs font-mono text-sm text-primary-600">JSON</h3>
                  <pre className="max-h-40 overflow-x-auto rounded bg-primary-50 p-tatami-sm">{template.sample.json}</pre>
                </div>
                <div>
                  <h3 className="mb-tatami-xs font-mono text-sm text-primary-600">TOON Ótimo</h3>
                  <pre className="max-h-40 overflow-x-auto rounded bg-primary-50 p-tatami-sm">{template.sample.toon}</pre>
                </div>
              </div>

              <div className="mt-tatami-md flex gap-tatami-sm">
                <button type="button" className="btn-primary text-sm" disabled>
                  Usar no Playground
                </button>
                <button type="button" className="btn text-sm" disabled>
                  Copiar TOON
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-tatami-lg">
        <div className="card-body">
          <h2 className="mb-tatami-md text-xl font-semibold text-primary-800">🎯 Dicas para TOON Ótimo</h2>
          <div className="grid grid-cols-1 gap-tatami-md text-sm text-primary-600 md:grid-cols-2">
            <div>
              <h3 className="mb-tatami-sm font-semibold text-primary-700">✅ Prefira Quando:</h3>
              <ul className="space-y-tatami-xs">
                <li>• Arrays uniformes de objetos</li>
                <li>• Valores primitivos (strings, números, booleanos)</li>
                <li>• Dados tabulares estruturados</li>
                <li>• Campos consistentes entre objetos</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-tatami-sm font-semibold text-primary-700">⛔ Evite Quando:</h3>
              <ul className="space-y-tatami-xs">
                <li>• Estruturas profundamente aninhadas</li>
                <li>• Muitos campos opcionais/vazios</li>
                <li>• Dados não uniformes</li>
                <li>• Valores complexos (objetos/arrays)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
