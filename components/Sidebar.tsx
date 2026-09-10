"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, ListMusic } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/20 flex flex-col p-6 shrink-0">
      <h1 className="text-2xl font-bold tracking-widest mb-10 uppercase">Miniify</h1>
      
      <nav className="flex flex-col gap-2">
        <Link 
          href="/" 
          className={`flex items-center gap-3 px-4 py-3 rounded-md font-bold transition-colors ${
            pathname === '/' 
              ? 'bg-white text-black' 
              : 'text-white opacity-80 hover:opacity-100 hover:bg-white/10'
          }`}
        >
          <ListMusic className="w-5 h-5" />
          <span>Library</span>
        </Link>
        
        <Link 
          href="/create" 
          className={`flex items-center gap-3 px-4 py-3 rounded-md font-bold transition-colors ${
            pathname === '/create' 
              ? 'bg-white text-black' 
              : 'text-white opacity-80 hover:opacity-100 hover:bg-white/10'
          }`}
        >
          <Plus className="w-5 h-5" />
          <span>Add Track</span>
        </Link>
      </nav>
    </aside>
  );
}