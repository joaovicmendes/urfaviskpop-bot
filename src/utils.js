export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export function pickRandomTrack(songList){
    let obj_keys = Object.keys(songList);
    let ran_key = obj_keys[Math.floor(Math.random() * obj_keys.length)];

    return songList[ran_key];
}
