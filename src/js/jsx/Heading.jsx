const React = require('react');

module.exports = React.createClass({
    name: "Heading",

    propTypes: {
        initialText: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
            text: this.props.initialText
        }
    },

    render: function() {
        return (
            <h1 id="my-heading">
                <span><em>{this.state.text}</em></span>
            </h1>
        );
    }
});

// var Header = ReactDOM.render(
//     React.createElement(Heading, {
//         initialText: "Hello World"
//     }),
//     document.getElementById('app')
// );