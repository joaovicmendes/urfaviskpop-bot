import fs from 'fs';

class TweetsRetriever {
    static path = 'tweets.json';

    static get() {
        let rawData;
        let ret;
        try {
            rawData = fs.readFileSync(TweetsRetriever.path).toString('utf-8');
            ret = new Set(rawData.split("\n"));
        } catch (error) {
            ret = new Set();
        }

        return ret;
    }

    static save(tweets) {
        fs.writeFile(TweetsRetriever.path, Array.from(tweets).join('\n'), function (err) {
            if (err)
                console.log(err);
        });
    }
};

export default TweetsRetriever;
