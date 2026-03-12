import { fetchJson, type Stats } from '../../lib/api';

async function getStats() {
  return fetchJson<Stats>('/stats', { cache: 'no-store' });
}

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: 'Total campaigns', value: stats.totalCampaigns },
    { label: 'Active campaigns', value: stats.activeCampaigns },
    { label: 'Total impressions', value: stats.totalImpressions },
    { label: 'Top advertiser', value: stats.topAdvertiser ?? '-' },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-black"
          >
            <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300">{c.label}</div>
            <div className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
