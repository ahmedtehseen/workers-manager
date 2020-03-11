import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  App,
  Login,
  Dashboard,
  TaskTable,
  Task,
  TotalTasks,
  CompletedTasks,
  Chat,
  ChatList,
  ChatBox,
  WorkerList,
  Reports,
  Report
} from "./modules";

const Root = props => {
  console.log([]);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        {/* <Route exact path="/dashboard/chat/:key" component={ChatBox} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
