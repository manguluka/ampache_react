/**
 * These actions are actions acting on the webplayer.
 */

// Other actions
import { decrementRefCount, incrementRefCount } from "./entities";


export const PLAY_PAUSE = "PLAY_PAUSE";
/**
 * Toggle play / pause for the webplayer.
 *
 * @param   playPause   [Optional] True to play, false to pause. If not given,
 *                      toggle the current state.
 *
 * @return  Dispatch a PLAY_PAUSE action.
 */
export function togglePlaying(playPause) {
    return (dispatch, getState) => {
        let newIsPlaying = false;
        if (typeof playPause !== "undefined") {
            // If we want to force a mode
            newIsPlaying = playPause;
        } else {
            // Else, just toggle
            newIsPlaying = !(getState().webplayer.isPlaying);
        }
        // Dispatch action
        dispatch({
            type: PLAY_PAUSE,
            payload: {
                isPlaying: newIsPlaying,
            },
        });
    };
}


export const STOP_PLAYBACK = "STOP_PLAYBACK";
/**
 * Stop the webplayer, clearing the playlist.
 *
 * Handle the entities store reference counting.
 *
 * @return  Dispatch a STOP_PLAYBACK action.
 */
export function stopPlayback() {
    return (dispatch, getState) => {
        // Handle reference counting
        dispatch(decrementRefCount({
            song: getState().webplayer.get("playlist").toArray(),
        }));
        // Stop playback
        dispatch ({
            type: STOP_PLAYBACK,
        });
    };
}


export const SET_PLAYLIST = "SET_PLAYLIST";
/**
 * Set a given playlist.
 *
 * Handle the entities store reference counting.
 *
 * @param   playlist    A list of song IDs.
 *
 * @return  Dispatch a SET_PLAYLIST action.
 */
export function setPlaylist(playlist) {
    return (dispatch, getState) => {
        // Handle reference counting
        dispatch(decrementRefCount({
            song: getState().webplayer.get("playlist").toArray(),
        }));
        dispatch(incrementRefCount({
            song: playlist,
        }));
        // Set playlist
        dispatch ({
            type: SET_PLAYLIST,
            payload: {
                playlist: playlist,
            },
        });
    };
}


/**
 * Play a given song, emptying the current playlist.
 *
 * Handle the entities store reference counting.
 *
 * @param   songID      The id of the song to play.
 *
 * @return  Dispatch a SET_PLAYLIST action to play this song and start playing.
 */
export function playSong(songID) {
    return (dispatch, getState) => {
        // Handle reference counting
        dispatch(decrementRefCount({
            song: getState().webplayer.get("playlist").toArray(),
        }));
        dispatch(incrementRefCount({
            song: [songID],
        }));
        // Set new playlist
        dispatch({
            type: SET_PLAYLIST,
            payload: {
                playlist: [songID],
            },
        });
        // Force playing
        dispatch(togglePlaying(true));
    };
}


export const PUSH_SONG = "PUSH_SONG";
/**
 * Push a given song in the playlist.
 *
 * Handle the entities store reference counting.
 *
 * @param   songID      The id of the song to push.
 * @param   index       [Optional] The position to insert at in the playlist.
 *                      If negative, counts from the end. Defaults to last.
 *
 * @return  Dispatch a PUSH_SONG action.
 */
export function pushSong(songID, index=-1) {
    return (dispatch) => {
        // Handle reference counting
        dispatch(incrementRefCount({
            song: [songID],
        }));
        // Push song
        dispatch({
            type: PUSH_SONG,
            payload: {
                song: songID,
                index: index,
            },
        });
    };
}


export const POP_SONG = "POP_SONG";
/**
 * Pop a given song from the playlist.
 *
 * Handle the entities store reference counting.
 *
 * @param   songID      The id of the song to pop.
 *
 * @return  Dispatch a POP_SONG action.
 */
export function popSong(songID) {
    return (dispatch) => {
        // Handle reference counting
        dispatch(decrementRefCount({
            song: [songID],
        }));
        // Pop song
        dispatch({
            type: POP_SONG,
            payload: {
                song: songID,
            },
        });
    };
}


export const JUMP_TO_SONG = "JUMP_TO_SONG";
/**
 * Set current playlist index to specific song.
 *
 * @param   songID      The id of the song to play.
 *
 * @return  Dispatch a JUMP_TO_SONG action.
 */
export function jumpToSong(songID) {
    return (dispatch) => {
        // Push song
        dispatch({
            type: JUMP_TO_SONG,
            payload: {
                song: songID,
            },
        });
    };
}


export const PLAY_PREVIOUS = "PLAY_PREVIOUS";
/**
 * Move one song backwards in the playlist.
 *
 * @return  Dispatch a PLAY_PREVIOUS action.
 */
export function playPrevious() {
    return (dispatch) => {
        dispatch({
            type: PLAY_PREVIOUS,
        });
    };
}


export const PLAY_NEXT = "PLAY_NEXT";
/**
 * Move one song forward in the playlist.
 *
 * @return  Dispatch a PLAY_NEXT action.
 */
export function playNext() {
    return (dispatch) => {
        dispatch({
            type: PLAY_NEXT,
        });
    };
}


export const TOGGLE_RANDOM = "TOGGLE_RANDOM";
/**
 * Toggle random mode.
 *
 * @return  Dispatch a TOGGLE_RANDOM action.
 */
export function toggleRandom() {
    return {
        type: TOGGLE_RANDOM,
    };
}


export const TOGGLE_REPEAT = "TOGGLE_REPEAT";
/**
 * Toggle repeat mode.
 *
 * @return  Dispatch a TOGGLE_REPEAT action.
 */
export function toggleRepeat() {
    return {
        type: TOGGLE_REPEAT,
    };
}


export const TOGGLE_MUTE = "TOGGLE_MUTE";
/**
 * Toggle mute mode.
 *
 * @return  Dispatch a TOGGLE_MUTE action.
 */
export function toggleMute() {
    return {
        type: TOGGLE_MUTE,
    };
}


export const SET_VOLUME = "SET_VOLUME";
/**
 * Set the volume.
 *
 * @param   volume      Volume to set (between 0 and 100)
 *
 * @return  Dispatch a SET_VOLUME action.
 */
export function setVolume(volume) {
    return {
        type: SET_VOLUME,
        payload: {
            volume: volume,
        },
    };
}
