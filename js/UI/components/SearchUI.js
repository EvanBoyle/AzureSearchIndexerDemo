var React = require('react');
var SearchResults = require('./SearchResults');
var request = require('request');
var Q = require('q');

var SearchUI = React.createClass({
    getInitialState: function(){
        return {
            results: []
        }
    },
    dummySearch: function(){
        console.info("search");
        this.setState({results: [
            "abc",
            "def",
            "hij",
            "klmnop"
            ]});
    },
    search: function(){

        var url = this.props.url +
        "/indexes/" + 
        this.props.index +
        "/docs?search=" +
        encodeURIComponent(this.refs.searchText.getDOMNode().value) + 
        "&api-version=2015-02-28"
        var headers = {'api-key': this.props.apikey};
        var options = {
            url: url,
            headers: headers,
            withCredentials: false
        };
        
        request.get(options, this.processResults);
    },
    handleKeyDown: function(evt) {
        if (evt.keyCode == 13 ) {
            return this.search();
        }
    },
    processResults: function(error, response, body){
        var data = JSON.parse(body).value
        this.setState({results: data});
    },
    render: function() {
        var self = this;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                    <div className="input-group">
                        <input type="text" className="form-control" ref="searchText" onKeyDown={this.handleKeyDown}/>  
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={this.search}>Search</button>
                        </span>
                    </div>
                    <SearchResults results={this.state.results}/>
                    </div>
                </div>
            </div>
            )
    }
});

module.exports = SearchUI;