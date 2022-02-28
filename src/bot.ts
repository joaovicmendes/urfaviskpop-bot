import { IPublisher } from "./publisher";
import { IMusicRetriever, Music } from "./retriever";

export class Bot {

    private songList: Music[] = [];
    private page: number = 0;

    constructor(
        private readonly publisher: IPublisher,
        private readonly retriever: IMusicRetriever,
    ) {}

    public async execute(): Promise<void> {
        try {
            const song = await this.getSongNotPublished();
            const message = `${song} is actually kpop`;
            await this.publisher.publish(message);
        } catch (error) {
            console.error(`[Bot][execute] Error: ${error}`)
        }
    }

    private async getSongNotPublished(): Promise<string> {
        for (const song of this.songList) {
            // TODO: if not posted
            return song;
        }

        this.page += 1;
        await this.retriever.fetchTopTracks(this.page);
        return this.getSongNotPublished();
    }

}
