import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import Main from "./Main";

ReactDOM.render(<Main />, document.getElementById("root"));
serviceWorker.unregister();
