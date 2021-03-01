import { config } from 'dotenv';
import Bot from './bot.js';
import MusicRetriever from './musicRetriever.js';

config();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

let tweetInterval = (60*60000);
let retriever = new MusicRetriever(process.env.LASTFM_API_KEY);
let msg = '';
let bot = new Bot(
    process.env.CONSUMER_KEY,
    process.env.CONSUMER_SECRET,
    process.env.ACCESS_TOKEN_KEY,
    process.env.ACCESS_TOKEN_SECRET,
);

for (;;) {
    // Avoiding tweeting the same song twice
    do {
        msg = retriever.getSong() + " is actually kpop";
    } while (!bot.validate(msg));

    bot.tweet(msg);

    await sleep(tweetInterval);
}
