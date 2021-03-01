import Twitter from 'twitter';

class Bot {
    constructor(consumer_key, consumer_secret, access_token_key, access_token_secret) {
        this._bot = new Twitter({
            consumer_key: consumer_key,
            consumer_secret: consumer_secret,
            access_token_key: access_token_key,
            access_token_secret: access_token_secret
        });
        this._tweets = new Set();
    }

    tweet(msg) {
        this._bot.post('statuses/update', {status: msg}, function (error, tweet, _) {
            if (!error)
            console.log(tweet.text);
        });
        this._add(msg);
        // console.log(msg);
    }

    validate(msg) {
        return !this._tweets.has(msg);
    }

    _add(msg) {
        this._tweets.add(msg);
    }
}

export default Bot;
