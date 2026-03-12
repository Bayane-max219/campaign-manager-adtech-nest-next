import Link from 'next/link';
import { fetchJson, type Campaign } from '../../lib/api';

type SearchParams = {
  status?: string;
  advertiser?: string;
  country?: string;
};

async function getCampaigns(searchParams: SearchParams) {
  const params = new URLSearchParams();
  if (searchParams.status) params.set('status', searchParams.status);
  if (searchParams.advertiser) params.set('advertiser', searchParams.advertiser);
  if (searchParams.country) params.set('country', searchParams.country);

  const qs = params.toString();
  return fetchJson<Campaign[]>(`/campaigns${qs ? `?${qs}` : ''}`, { cache: 'no-store' });
}

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const campaigns = await getCampaigns(sp);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Campaigns</h1>
        <Link
          href="/campaigns/new"
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Create campaign
        </Link>
      </div>

      <form className="mb-4 grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-black sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-300">Status</label>
          <input
            name="status"
            defaultValue={sp.status ?? ''}
            placeholder="active"
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-black"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-300">Advertiser</label>
          <input
            name="advertiser"
            defaultValue={sp.advertiser ?? ''}
            placeholder="Nike"
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-black"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-300">Country</label>
          <input
            name="country"
            defaultValue={sp.country ?? ''}
            placeholder="FR"
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-black"
          />
        </div>
        <div className="sm:col-span-3">
          <button
            type="submit"
            className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Apply filters
          </button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Advertiser</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Impressions</th>
              <th className="px-4 py-3">Budget</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c._id} className="border-b border-zinc-100 last:border-0 dark:border-zinc-900">
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">{c.name}</td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-200">{c.advertiser}</td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-200">{c.status}</td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-200">{c.impressionsServed}</td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-200">{c.budget}</td>
              </tr>
            ))}
            {campaigns.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-zinc-600 dark:text-zinc-300" colSpan={5}>
                  No campaigns found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
