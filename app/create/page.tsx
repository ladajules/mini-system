"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addTrack } from '@/services/api';
import { TrackInput } from '@/types/track';

export default function CreateTrackPage() {
  const router = useRouter();
  const [form, setForm] = useState<TrackInput>({ title: '', artist: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!form.title || !form.artist) return; 
    
    await addTrack(form);
    router.push('/');
  };

  return (
    <div className="max-w-md">
      <h2 className="text-3xl font-bold mb-8 uppercase border-b border-white/20 pb-4">Add New Track</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm uppercase tracking-wide">Title</label>
          <input 
            type="text" 
            className="bg-transparent border border-white p-3 text-white focus:outline-none focus:ring-1 focus:ring-white text-black"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm uppercase tracking-wide">Artist</label>
          <input 
            type="text" 
            className="bg-transparent border border-white p-3 text-white focus:outline-none focus:ring-1 focus:ring-white"
            value={form.artist}
            onChange={(e) => setForm({ ...form, artist: e.target.value })}
          />
        </div>

        <button 
          type="submit" 
          className="bg-white text-black font-bold uppercase py-3 mt-4 hover:bg-gray-200 transition-colors">
          Save Track
        </button>
      </form>
    </div>
  );
}