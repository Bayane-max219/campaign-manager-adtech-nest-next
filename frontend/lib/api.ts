export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type FetchJsonOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

export async function fetchJson<T>(path: string, options: FetchJsonOptions = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_URL}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed (${res.status}): ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}

export type CampaignStatus = 'active' | 'paused' | 'ended';

export type Campaign = {
  _id: string;
  name: string;
  advertiser: string;
  startDate: string;
  endDate: string;
  budget: number;
  impressionsServed: number;
  targetCountries: string[];
  status: CampaignStatus;
};

export type Stats = {
  totalCampaigns: number;
  activeCampaigns: number;
  totalImpressions: number;
  topAdvertiser: string | null;
};
