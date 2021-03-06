/**
 * This implements the webplayer reducers.
 */

// NPM imports
import Immutable from "immutable";

// Local imports
import { createReducer } from "../utils";

// Models
import { stateRecord } from "../models/webplayer";

// Actions
import {
    PLAY_PAUSE,
    STOP_PLAYBACK,
    SET_PLAYLIST,
    PUSH_SONG,
    POP_SONG,
    JUMP_TO_SONG,
    PLAY_PREVIOUS_SONG,
    PLAY_NEXT_SONG,
    TOGGLE_RANDOM,
    TOGGLE_REPEAT,
    TOGGLE_MUTE,
    SET_VOLUME,
    SET_ERROR,
    INVALIDATE_STORE } from "../actions";


/**
 * Initial state
 */

var initialState = new stateRecord();


/**
 * Reducers
 */

export default createReducer(initialState, {
    [PLAY_PAUSE]: (state, payload) => {
        // Force play or pause
        return (
            state
            .set("isPlaying", payload.isPlaying)
            .set("error", null)
        );
    },
    [STOP_PLAYBACK]: (state) => {
        // Clear the playlist
        return (
            state
            .set("isPlaying", false)
            .set("currentIndex", 0)
            .set("playlist", new Immutable.List())
            .set("error", null)
        );
    },
    [SET_PLAYLIST]: (state, payload) => {
        // Set current playlist, reset playlist index
        return (
            state
            .set("playlist", new Immutable.List(payload.playlist))
            .set("currentIndex", 0)
            .set("error", null)
        );
    },
    [PUSH_SONG]: (state, payload) => {
        // Push song to playlist
        let newState = state;
        if (payload.index) {
            // If index is specified, insert it at this position
            newState = newState.set(
                "playlist",
                newState.get("playlist").insert(payload.index, payload.song)
            );
            if (payload.index <= newState.get("currentIndex")) {  // "<=" because insertion is made before
                // If we insert before the current position in the playlist, we
                // update the current position to keep the currently played
                // music
                newState = newState.set(
                    "currentIndex",
                    Math.min(newState.get("currentIndex") + 1, newState.get("playlist").size)
                );
            }
        } else {
            // Else, push at the end of the playlist
            newState = newState.set(
                "playlist",
                newState.get("playlist").push(payload.song)
            );
        }
        return newState;
    },
    [POP_SONG]: (state, payload) => {
        // Pop song from playlist
        let newState = state.deleteIn(["playlist", payload.index]);
        if (payload.index < state.get("currentIndex")) {
            // If we delete before the current position in the playlist, we
            // update the current position to keep the currently played
            // music
            newState = newState.set(
                "currentIndex",
                Math.max(newState.get("currentIndex") - 1, 0)
            );
        } else if (payload.index == state.get("currentIndex")) {
            // If we remove current song, clear the error as well
            newState = newState.set("error", null);
        }
        return newState;
    },
    [JUMP_TO_SONG]: (state, payload) => {
        // Set current index
        const newCurrentIndex = state.get("playlist").findKey(x => x == payload.song);
        return state.set("currentIndex", newCurrentIndex);
    },
    [PLAY_PREVIOUS_SONG]: (state) => {
        const newIndex = state.get("currentIndex") - 1;
        if (newIndex < 0) {
            // If there is an overlow on the left of the playlist, just play
            // first music again
            // TODO: Should seek to beginning of music
            return state.set("error", null);
        } else {
            return (
                state
                .set("currentIndex", newIndex)
                .set("error", null)
            );
        }
    },
    [PLAY_NEXT_SONG]: (state) => {
        let newIndex = state.get("currentIndex") + 1;
        if (newIndex >= state.get("playlist").size) {
            // If there is an overflow
            if (state.get("isRepeat")) {
                // If we are at the end of the playlist and repeat mode is on,
                // just play back first song.
                newIndex = 0;
            } else {
                // Just stop playback
                return (
                    state
                    .set("isPlaying", false)
                    .set("error", null)
                );
            }
        } else {
            // Else, play next item
            return (
                state
                .set("currentIndex", newIndex)
                .set("error", null)
            );
        }
    },
    [TOGGLE_RANDOM]: (state) => {
        return state.set("isRandom", !state.get("isRandom"));
    },
    [TOGGLE_REPEAT]: (state) => {
        return state.set("isRepeat", !state.get("isRepeat"));
    },
    [TOGGLE_MUTE]: (state) => {
        return state.set("isMute", !state.get("isMute"));
    },
    [SET_VOLUME]: (state, payload) => {
        return state.set("volume", payload.volume);
    },
    [SET_ERROR]: (state, payload) => {
        return (
            state
            .set("isPlaying", false)
            .set("error", payload.error)
        );
    },
    [INVALIDATE_STORE]: () => {
        return new stateRecord();
    },
});
