import Twitter from 'twitter';
import TweetsRetriever from './tweetsRetriever.js';

class Bot {
    constructor(consumer_key, consumer_secret, access_token_key, access_token_secret) {
        this._bot = new Twitter({
            consumer_key: consumer_key,
            consumer_secret: consumer_secret,
            access_token_key: access_token_key,
            access_token_secret: access_token_secret
        });
        this._tweets = TweetsRetriever.get();
    }

    tweet(msg) {
        this._bot.post('statuses/update', {status: msg}, function (error, tweet, _) {
            if (!error)
                console.log(tweet.text);
            else
                console.log(error);
        });
        this._add(msg);
        // console.log(msg);
    }

    validate(msg) {
        if (this._tweets.has(msg))
            console.log("REPEATED SONG:" + msg)
        return !this._tweets.has(msg);
    }

    _add(msg) {
        this._tweets.add(msg);
        TweetsRetriever.save(this._tweets);
    }
}

export default Bot;
