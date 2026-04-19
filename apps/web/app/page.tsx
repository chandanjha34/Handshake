import Link from 'next/link';
import { Card } from '@/components/ui';
import { HeroVisual } from '@/components/hero-visual';

const metrics = [
  { label: 'Active Rooms', value: '24' },
  { label: 'Settlements Completed', value: '1,942' },
  { label: 'Avg Settlement Time', value: '2m 14s' },
  { label: 'Privacy Score', value: '99.9%' }
];

const capabilities = [
  {
    title: 'Encrypted negotiation',
    description: 'Reservation prices stay private until both parties submit and settle.'
  },
  {
    title: 'Wallet-native flow',
    description: 'Connect, switch networks, and continue without leaving the negotiation context.'
  },
  {
    title: 'Onchain room state',
    description: 'Rooms are tracked transparently while the sensitive payload remains hidden.'
  }
];

export default function HomePage() {
  return (
    <main className="space-y-12 pb-8">
      <section className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-text-secondary">Confidential Protocol</p>
            <h1 className="max-w-3xl text-5xl font-bold leading-[0.95] text-text md:text-7xl">
              Private negotiation,
              <span className="block text-accent-dark">rendered like a studio launch</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-text-secondary">
              A cyber-native private market rail where parties negotiate encrypted reservation prices and settle
              with structure, clarity, and visual weight inspired by modern agency-grade product sites.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {['FHE assisted', 'Ethereum Sepolia', 'Two-party settlement', 'Wallet-native'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent/50 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/rooms"
              className="inline-flex rounded-[16px_20px_14px_18px] border border-accent bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark hover:shadow-md"
            >
              Start Handshake
            </Link>
            <div className="rounded-[18px_14px_20px_16px] border border-border bg-white/70 px-4 py-3 text-sm text-text-secondary shadow-sm">
              Live onchain room creation and encrypted submission flow
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Privacy score', value: '99.9%' },
              { label: 'Median settle time', value: '2m 14s' },
              { label: 'Rooms created', value: '24' }
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[22px_18px_24px_20px] border border-border bg-white/75 p-4 shadow-sm"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-text">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual />
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="cyber-panel space-y-4 bg-white/75">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">Partner Model</p>
          <h2 className="text-2xl font-bold text-text">Designed for the moment two parties need certainty</h2>
          <p className="text-sm leading-7 text-text-secondary">
            The interface mirrors a premium agency landing page: a strong narrative panel, a richer visual canvas,
            and compact signal chips that communicate trust at a glance.
          </p>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {capabilities.map((item) => (
            <Card key={item.title} className="cyber-panel space-y-3 bg-white/75">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">Capability</p>
              <h3 className="text-lg font-bold text-text">{item.title}</h3>
              <p className="text-sm leading-7 text-text-secondary">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="cyber-panel space-y-2">
            <p className="text-sm text-text-secondary">{metric.label}</p>
            <p className="text-2xl font-bold text-text">{metric.value}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}
