"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchTracks, removeTrack } from '@/services/api';
import { Track } from '@/types/track';

export default function LibraryPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  // State to control the modal visibility and store the target track
  const [trackToDelete, setTrackToDelete] = useState<Track | null>(null);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    const data = await fetchTracks();
    setTracks(data);
  };

  const executeDelete = async () => {
    if (!trackToDelete) return;
    
    await removeTrack(trackToDelete.id);
    setTracks(tracks.filter(track => track.id !== trackToDelete.id));
    setTrackToDelete(null); // Close modal after deleting
  };

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold mb-8 uppercase border-b border-white/20 pb-4">Your Tracks</h2>
        
        <div className="flex flex-col gap-4">
          {tracks.map((track) => (
            <div key={track.id} className="flex justify-between items-center p-4 border border-white/30 hover:bg-white hover:text-black transition-colors group">
              <div>
                <p className="font-bold text-lg">{track.title}</p>
                <p className="text-sm opacity-70">{track.artist}</p>
              </div>
              <div className="flex gap-2">
                <Link 
                  href={`/edit/${track.id}`}
                  className="border border-current px-4 py-1 text-sm uppercase hover:font-bold"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => setTrackToDelete(track)}
                  className="border border-current px-4 py-1 text-sm uppercase hover:font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          
          {tracks.length === 0 && (
            <p className="opacity-50 italic">No tracks found. Add some.</p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {trackToDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-black border border-white p-8 max-w-sm w-full flex flex-col gap-6">
            <h3 className="text-xl font-bold uppercase tracking-wide">Confirm Deletion</h3>
            
            <p className="opacity-80">
              Are you sure you want to delete <span className="font-bold text-white">"{trackToDelete.title}"</span>? This cannot be undone.
            </p>
            
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => setTrackToDelete(null)}
                className="flex-1 border border-white px-4 py-3 uppercase text-sm hover:bg-white/10 transition-colors font-bold"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 bg-white text-black px-4 py-3 uppercase text-sm hover:bg-gray-200 transition-colors font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}