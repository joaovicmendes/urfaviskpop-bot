import { IMusicRetriever, Music } from ".";
import { IRequester } from "../requester";

export class LastFmRetriever implements IMusicRetriever {

    private BASE_URL = "https://ws.audioscrobbler.com/2.0/";

    constructor(
        private readonly apiKey: string,
        private readonly requester: IRequester
    ) {}

    public async fetchTopTracks(page: number): Promise<Music[]> {
        const url = this.BASE_URL;
        const topChartsUrl = `?method=chart.gettoptracks&api_key=${this.apiKey}&format=json&page=${page}`;
        try {
            console.info(`[LastFmRetriever][fetchTopTracks] Fetching top tracks data from ${url+topChartsUrl}`);
            const response = await this.requester.get(url+topChartsUrl);
            return response.data;
        } catch (error) {
            console.error(`[LastFmRetriever][fetchTopTracks] Error: when fetching ${url+topChartsUrl}, ${error}`);
            throw(error);
        }
    }

}
