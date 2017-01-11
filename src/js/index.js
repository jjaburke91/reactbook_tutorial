/** Mixings **/
var logMixin = {
    _log: function(methodName, args) { 
        console.log(this.name + '::', methodName, args);
    },
    componentWillUpdate: function() {
        this._log('componentWillUpdate', arguments); 
    },
    componentDidUpdate: function(){ 
        this._log('componentDidUpdate', arguments);
    },
    componentWillMount: function(){
        this._log('componentWillMount', arguments); 
    },
    componentDidMount: function() { 
        this._log('componentDidMount', arguments);

        console.log(ReactDOM.findDOMNode(this));
    },
    componentWillUnmount: function() {
        this._log('componentWillUnmount', arguments); 
    },
};



/** Classes **/

var Counter = React.createClass({
                name: "Counter",
                mixins: [React.addons.PureRenderMixin],

                propTypes: {
                    count: React.PropTypes.number.isRequired
                },

                render: function() {
                    console.log(this.name + ':: Rendering');
                    return React.DOM.span(null,
                        this.props.count
        );
    }
});

var TextAreaCounter = React.createClass({ 
    name: 'TextAreaCounter',
    mixins: [logMixin, React.addons.PureRenderMixin],

    propTypes: {
        initialValue: React.PropTypes.string,
    },    

    getDefaultProps: function() {
        return {
            initialValue: 'joe bloggs', 
        };
    },

    getInitialState: function() {
        return {
            text: this.props.initialValue
        }
    },

    _textChange: function(e) {
        this.setState({
            text: e.target.value
        });
    },

    render: function() {
        var counter = null;

        if (this.state.text.length > 0) {
            counter = React.DOM.h3(null,
                React.createElement(Counter, {
                    count: this.state.text.length
                })
            );
        }
        return React.DOM.div(null,
            React.DOM.textarea({ 
                value: this.state.text,
                onChange: this._textChange
            }),
            counter
        );
    } 
});

/** Rendering **/

// var textArea = ReactDOM.render(
//     React.createElement(TextAreaCounter, {
//         initialValue: 'jamie'
//     }),
//     document.getElementById("app")
// );  

