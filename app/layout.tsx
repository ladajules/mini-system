import Link from 'next/link';
import { ReactNode } from 'react';
import { Plus, ListMusic } from 'lucide-react';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-black text-white font-sans">
        <Sidebar/>

        <main className="flex-1 p-10 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}