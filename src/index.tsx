// import * as React from "react";
// import * as ReactDom from "react-dom";
// import App from "./components/App";
const React = require("react");
const ReactDom = require("react-dom");
const App = require("./components/App").default;

ReactDom.render(<App />, document.getElementById("root"));
