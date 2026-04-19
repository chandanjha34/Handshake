import Link from 'next/link';
import { Card, Button } from '@/components/ui';

const metrics = [
  { label: 'Active Rooms', value: '24' },
  { label: 'Settlements Completed', value: '1,942' },
  { label: 'Avg Settlement Time', value: '2m 14s' },
  { label: 'Privacy Score', value: '99.9%' }
];

export default function HomePage() {
  return (
    <main className="space-y-10">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Confidential protocol</p>
        <h1 className="text-5xl font-semibold leading-tight text-white">
          Private Negotiation, Perfectly Settled
        </h1>
        <p className="max-w-2xl text-lg text-gray-300">
          Handshake enables encrypted reservation-price negotiation where two parties settle fairly without
          disclosing their private inputs.
        </p>
        <Link href="/rooms">
          <Button className="mt-4 border-accent/60 bg-accent/20 text-white">Start Handshake</Button>
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="space-y-2">
            <p className="text-sm text-gray-400">{metric.label}</p>
            <p className="text-2xl font-semibold text-white">{metric.value}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}
