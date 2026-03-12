'use client';

import { useState } from 'react';
import { fetchJson, type Campaign } from '../../../lib/api';

export default function NewCampaignPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<Campaign | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCreated(null);

    const form = new FormData(e.currentTarget);

    const name = String(form.get('name') ?? '').trim();
    const advertiser = String(form.get('advertiser') ?? '').trim();
    const startDate = String(form.get('startDate') ?? '').trim();
    const endDate = String(form.get('endDate') ?? '').trim();
    const budget = Number(form.get('budget') ?? 0);
    const targetCountriesRaw = String(form.get('targetCountries') ?? '').trim();

    if (!name || !advertiser || !startDate || !endDate || !targetCountriesRaw) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    const targetCountries = targetCountriesRaw
      .split(',')
      .map((c) => c.trim().toUpperCase())
      .filter(Boolean);

    try {
      const res = await fetchJson<Campaign>('/campaigns', {
        method: 'POST',
        body: {
          name,
          advertiser,
          startDate,
          endDate,
          budget,
          targetCountries,
          status: 'active',
        },
      });
      setCreated(res);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Create a campaign</h1>

      <form
        onSubmit={onSubmit}
        className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-black"
      >
        <div className="grid gap-1">
          <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Name</label>
          <input
            name="name"
            required
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-black"
            placeholder="Summer Campaign"
          />
        </div>

        <div className="grid gap-1">
          <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Advertiser</label>
          <input
            name="advertiser"
            required
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-black"
            placeholder="Nike"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1">
            <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Start date</label>
            <input
              type="date"
              name="startDate"
              required
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-black"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300">End date</label>
            <input
              type="date"
              name="endDate"
              required
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-black"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1">
            <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Budget</label>
            <input
              type="number"
              name="budget"
              min={0}
              step={1}
              defaultValue={10000}
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-black"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Target countries</label>
            <input
              name="targetCountries"
              required
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-black"
              placeholder="FR,ES"
            />
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Comma-separated (e.g. FR,ES)</div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create'}
        </button>

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        ) : null}

        {created ? (
          <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-900/40 dark:bg-green-950/40 dark:text-green-200">
            Created: <span className="font-medium">{created.name}</span>
          </div>
        ) : null}
      </form>
    </div>
  );
}
