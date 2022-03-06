import { IPublisher } from "./publisher";
import { IMusicRetriever, Music } from "./retriever";
import { IStorer } from "./storer";

export class Bot {

    private songList: Music[] = [];
    private page: number = -1;

    constructor(
        private readonly publisher: IPublisher,
        private readonly retriever: IMusicRetriever,
        private readonly storer: IStorer,
    ) {}

    public async execute(): Promise<void> {
        try {
            if (this.page === -1) {
                this.page = await this.storer.queryLastPage() || 0;
            }

            const song = await this.getSongNotPublished();
            const message = `${song} is actually kpop`;
            await this.publisher.publish(message);
            await this.storer.store(song);
            console.info(`[Bot][execute] Finished processing ${song}`);
        } catch (error) {
            console.error(`[Bot][execute] Error: ${error}`)
        }
    }

    private async getSongNotPublished(): Promise<string> {
        try {
            for (const song of this.songList) {
                const songWasPosted = await this.storer.query(song);
                if (!songWasPosted) {
                    return song;
                }
            }
    
            this.page += 1;
            const [_, songList] = await Promise.all([
                this.storer.storeLastPage(this.page),
                this.retriever.fetchTopTracks(this.page)
            ]);
            this.songList = songList;
            return this.getSongNotPublished();
        } catch (error) {
            throw(error);
        }
    }

}
