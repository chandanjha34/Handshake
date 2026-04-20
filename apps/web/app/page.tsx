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
    <main className="space-y-8 pb-8 md:space-y-14">
      <section className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="space-y-5 text-left md:space-y-6 lg:pt-6">
          <div className="hero-enter space-y-3 md:space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-text-tertiary md:text-sm">Confidential Protocol</p>
            <h1 className="hero-title-glow max-w-3xl text-4xl font-bold leading-[0.94] text-text sm:text-5xl md:text-6xl lg:text-[68px]">
              Private negotiation,
              <span className="block text-accent">settled with precision</span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-text-secondary md:text-lg md:leading-8">
              A clean, encrypted workflow where both parties submit confidential pricing,
              compute a secure midpoint, and settle with transparent onchain outcomes.
            </p>
          </div>

          <div className="hero-enter-delay-1 flex flex-wrap gap-2.5 md:gap-3">
            {['FHE assisted', 'Ethereum Sepolia', 'Two-party settlement', 'Wallet-native'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-panel px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary md:px-4 md:text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="hero-enter-delay-2 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/rooms"
              className="lux-shine inline-flex w-fit rounded-[16px_20px_14px_18px] border border-accent bg-accent px-6 py-3 text-sm font-semibold text-bg shadow-sm transition hover:bg-accent-dark hover:shadow-md"
            >
              Start Handshake
            </Link>
            <div className="rounded-[18px_14px_20px_16px] border border-border bg-panel px-4 py-3 text-sm leading-6 text-text-secondary shadow-sm">
              Live onchain room creation and encrypted submission flow
            </div>
          </div>

          <div className="hero-enter-delay-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {[
              { label: 'Privacy score', value: '99.9%' },
              { label: 'Median settle time', value: '2m 14s' },
              { label: 'Rooms created', value: '24' }
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[22px_18px_24px_20px] border border-border bg-panel p-3.5 shadow-sm sm:p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary">{item.label}</p>
                <p className="mt-1.5 text-lg font-bold text-text sm:mt-2 sm:text-xl md:text-2xl">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual />
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="cyber-panel space-y-4 bg-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">Partner Model</p>
          <h2 className="text-2xl font-bold text-text">Designed for the moment two parties need certainty</h2>
          <p className="text-sm leading-7 text-text-secondary">
            A polished interface inspired by modern protocol landing pages: bold typography,
            quiet contrast, and high signal in every block.
          </p>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {capabilities.map((item) => (
            <Card key={item.title} className="cyber-panel space-y-3 bg-panel">
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
