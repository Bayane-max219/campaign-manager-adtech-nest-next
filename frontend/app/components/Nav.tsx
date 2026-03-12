import Link from 'next/link';

export function Nav() {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          AdTech Campaign Manager
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link
            href="/campaigns"
            className="rounded-md px-2 py-1 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Campaigns
          </Link>
          <Link
            href="/campaigns/new"
            className="rounded-md px-2 py-1 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            New
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md px-2 py-1 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
