/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { IUsersState } from "./Store/Users";
import { connect } from "react-redux";
import { reqGetUsers } from "Store/Users/Users.store";
import MainContainer from "Containers/MainContainer";
import MenuPannel from "Components/MenuPannel/MenuPannel";

function App() {
  return (
    <div className={`App`}>
      <Router>
        <div id="Menu">
          <MenuPannel />
        </div>
        <div id="container">
          <Switch>
            <Route path="/" component={MainContainer} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default connect(
  ({ Users }: { Users: IUsersState }) => ({
    users: Users.userList,
  }),
  {
    reqGetUsers,
  }
)(App);
