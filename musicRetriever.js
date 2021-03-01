import fs from 'fs';
import request from 'sync-request';

class MusicRetriever {
    constructor(api_key) {
        this._api_key = api_key;
        this._requestedPage = 1;
        this._fetchedFromLocalFile = false;
        this._songList = this._fetchTopTracks(this._requestedPage);
    }

    getSong() {
        // If there are no more music to tweet, fetch another page on LastFM
        if (this._songList.length == 0) {
            if (this._fetchedFromLocalFile) {
                console.log("FATAL: Couldn't fetch new songs.\n");
                process.exit(1);
            }
            this._requestedPage++;
            this._songList = this._fetchTopTracks(this._requestedPage);
        }

        // Selecting the top track from queue and removing it
        let track = this._songList.shift();
        return track.name + " - " + track.artist.name;
    }

    _fetchTopTracks(page = 1) {
        let ret = '';
        const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${this._api_key}&format=json&page=${page}`;
       
        console.log("New request to LastFM API - Page: " + page);
        ret = this._syncRequest(url);

        // If can't fetch from LastFM, attempt to fetch from local file (not that useful)
        if (!ret) {
            console.log("ERROR: Couldn't fetch songs from LastFM.")
            ret = JSON.parse(fs.readFileSync('samplemusicdata.json')).tracks.track;
            this._fetchedFromLocalFile = true;
        } else {
            ret = JSON.parse(ret).tracks.track;
        }

        return this._shuffle(ret);
    }

    _shuffle(src) {
        let src_keys = Object.keys(src);
        for (let i = 0; i < src_keys.length - 1; i++) {
            let j = i + Math.floor(Math.random() * (src_keys.length - i));
    
            let temp = src[j];
            src[j] = src[i];
            src[i] = temp;
        }
        return src;
    }

    _syncRequest(url) {
        let res = request('GET', url);
        return (res.getBody().toString('utf-8'));
    }
};

export default MusicRetriever;
