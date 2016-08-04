import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import Immutable from "immutable";

import * as actionCreators from "../actions";
import { i18nRecord } from "../models/i18n";
import { buildPaginationObject, messagesMap } from "../utils";

import Songs from "../components/Songs";

import APIMessages from "../locales/messagesDescriptors/api";

const songsMessages = defineMessages(messagesMap(APIMessages));

class SongsPageIntl extends Component {
    componentWillMount () {
        const currentPage = parseInt(this.props.location.query.page) || 1;
        // Load the data
        this.props.actions.loadSongs({pageNumber: currentPage});
    }

    componentWillReceiveProps (nextProps) {
        const currentPage = parseInt(this.props.location.query.page) || 1;
        const nextPage = parseInt(nextProps.location.query.page) || 1;
        if (currentPage != nextPage) {
            // Load the data
            this.props.actions.loadSongs({pageNumber: nextPage});
        }
    }

    render () {
        const {formatMessage} = this.props.intl;
        if (this.props.error) {
            let errorMessage = this.props.error;
            if (this.props.error instanceof i18nRecord) {
                errorMessage = formatMessage(songsMessages[this.props.error.id], this.props.error.values);
            }
            alert(errorMessage);
            this.context.router.replace("/");
            return (<div></div>);
        }
        const pagination = buildPaginationObject(this.props.location, this.props.currentPage, this.props.nPages, this.props.actions.goToPageAction);
        return (
            <Songs isFetching={this.props.isFetching} songs={this.props.songsList} pagination={pagination} />
        );
    }
}

SongsPageIntl.contextTypes = {
    router: PropTypes.object.isRequired
};

SongsPageIntl.propTypes = {
    intl: intlShape.isRequired,
};

const mapStateToProps = (state) => {
    let songsList = new Immutable.List();
    if (state.api.result.get("song")) {
        songsList = state.api.result.get("song").map(function (id) {
            let song = state.api.entities.getIn(["track", id]);
            // Add artist and album infos
            const artist = state.api.entities.getIn(["artist", song.get("artist")]);
            const album = state.api.entities.getIn(["album", song.get("album")]);
            song = song.set("artist", new Immutable.Map({id: artist.get("id"), name: artist.get("name")}));
            song = song.set("album", new Immutable.Map({id: album.get("id"), name: album.get("name")}));
            return song;
        });
    }
    return {
        isFetching: state.api.isFetching,
        error: state.api.error,
        artistsList: state.api.entities.get("artist"),
        albumsList: state.api.entities.get("album"),
        songsList: songsList,
        currentPage: state.api.currentPage,
        nPages: state.api.nPages
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SongsPageIntl));
