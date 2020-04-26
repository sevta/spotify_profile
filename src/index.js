import * as React from "react";
import ReactDOM from "react-dom";
import Login from "./containers/Login";
import Home from "./containers/Home";
import { token } from "./utils/spotify";
import Scrollbar from "react-smooth-scrollbar";

function App() {
  const [_token, setToken] = React.useState();

  React.useEffect(() => {
    setToken(token);
  }, []);

  return (
    <div className="wrapper w-full h-screen">
      <Scrollbar className="w-full h-screen">
        {_token ? <Home /> : <Login />}
      </Scrollbar>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
