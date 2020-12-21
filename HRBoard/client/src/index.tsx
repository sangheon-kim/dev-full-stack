import React from "react";
import "./index.scss";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./Store";
import axios from "axios";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

function deepCopy(target: { [key: string]: any }) {
  if (target && typeof target === "object") {
    Object.keys(target).forEach((key: any) => {
      if (typeof target[key] === "object") {
        return deepCopy(target[key]);
      }
    });
  }

  return target;
}

function postStatic(staticObject: { [key: string]: any }) {
  const url = "http://localhost:9000/statics";

  const parsingFunc = (item: { [key: string]: any }, key: string) => {
    const whiteList = ["id", "tagName", "className", "outerHTML"];
    const stringObj = JSON.stringify(item[key], whiteList);
    const obj = {
      ...item,
      target: JSON.parse(stringObj),
    };

    return obj;
  };

  const handler = {
    get(target: any, key: any) {
      if (Array.isArray(target[key])) {
        return target[key].map((item: any) => {
          if ("target" in item) {
            return parsingFunc(item, "target");
          } else if ("element" in item) {
            return parsingFunc(item, "element");
          } else {
            return item;
          }
        });
      } else {
        return target[key];
      }
    },
  };

  const proxy = new Proxy(staticObject, handler);
  const obj = deepCopy(proxy);

  fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
}

// reportWebVitals(postStatic);
// reportWebVitals(console.log);
