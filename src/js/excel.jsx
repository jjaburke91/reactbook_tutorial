
var Excel = React.createClass({
    displayName: 'Excel',
    propTypes: {
        headers: React.PropTypes.arrayOf(
            React.PropTypes.string
        ),
        initialData: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.string
            )
        )
    },

    _preSearchData: null, // contains the unmodified data object before every search, so as to revert when necessary.

    getInitialState: function() {
        return {
            data: this.props.initialData,
            sortBy: null,
            descending: false,
            edit: null, // {row: index, cell: index}
            search: false
        }
    },

    _sort: function(e) {
        var column = e.target.cellIndex;
        var descending = this.state.sortBy === column && !this.state.descending;

        var data = Array.from(this.state.data);

        data.sort( function(a,b) {
            return descending
                ? a[column] < b[column] ? 1 : -1
                : a[column] > b[column] ? 1 : -1
        });

        this.setState( {
            descending: descending,
            sortBy: column,
            data: data
        });
    },

    _showEditor: function(e) {
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex
            }
        });
    },

    _save: function(e) {
        e.preventDefault();
        var input = e.target.firstChild; // input field
        var data = Array.from(this.state.data);

        data[this.state.edit.row][this.state.edit.cell] = input.value;

        this.setState({
            edit: null,
            data: data
        });
    },

    _toggleSearch: function(e) {
        if (this.state.search) {
            this.setState({
                search: false,
                data: this._preSearchData
            });
            this._preSearchData = null;
        } else {
            this._preSearchData = this.state.data;
            this.setState({
                search: true
            });
        }
    },

    _search: function(e) {
        var searchTerm = e.target.value.toLowerCase();

        if (!searchTerm) {
            this.setState({
                data: this._preSearchData
            });
            return;
        }

        var index = e.target.dataset.index; // which column to search

        var searchData = this._preSearchData.filter( function(row) {
            return row[index].toString().toLowerCase().indexOf(searchTerm) > -1;
        });

        this.setState({
            data: searchData
        });
    },

    /** Renders **/

    _renderSearch: function() {
        if (!this.state.search) {
            return null;
        }
        return (
            React.DOM.tr({onChange: this._search},
                this.props.header.map( function(_ignore, index) {
                    return React.DOM.td( {key:index},
                        React.DOM.input({
                            type: 'text',
                            'data-index': index
                        })
                    );
                })
            )
        );
    },

    _renderTable: function() {
        return (
            React.DOM.table(null,
                React.DOM.thead({onClick: this._sort},
                    React.DOM.tr(null,
                        this.props.header.map(function(title, index) { // maps across each item in this.props.header and returns each as a React element (th)
                            if (this.state.sortBy === index) {
                                title += this.state.descending ? ' \u2191' : ' \u2193';
                            }
                            return React.DOM.th({key: index}, title);
                        }, this) // NOTE: 'this' is passed into map function in order to maintain access to outside scope.
                    )
                ),
                React.DOM.tbody({onDoubleClick: this._showEditor},
                    this._renderSearch(),
                    this.state.data.map( function(row, rowIndex) {
                        return (
                            React.DOM.tr( {key: rowIndex},
                                row.map( function(cell, index) {
                                    var content = cell;
                                    var edit = this.state.edit;

                                    if (edit && edit.row === rowIndex && edit.cell === index) { // is this the cell to edit?
                                        content = React.DOM.form({onSubmit: this._save},
                                            React.DOM.input({
                                                type: 'text',
                                                defaultValue: content
                                            })
                                        );
                                    }

                                    return React.DOM.td({key:index, 'data-row':rowIndex}, content)
                                }, this)
                            )
                        );
                    }, this)
                )
            )
        );
    },

    _renderToolbar: function() {
        return React.DOM.button(
            {
                onClick: this._toggleSearch,
                className: "toolbar"
            },
            'search'
        );
    },

    render: function() {
        return (
            React.DOM.div(null,
                this._renderToolbar(),
                this._renderTable()
            )
        )
    }
 });

// var Table = ReactDOM.render(
//     React.createElement( Excel, {
//         header: headers,
//         initialData: data
//     }),
//     document.getElementById("app")
// );