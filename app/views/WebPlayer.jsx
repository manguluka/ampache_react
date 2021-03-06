// NPM imports
import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { Howler, Howl } from "howler";

// Local imports
import { messagesMap, handleErrorI18nObject } from "../utils";
import { UNSUPPORTED_MEDIA_TYPE, ONLOAD_ERROR } from "../actions/webplayer";

// Actions
import * as actionCreators from "../actions";

// Components
import WebPlayerComponent from "../components/elements/WebPlayer";

// Translations
import messages from "../locales/messagesDescriptors/elements/WebPlayer";

// Define translations
const webplayerMessages = defineMessages(messagesMap(Array.concat([], messages)));


/**
 * Webplayer container.
 */
class WebPlayerIntl extends Component {
    constructor(props) {
        super(props);

        // Data attributes
        this.howl = null;

        // Bind this
        this.startPlaying = this.startPlaying.bind(this);
        this.stopPlaying = this.stopPlaying.bind(this);
        this.isPlaying = this.isPlaying.bind(this);
    }

    componentDidMount() {
        // Start playback upon component mount
        this.startPlaying(this.props);
    }

    componentWillUpdate(nextProps) {
        // Handle stop
        if (
            // No current song in updated props
            !nextProps.currentSong ||
            // No playlist in updated props
            nextProps.playlist.size < 1 ||
            // Song played is not the song currently played
            (this.props.currentSong && nextProps.currentSong.get("id") != this.props.currentSong.get("id"))
        ) {
            if (this.howl) {
                this.stopPlaying();
            }
        }

        // Toggle play / pause
        if (
            // This check ensure we do not start playing multiple times the
            // same song
            (nextProps.isPlaying != this.props.isPlaying) ||
            // Or we should be playing but there is no howl object playing
            (nextProps.isPlaying && !this.isPlaying())
        ) {
            this.startPlaying(nextProps);
        }

        // If something is playing back
        if (this.howl) {
            // Set mute / unmute
            this.howl.mute(nextProps.isMute);
            // Set volume
            this.howl.volume(nextProps.volume / 100);
        }
    }

    /**
     * Handle playback through Howler and Web Audio API.
     *
     * @params  props   A set of props to use for setting play parameters.
     */
    startPlaying(props) {
        if (props.isPlaying && props.currentSong) {
            // If it should be playing any song
            const url = props.currentSong.get("url");
            const format = url.split(".").pop();
            const isPlayable = Howler.codecs(format);
            if (isPlayable) {
                // Build a new Howler object with current song to play
                this.howl = new Howl({
                    src: [url],
                    html5: true,  // Use HTML5 by default to allow streaming
                    mute: props.isMute,
                    volume: props.volume / 100,  // Set current volume
                    autoplay: false,  // No autoplay, we handle it manually
                    format: format,  // Specify format as Howler is unable to fetch it from URL
                    onloaderror: () => props.actions.setError(ONLOAD_ERROR),  // Display error if song cannot be loaded
                    onend: () => props.actions.playNextSong(),  // Play next song at the end
                });
                // Start playing
                this.howl.play();
            } else {
                // Howler already performs this check on his own, but we have
                // to do it ourselves to be able to display localized errors
                // for every possible error.
                // TODO: This could most likely be simplified.
                props.actions.setError(UNSUPPORTED_MEDIA_TYPE);
            }
        }
        else {
            // If it should not be playing
            if (this.howl) {
                // Pause any running music
                this.howl.pause();
            }
        }
    }

    /**
     * Stop playback through Howler and Web Audio API.
     */
    stopPlaying() {
        // Stop music playback
        this.howl.stop();
        // Reset howl object
        this.howl = null;
    }

    /**
     * Check whether some music is currently playing or not.
     *
     * @return  True / False whether music is playing.
     */
    isPlaying() {
        if (this.howl) {
            return this.howl.playing();
        }
        return false;
    }

    render() {
        const { formatMessage } = this.props.intl;

        const webplayerProps = {
            isPlaying: this.props.isPlaying,
            isRandom: this.props.isRandom,
            isRepeat: this.props.isRepeat,
            isMute: this.props.isMute,
            volume: this.props.volume,
            currentIndex: this.props.currentIndex,
            playlist: this.props.playlist,
            error: handleErrorI18nObject(this.props.error, formatMessage, webplayerMessages),
            currentSong: this.props.currentSong,
            currentArtist: this.props.currentArtist,
            // Use a lambda to ensure no first argument is passed to
            // togglePlaying
            onPlayPause: (() => this.props.actions.togglePlaying()),
            onPrev: this.props.actions.playPreviousSong,
            onSkip: this.props.actions.playNextSong,
            onRandom: this.props.actions.toggleRandom,
            onRepeat: this.props.actions.toggleRepeat,
            onMute: this.props.actions.toggleMute,
            isPlaylistViewActive: (
                (this.props.location && this.props.location.pathname == "/playlist")
                ? true
                : false
            ),
        };
        return (
            (this.props.playlist.size > 0)
            ? <WebPlayerComponent {...webplayerProps} />
            : <div></div>
        );
    }
}
WebPlayerIntl.propTypes = {
    location: PropTypes.object,
    intl: intlShape.isRequired,
};
const mapStateToProps = (state) => {
    const currentIndex = state.webplayer.currentIndex;
    const playlist = state.webplayer.playlist;

    // Get current song and artist from entities store
    const currentSong = state.entities.getIn(["entities", "song", playlist.get(currentIndex)]);
    let currentArtist = undefined;
    if (currentSong) {
        currentArtist = state.entities.getIn(["entities", "artist", currentSong.get("artist")]);
    }
    return {
        isPlaying: state.webplayer.isPlaying,
        isRandom: state.webplayer.isRandom,
        isRepeat: state.webplayer.isRepeat,
        isMute: state.webplayer.isMute,
        volume: state.webplayer.volume,
        currentIndex: currentIndex,
        playlist: playlist,
        error: state.webplayer.error,
        currentSong: currentSong,
        currentArtist: currentArtist,
    };
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WebPlayerIntl));
