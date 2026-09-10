import { Track, TrackInput } from '@/types/track';

const STORAGE_KEY = 'miniify_tracks';

const getStoredTracks = (): Track[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse tracks from local storage");
      return [];
    }
  }
  
  // Initial seed data if storage is empty
  const defaultTracks = [
    { id: '1', title: 'Static Noise', artist: 'The Voids' },
    { id: '2', title: 'Monochrome', artist: 'Blank Slate' }
  ];
  setStoredTracks(defaultTracks);
  return defaultTracks;
};

// Helper: Write to LocalStorage safely
const setStoredTracks = (tracks: Track[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks));
  }
};

// --- CRUD Operations ---

export const fetchTracks = async (): Promise<Track[]> => {
  return getStoredTracks();
};

export const getTrack = async (id: string): Promise<Track | undefined> => {
  const tracks = getStoredTracks();
  return tracks.find(t => t.id === id);
};

export const addTrack = async (track: TrackInput): Promise<Track> => {
  const tracks = getStoredTracks();
  const newTrack: Track = { 
    id: Date.now().toString(), 
    ...track 
  };
  
  tracks.push(newTrack);
  setStoredTracks(tracks);
  
  return newTrack;
};

export const updateTrack = async (id: string, updatedData: TrackInput): Promise<Track | null> => {
  const tracks = getStoredTracks();
  const index = tracks.findIndex(t => t.id === id);
  
  if (index === -1) return null;
  
  tracks[index] = { ...tracks[index], ...updatedData };
  setStoredTracks(tracks);
  
  return tracks[index];
};

export const removeTrack = async (id: string): Promise<boolean> => {
  const tracks = getStoredTracks();
  const filteredTracks = tracks.filter(t => t.id !== id);
  
  setStoredTracks(filteredTracks);
  
  return true;
};