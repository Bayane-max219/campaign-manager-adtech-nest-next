export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">AdTech Campaign Manager</h1>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
        Mini system to manage video ad campaigns, simulate ad serving, and view stats.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <a
          href="/campaigns"
          className="rounded-lg border border-zinc-200 bg-white p-4 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-black dark:hover:bg-zinc-950"
        >
          <div className="font-medium">Campaign list</div>
          <div className="mt-1 text-zinc-600 dark:text-zinc-300">View and filter campaigns</div>
        </a>
        <a
          href="/campaigns/new"
          className="rounded-lg border border-zinc-200 bg-white p-4 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-black dark:hover:bg-zinc-950"
        >
          <div className="font-medium">Create campaign</div>
          <div className="mt-1 text-zinc-600 dark:text-zinc-300">Add a new campaign</div>
        </a>
        <a
          href="/dashboard"
          className="rounded-lg border border-zinc-200 bg-white p-4 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-black dark:hover:bg-zinc-950"
        >
          <div className="font-medium">Dashboard</div>
          <div className="mt-1 text-zinc-600 dark:text-zinc-300">Stats overview</div>
        </a>
      </div>
    </div>
  );
}
