import React from "react";
import "./index.scss";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./Store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

function postStatic(staticObject: { [key: string]: any }) {
  const url = "http://localhost:9000/statics";
  staticObject.entries.forEach((item: any) => {
    if ("target" in item) {
      console.log(item["target"]);
      JSON.stringify(item["target"]);
    } else if ("element" in item) {
      console.log(item["element"]);
    }
  });
  console.log(staticObject.entries);

  // fetch(url, {
  //   method: "POST",
  //   mode: "cors",
  //   cache: "no-cache",
  //   credentials: "same-origin",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: typeof staticObject === "object" ? JSON.stringify(staticObject) : staticObject,
  // });
}

reportWebVitals(postStatic);
