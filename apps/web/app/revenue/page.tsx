import { Card } from '@/components/ui';

const marketProblems = [
  'Negotiations fail due to information asymmetry and trust gaps.',
  'Traditional negotiation tools do not align incentives with successful outcomes.',
  'High-value deal-making lacks private, structured, and auditable rails.'
];

const solutionPillars = [
  {
    title: 'Private workflow',
    detail: 'Two parties negotiate with minimal information leakage.'
  },
  {
    title: 'Deterministic settlement',
    detail: 'Escrow and outcome logic are transparent and verifiable onchain.'
  },
  {
    title: 'Incentive alignment',
    detail: 'Handshake earns only when users close real deals.'
  }
];

const revenueModels = [
  {
    title: '1) Per-settlement fee (primary)',
    detail:
      'Fee charged only on successful settlement. Example: INR 10,00,000 deal at 0.5% => INR 5,000 revenue.'
  },
  {
    title: '2) Enterprise SaaS',
    detail:
      'Monthly infrastructure pricing for hiring platforms, HR suites, OTC desks, and marketplaces.'
  },
  {
    title: '3) Protocol / API fee',
    detail:
      'Third-party dApps integrate Handshake rails and pay per interaction or settlement call.'
  },
  {
    title: '4) Premium modules',
    detail:
      'Advanced analytics, multi-party flows, custom weighting logic, private audit/compliance trails.'
  }
];

const goToMarket = [
  {
    stage: 'Phase 1',
    plan: 'Launch on per-settlement fee model (0.25%-1.00%) with direct users.'
  },
  {
    stage: 'Phase 2',
    plan: 'Expand into B2B API/SaaS for hiring and OTC deal workflows.'
  },
  {
    stage: 'Phase 3',
    plan: 'Add premium modules and institutional integrations.'
  }
];

const pitchStats = [
  { label: 'Primary model', value: 'Per-settlement fee' },
  { label: 'Fee band', value: '0.25% to 1.00%' },
  { label: 'Best-fit markets', value: 'Hiring, OTC, B2B deals, marketplaces' },
  { label: 'Core thesis', value: 'Less asymmetry = more closed deals' }
];

export default function RevenuePage() {
  return (
    <main className="space-y-10 pb-8">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">Business Model</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-[0.95] text-text sm:text-5xl">Pitch flow: Problem, Solution, Revenue, and Go-To-Market</h1>
        <p className="max-w-2xl text-base leading-7 text-text-secondary">
          Handshake becomes a real product when monetization is tied to successful outcomes. This page presents the same story used in pitch slides.
        </p>
      </section>

      <section>
        <Card className="cyber-panel space-y-4 bg-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">Problem</p>
          <ul className="space-y-2 text-sm leading-7 text-text-secondary">
            {marketProblems.map((point) => (
              <li key={point}>- {point}</li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {solutionPillars.map((item) => (
          <Card key={item.title} className="cyber-panel space-y-2 bg-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">Solution</p>
            <h2 className="text-xl font-bold text-text">{item.title}</h2>
            <p className="text-sm leading-7 text-text-secondary">{item.detail}</p>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {revenueModels.map((model) => (
          <Card key={model.title} className="cyber-panel space-y-3 bg-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">Revenue</p>
            <h2 className="text-xl font-bold text-text">{model.title}</h2>
            <p className="text-sm leading-7 text-text-secondary">{model.detail}</p>
          </Card>
        ))}
      </section>

      <section>
        <Card className="cyber-panel space-y-4 bg-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">Go-To-Market</p>
          <div className="space-y-3">
            {goToMarket.map((item) => (
              <div
                key={item.stage}
                className="grid gap-2 rounded-[16px_14px_18px_12px] border border-border bg-bg-secondary px-3 py-3 sm:grid-cols-[120px_1fr] sm:items-center"
              >
                <p className="text-sm font-semibold text-text">{item.stage}</p>
                <p className="text-sm leading-7 text-text-secondary">{item.plan}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {pitchStats.map((item) => (
          <Card key={item.label} className="cyber-panel space-y-2 bg-panel">
            <p className="text-sm text-text-secondary">{item.label}</p>
            <p className="text-lg font-bold text-text">{item.value}</p>
          </Card>
        ))}
      </section>

      <section>
        <Card className="cyber-panel space-y-3 bg-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">Pitch one-liner</p>
          <p className="text-lg font-semibold text-text">
            Handshake makes money by taking a small cut whenever it successfully helps two parties reach a deal.
          </p>
        </Card>
      </section>
    </main>
  );
}
