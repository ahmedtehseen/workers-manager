import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect, populate } from "react-redux-firebase";
import { Card, CardText } from "material-ui";
import Alarm from "material-ui/svg-icons/action/alarm";
import CheckCircle from "material-ui/svg-icons/action/check-circle";
import ErrorOutline from "material-ui/svg-icons/alert/error-outline";
import Layers from "material-ui/svg-icons/maps/layers";
import styles from "../Dashboard.styles";
import { TaskTable } from "./TaskTable";
import { TotalTasks } from "./TotalTasks";
import { CompletedTasks } from "./CompletedTasks";
// import { WorkerTaskTable } from "./WorkerTaskTable";
// import { Reports } from "./../../Report/Reports";
import { WorkerList } from "./../../Report/WorkerList";
import { ChatList } from "../../Chat/ChatList";
import { ChatBox } from "../../Chat";
import { Route } from "react-router-dom";

class DashboardLayoutComponent extends Component {
  render() {
    console.log(this.props.userS, "useerrrrss");
    const { user } = this.props;
    const tasksKeys =
      this.props.tasks !== undefined
        ? this.props.tasks !== null
          ? Object.keys(this.props.tasks)
          : null
        : null;
    return (
      <div style={styles.taskContainer}>
        <div style={styles.statusContainer}>
          <Card containerStyle={styles.card}>
            <CardText style={styles.cardText}>
              <div style={styles.iconContainer}>
                <Layers
                  style={styles.icon}
                  color={"#7AB15A"}
                  hoverColor={"#77B443"}
                />
              </div>
              <div style={styles.text}>
                <div style={styles.heading}>
                  {tasksKeys !== null ? tasksKeys.length : "0"}
                </div>
                <div>Tasks</div>
              </div>
            </CardText>
          </Card>
          <Card containerStyle={styles.card}>
            <CardText style={styles.cardText}>
              <div style={styles.iconContainer}>
                <Alarm
                  style={styles.icon}
                  color={"#7AB15A"}
                  hoverColor={"#77B443"}
                />
              </div>
              <div style={styles.text}>
                <div style={styles.heading}>0</div>
                <div>Late</div>
              </div>
            </CardText>
          </Card>
          <Card containerStyle={styles.card}>
            <CardText style={styles.cardText}>
              <div style={styles.iconContainer}>
                <CheckCircle
                  style={styles.icon}
                  color={"#7AB15A"}
                  hoverColor={"#77B443"}
                />
              </div>
              <div style={styles.text}>
                <div style={styles.heading}>
                  {tasksKeys !== null
                    ? tasksKeys.filter(key => {
                        return this.props.tasks[key].status === "completed";
                      }).length
                    : "0"}
                </div>
                <div>Completed</div>
              </div>
            </CardText>
          </Card>
          <Card containerStyle={styles.card}>
            <CardText style={styles.cardText}>
              <div style={styles.iconContainer}>
                <ErrorOutline
                  style={styles.icon}
                  color={"#7AB15A"}
                  hoverColor={"#77B443"}
                />
              </div>
              <div style={styles.text}>
                <div style={styles.heading}>
                  {tasksKeys !== null
                    ? tasksKeys.filter(key => {
                        return this.props.tasks[key].status === "pending";
                      }).length
                    : "0"}
                </div>
                <div>
                  {user !== null
                    ? user.role === "admin"
                      ? "Pending"
                      : "Ongoing"
                    : "Ongoing"}
                </div>
              </div>
            </CardText>
          </Card>
        </div>
        <div style={styles.tableContainer}>
          <Route exact path="/dashboard" component={TaskTable} />
          <Route path="/dashboard/total-tasks" exact component={TotalTasks} />
          <Route
            path="/dashboard/completed-tasks"
            exact
            component={CompletedTasks}
          />
          <Route path="/dashboard/workers" exact component={ChatList} />
          <Route path="/dashboard/reports" exact component={WorkerList} />
          <Route path="/dashboard/chat" exact component={ChatList} />
          {this.props.workers && (
            <Route
              exact
              path={"/dashboard/chat/:id"}
              render={props => (
                <ChatBox {...props} allUsers={this.props.workers} />
              )}
            />
          )}
        </div>
      </div>
    );
  }
}

const wrappedDashboardLayout = firebaseConnect(["all-tasks"])(
  DashboardLayoutComponent
);

const mapStateToProps = state => {
  return {
    tasks: populate(state.firebase, "all-tasks"),
    user: state.auth.user,
    workers: state.dashboard.workers
  };
};

export let DashboardLayout = connect(
  mapStateToProps,
  {}
)(wrappedDashboardLayout);
