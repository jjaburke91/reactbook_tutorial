const ReactDOM = require('react-dom');
const React = require('react');

const Heading = require('./jsx/Heading.jsx');

ReactDOM.render(
    <Heading initialText="Hello World!"/>,
    document.getElementById('app')
);

