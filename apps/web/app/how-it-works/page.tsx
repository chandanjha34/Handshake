import { Card } from '@/components/ui';

const steps = [
  {
    id: '1',
    title: 'Open negotiation room',
    text: 'Party A opens a room with an initial target and designated counterparty.'
  },
  {
    id: '2',
    title: 'Submit counter price + escrow',
    text: 'Party B submits a counter price and matching escrow amount onchain.'
  },
  {
    id: '3',
    title: 'Compute midpoint proposal',
    text: 'Handshake computes a settlement midpoint and publishes the proposed outcome.'
  },
  {
    id: '4',
    title: 'Accept or reject',
    text: 'Both parties choose accept or reject. Logic resolves settlement or closes/refunds.'
  }
];

const outcomes = [
  ['Both accept', 'Settle at proposed midpoint'],
  ['A accepts, B rejects', 'Settle at adjusted midpoint'],
  ['Both reject', 'Close room and refund counterparty escrow']
];

export default function HowItWorksPage() {
  return (
    <main className="space-y-10 pb-8">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">How It Works</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-[0.95] text-text sm:text-5xl">A practical private negotiation flow from offer to settlement</h1>
        <p className="max-w-2xl text-base leading-7 text-text-secondary">
          Handshake is designed to remove information asymmetry while keeping settlement decisions deterministic and auditable.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {steps.map((step) => (
          <Card key={step.id} className="cyber-panel space-y-3 bg-panel">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-sm font-bold text-text">
              {step.id}
            </div>
            <h2 className="text-xl font-bold text-text">{step.title}</h2>
            <p className="text-sm leading-7 text-text-secondary">{step.text}</p>
          </Card>
        ))}
      </section>

      <section>
        <Card className="cyber-panel space-y-4 bg-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">Outcome logic</p>

          <div className="grid gap-3">
            {outcomes.map(([label, result]) => (
              <div
                key={label}
                className="grid items-center gap-2 rounded-[16px_14px_18px_12px] border border-border bg-bg-secondary px-3 py-3 sm:grid-cols-[0.9fr_auto_1.1fr]"
              >
                <p className="text-sm font-semibold text-text">{label}</p>
                <p className="hidden text-center text-text-tertiary sm:block">&rarr;</p>
                <p className="text-sm text-text-secondary">{result}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}
