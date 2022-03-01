import { config } from "dotenv";
import { Bot } from "./bot";
import { IPublisher, TwitterPublisher } from "./publisher";
import { AxiosRequester } from "./requester";
import { IMusicRetriever, LastFmRetriever } from "./retriever";
import { DynamoDbStorer, IStorer } from "./storer";

config();

const publisher: IPublisher = new TwitterPublisher({
    consumerKey: process.env.CONSUMER_KEY || "",
    consumerSecret: process.env.CONSUMER_SECRET || "",
    accessTokenKey: process.env.ACCESS_TOKEN_KEY || "",
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || ""
});

const retriever: IMusicRetriever = new LastFmRetriever(
    process.env.LASTFM_API_KEY || "",
    new AxiosRequester()
);

const storer: IStorer = new DynamoDbStorer({
    region: process.env.REGION || "",
    endpoint: process.env.DYNAMO_ENDPOINT || "",
    accessKey: process.env.ACCESS_KEY || "",
    secretAccessKey: process.env.SECRET_KEY || ""
});

const bot = new Bot(publisher, retriever, storer);
bot.execute();
