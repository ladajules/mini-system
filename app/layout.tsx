import Link from 'next/link';
import { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-black text-white font-sans">
        <aside className="w-64 border-r border-white/20 flex flex-col p-6">
          <h1 className="text-2xl font-bold tracking-widest mb-10 uppercase">Minify</h1>
          <nav className="flex flex-col gap-4">
            <Link href="/" className="hover:underline opacity-80 hover:opacity-100">Library</Link>
            <Link href="/create" className="hover:underline opacity-80 hover:opacity-100">Add Track</Link>
          </nav>
        </aside>

        <main className="flex-1 p-10 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}