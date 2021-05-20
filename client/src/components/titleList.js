
////////////////
// Title List //
////////////////

// Title List Container
import React from "react";
import $ from "jquery";

var createClass = require('create-react-class');

export var TitleList = createClass({

    apiKey: '87dfa1c669eea853da609d4968d294be',
    getInitialState: function() {
        return {data: [], mounted: false};
    },
    loadContent: function() {
        var requestUrl = 'https://api.themoviedb.org/3/' + this.props.url + '&api_key=' + this.apiKey;

        $.ajax({
            url: requestUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
                // console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadContent();
        this.setState({ mounted: true });
    },
    componentWillUnmount: function() {
        this.setState({ mounted: false });
    },
    render: function() {
        const lecture = this.props.lecture;
        if(this.state.data.results) {
            var titles = this.state.data.results.map(function(title, i) {
                if(i < 5) {

                    var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
                    if(!title.name) {
                        var name = title.original_title;
                    } else {
                        var name = title.name;
                    }

                    return (
                        <Item lecture={lecture} key={title.id} title={name} score={title.vote_average} overview={title.overview} backdrop={backDrop} />
                    );

                }
            });

        } else {
            var titles = '';
        }

        return (
            <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
                <div className="Title">
                    <h1>{this.props.title}</h1>
                    <div className="titles-wrapper">
                        {titles}
                    </div>
                </div>
            </div>
        );
    }
});

// Title List Item
var Item = createClass({
    linkTo: function(){
        window.location.href = this.props.lecture.lectureLink[0];
    },
    render: function() {
        return (

            <div className="Item" onClick={this.linkTo} style={{backgroundImage: 'url(' + this.props.backdrop + ')'}} >
                <a href={this.props.lecture.lectureLink[0]}>
                <div className="overlay">
                    <div className="title">{this.props.lecture.lectureCategory}</div>
                    <div className="rating">{this.props.score} / 10</div>
                    <div className="plot">{this.props.lecture.professor}</div>
                    <div className="plot">{this.props.lecture.lectureDescription[0]}</div>
                    <ListToggle />
                </div>
                </a>
            </div>
        );
    }
});

// ListToggle
var ListToggle = createClass({
    getInitialState: function() {
        return({ toggled: false })
    },
    handleClick: function() {
        if(this.state.toggled === true) {
            this.setState({ toggled: false });
        } else {
            this.setState({ toggled: true });
        }

    },
    render: function() {
        return (
            <div onClick={this.handleClick} data-toggled={this.state.toggled} className="ListToggle">
                <div>
                    <i className="fa fa-fw fa-plus"></i>
                    <i className="fa fa-fw fa-check"></i>
                </div>
            </div>
        );
    }
});

export default TitleList;