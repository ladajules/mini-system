export interface Track {
  id: string;
  title: string;
  artist: string;
}

export type TrackInput = Omit<Track, 'id'>;