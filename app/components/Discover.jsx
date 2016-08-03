import React, { Component } from "react";
import CSSModules from "react-css-modules";

import css from "../styles/Discover.scss";

export default class DiscoverCSS extends Component {
    render () {
        const artistsAlbumsSongsDropdown = (
            <div className="btn-group">
                <button type="button" className="btn btn-default dropdown-toggle" styleName="h2Title" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span styleName="dashedUnderline">albums</span>
                    <span className="caret" styleName="caret"></span>
                </button>
                <ul className="dropdown-menu" styleName="dropdown-menu">
                    <li><a href="#" role="button">artists</a></li>
                    <li className="active"><a href="#" role="button">albums</a></li>
                    <li><a href="#" role="button">songs</a></li>
                </ul>
            </div>
        );
        const bobDylan = (
            <div className="col-xs-4 col-sm-2">
                <div className="text-center">
                    <a title="Aller à la page de l'artiste" href="#/artist/15">
                        <img src="" width="200" height="200" className="img-responsive img-circle art" alt="Bob Dylan"/>
                    </a>
                    <h4>
                        Bob Dylan
                    </h4>
                </div>
            </div>
        );
        return (
            <div className="row">
                <h2 styleName="noMarginTop">
                    <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>&nbsp;
                    More { artistsAlbumsSongsDropdown } you might like
                </h2>

                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-4 col-sm-2 col-sm-offset-1">
                            <div className="text-center">
                                <a title="Aller à la page de l'artiste" href="#/artist/15">
                                    <img src="" width="200" height="200" className="img-responsive img-circle art" alt="Bob Dylan"/>
                                </a>
                                <h4>
                                    Bob Dylan
                                </h4>
                            </div>
                        </div>
                        { bobDylan }
                        { bobDylan }
                        { bobDylan }
                        { bobDylan }
                    </div>
                    <hr/>
                </div>


                <h2>
                    <span className="glyphicon glyphicon-hand-up" aria-hidden="true"></span>&nbsp;
                    Popular { artistsAlbumsSongsDropdown }
                </h2>
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-4 col-sm-2 col-sm-offset-1">
                            <div className="text-center">
                                <a title="Aller à la page de l'artiste" href="#/artist/15">
                                    <img src="" width="200" height="200" className="img-responsive img-circle art" alt="Bob Dylan"/>
                                </a>
                                <h4>
                                    Bob Dylan
                                </h4>
                            </div>
                        </div>
                        { bobDylan }
                        { bobDylan }
                        { bobDylan }
                        { bobDylan }
                    </div>
                    <hr/>
                </div>


                <h2>
                    <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;
                    Recent additions
                </h2>
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-4 col-sm-2 col-sm-offset-1">
                            <div className="text-center">
                                <a title="Aller à la page de l'artiste" href="#/artist/15">
                                    <img src="" width="200" height="200" className="img-responsive img-circle art" alt="Bob Dylan"/>
                                </a>
                                <h4>
                                    Bob Dylan
                                </h4>
                            </div>
                        </div>
                        { bobDylan }
                        { bobDylan }
                        { bobDylan }
                        { bobDylan }
                    </div>
                    <hr/>
                </div>


                <h2>
                    <span className="glyphicon glyphicon-volume-up" aria-hidden="true"></span>&nbsp;
                    Currently playing
                </h2>

                <table>
                </table>
            </div>
        );
    }
}

DiscoverCSS.propTypes = {
};

export default CSSModules(DiscoverCSS, css);