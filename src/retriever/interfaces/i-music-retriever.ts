import { Music } from "./i-music";

export interface IMusicRetriever {
    fetchTopTracks(page: number): Promise<Music[]>;
}
