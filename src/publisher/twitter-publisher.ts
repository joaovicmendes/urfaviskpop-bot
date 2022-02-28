import Twitter from "twitter";
import { ITwitterConfig } from ".";
import { IPublisher } from "./interfaces/i-publisher";

export class TwitterPublisher implements IPublisher {

    private twitter;

    constructor(
        private readonly config: ITwitterConfig
    ) {
        this.twitter = new Twitter({
            consumer_key: config.consumerKey,
            consumer_secret: config.consumerSecret,
            access_token_key: config.accessTokenKey,
            access_token_secret: config.accessTokenSecret
        });
    }

    async publish(msg: string): Promise<void> {
        this.twitter.post("statuses/update", { status: msg }, (error, tweet, _) => {
            if (!error) {
                console.info(`[TwitterPublisher][publish] Published '${tweet}' succesfully`);
            } else {
                console.error(`[TwitterPublisher][publish] Error publishing '${tweet}', ${error}`);
            }
        });
    }

}
