import fs from 'fs';

class TweetsRetriever {
    static path = 'tweets.json';

    static get() {
        let rawData = fs.readFileSync(TweetsRetriever.path).toString('utf-8');
        return new Set(rawData.split("\n"));
    }

    static save(tweets) {
        fs.writeFile(TweetsRetriever.path, Array.from(tweets).join('\n'), function (err) {
            if (err)
                console.log(err);
        });
    }
};

export default TweetsRetriever;
