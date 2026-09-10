"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getTrack, updateTrack } from '@/services/api';
import { TrackInput } from '@/types/track';

export default function EditTrackPage() {
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState<TrackInput>({ title: '', artist: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrack = async () => {
      // params.id can be a string or array, this ensures we get the string value
      const trackId = Array.isArray(params.id) ? params.id[0] : params.id;
      if (!trackId) return;

      const track = await getTrack(trackId);
      if (track) {
        setForm({ title: track.title, artist: track.artist });
      } else {
        // Redirect back to home if the track doesn't exist
        router.push('/');
      }
      setLoading(false);
    };

    loadTrack();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.title || !form.artist) return;
    
    const trackId = Array.isArray(params.id) ? params.id[0] : params.id;
    await updateTrack(trackId as string, form);
    
    router.push('/');
  };

  if (loading) {
    return <div className="uppercase animate-pulse text-white">Loading...</div>;
  }

  return (
    <div className="max-w-md">
      <h2 className="text-3xl font-bold mb-8 uppercase border-b border-white/20 pb-4">Edit Track</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm uppercase tracking-wide">Title</label>
          <input 
            type="text" 
            className="bg-transparent border border-white p-3 text-white focus:outline-none focus:ring-1 focus:ring-white"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm uppercase tracking-wide">Artist</label>
          <input 
            type="text" 
            className="bg-transparent border border-white p-3 text-white focus:outline-none focus:ring-1 focus:ring-white"
            value={form.artist}
            onChange={(e) => setForm({ ...form, artist: e.target.value })}
            required
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button 
            type="button"
            onClick={() => router.push('/')}
            className="flex-1 border border-white text-white font-bold uppercase py-3 hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="flex-1 bg-white text-black font-bold uppercase py-3 hover:bg-gray-200 transition-colors"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}