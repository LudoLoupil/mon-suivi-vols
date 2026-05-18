import { useEffect, useMemo, useState } from 'react'

const DEFAULT_MODEL = import.meta.env.VITE_DEFAULT_MODEL || 'gpt-5-mini'
const SERPAPI_KEY = import.meta.env.VITE_SERPAPI_API_KEY || ''

// Dados simulados, espelhando o app Streamlit original.
const MOCK_DATA = [
  { date: '2026-02-01', price: 2850, company: 'Transavia' },
  { date: '2026-02-05', price: 2720, company: 'Turkish Airlines' },
  { date: '2026-02-09', price: 2680, company: 'Pegasus' },
]

// Tenta buscar preços reais via SerpApi quando uma chave está configurada.
// Observação: chamar a SerpApi direto do navegador costuma falhar por CORS;
// em produção use um proxy/backend. Em qualquer erro voltamos para o mock.
async function fetchFlightPrices({ origin, destination, dateFrom, dateTo, passengers }) {
  if (!SERPAPI_KEY) return { flights: MOCK_DATA, error: null }

  const q = `Flights from ${origin} to ${destination} depart ${dateFrom} return ${dateTo} ${passengers}`
  const url = new URL('https://serpapi.com/search.json')
  url.searchParams.set('engine', 'google_flights')
  url.searchParams.set('q', q)
  url.searchParams.set('api_key', SERPAPI_KEY)

  try {
    const resp = await fetch(url)
    if (!resp.ok) throw new Error(`SerpApi HTTP ${resp.status}`)
    const data = await resp.json()
    const raw = Array.isArray(data?.flights)
      ? data.flights
      : Array.isArray(data?.shopping_results)
        ? data.shopping_results
        : []

    const flights = raw.slice(0, 20).map((item) => {
      const rawPrice =
        item.price ?? item.best_price ?? item.price_string ?? null
      const digits = rawPrice == null ? '' : String(rawPrice).replace(/\D/g, '')
      return {
        date: item.date || item.departure_date || new Date().toISOString().slice(0, 10),
        price: digits ? Number(digits) : 0,
        company: item.airline || item.carrier || item.source || item.provider || '',
      }
    })

    if (flights.length === 0) {
      return { flights: MOCK_DATA, error: 'SerpApi: sem resultados, usando dados simulados.' }
    }
    return { flights, error: null }
  } catch (err) {
    return { flights: MOCK_DATA, error: `SerpApi: ${err.message}. Usando dados simulados.` }
  }
}

function LineChart({ data }) {
  const width = 640
  const height = 220
  const pad = 36

  const prices = data.map((d) => d.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const span = max - min || 1

  const points = data.map((d, i) => {
    const x = pad + (i * (width - 2 * pad)) / Math.max(data.length - 1, 1)
    const y = height - pad - ((d.price - min) / span) * (height - 2 * pad)
    return { x, y, ...d }
  })

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img" aria-label="Evolução do preço total">
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#2a3142" />
        <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#2a3142" />
        <path d={path} fill="none" stroke="#4f8cff" strokeWidth="2.5" />
        {points.map((p) => (
          <g key={p.date}>
            <circle cx={p.x} cy={p.y} r="4" fill="#4f8cff" />
            <text x={p.x} y={p.y - 10} fill="#9aa3b2" fontSize="11" textAnchor="middle">
              {p.price} €
            </text>
            <text x={p.x} y={height - pad + 16} fill="#9aa3b2" fontSize="10" textAnchor="middle">
              {p.date}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function App() {
  const [dateDepart, setDateDepart] = useState('2026-04-24')
  const [dateRetour, setDateRetour] = useState('2026-05-03')
  const [budgetMax, setBudgetMax] = useState(2500)
  const [flights, setFlights] = useState(MOCK_DATA)
  const [warning, setWarning] = useState(null)

  useEffect(() => {
    let active = true
    fetchFlightPrices({
      origin: 'Paris',
      destination: 'Hurghada',
      dateFrom: dateDepart,
      dateTo: dateRetour,
      passengers: '2 adults, 3 children',
    }).then((res) => {
      if (!active) return
      setFlights(res.flights)
      setWarning(res.error)
    })
    return () => {
      active = false
    }
  }, [dateDepart, dateRetour])

  const { dernierPrix, variation } = useMemo(() => {
    const last = flights[flights.length - 1]?.price ?? 0
    const prev = flights[flights.length - 2]?.price ?? last
    return { dernierPrix: last, variation: last - prev }
  }, [flights])

  const dansBudget = dernierPrix <= budgetMax

  return (
    <div className="layout">
      <aside className="sidebar">
        <h3>Parâmetros</h3>

        <label htmlFor="depart">Partida</label>
        <input
          id="depart"
          type="date"
          value={dateDepart}
          onChange={(e) => setDateDepart(e.target.value)}
        />

        <label htmlFor="retour">Volta</label>
        <input
          id="retour"
          type="date"
          value={dateRetour}
          onChange={(e) => setDateRetour(e.target.value)}
        />

        <label htmlFor="budget">Orçamento Máximo Total (€)</label>
        <input
          id="budget"
          type="number"
          value={budgetMax}
          onChange={(e) => setBudgetMax(Number(e.target.value))}
        />

        <p className="caption">
          Modelo padrão usado no cliente/servidor: {DEFAULT_MODEL}
        </p>
      </aside>

      <main className="main">
        <h1>✈️ Acompanhamento de Voos: Paris → Hurghada</h1>
        <p className="subtitle">Grupo: 2 Adultos, 3 Crianças (8, 13 e 17 anos)</p>

        {warning && <div className="banner banner-info">{warning}</div>}

        <div className="metrics">
          <div className="metric">
            <div className="metric-label">Preço Atual</div>
            <div className="metric-value">{dernierPrix} €</div>
            <div className={`metric-delta ${variation <= 0 ? 'delta-good' : 'delta-bad'}`}>
              {variation > 0 ? '+' : ''}
              {variation} €
            </div>
          </div>
          <div className="metric">
            <div className="metric-label">Passageiros</div>
            <div className="metric-value">5</div>
            <div className="metric-delta">Família</div>
          </div>
        </div>

        <h2>Evolução do preço total</h2>
        <LineChart data={flights} />

        <h2>Detalhes das opções</h2>
        <table>
          <thead>
            <tr>
              <th>Data de coleta</th>
              <th>Preço Total (€)</th>
              <th>Companhia</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((f) => (
              <tr key={`${f.date}-${f.company}`}>
                <td>{f.date}</td>
                <td>{f.price}</td>
                <td>{f.company}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {dansBudget ? (
          <div className="banner banner-success">
            ✅ O preço está dentro do seu orçamento! Alerta enviado.
          </div>
        ) : (
          <div className="banner banner-info">
            ⏳ Aguardando uma queda de preço...
          </div>
        )}
      </main>
    </div>
  )
}
