import LastFM from 'last-fm';
import fs from 'fs';
import { pickRandomTrack } from './utils.js';

class MusicRetriever {
    constructor(api_key) {
        this._lastfm = new LastFM(api_key, { userAgent: 'urfaviskpop/1.0' });
        this._api_key = api_key;
        this._songList = this._fetchTopTracks({});
        this._counter = 0;
    }

    getSong() {
        if (this._counter == 50) {
            this._counter = 0;
            this._songList = this._fetchTopTracks({});
        }
        this._counter++;
        let track = pickRandomTrack(this._songList);
        let song = track.name + " - " + track.artist.name;
        return song;
    }

    _fetchTopTracks(opts) {
        // TODO: fix requesting data from LastFM API , instead of preloaded file       
        // this._lastfm.chartTopTracks(opts, (err, data) => {
        //     err
        // })

        let ret = JSON.parse(fs.readFileSync('samplemusicdata.json')).tracks.track;
        return ret;
    }
};

export default MusicRetriever;
