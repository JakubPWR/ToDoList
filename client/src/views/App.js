import React from "react";
import { useState, useEffect } from "react";
import { StyledBody } from "../styles/appStyles";
import { GlobalStyle } from "../styles/globalStyles";
import { ToDoBody } from "../components/toDoBody";
import { LeftPanel } from "../components/leftPanel";
import { toDoList } from "../data/toDoList";
import { finishedToDos } from "../data/finishedToDos";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { Edit } from "../views/Edit";
import Swal from "sweetalert2";
import { FinishedTasks } from "./FinishedTasks";
import { AddNewTask } from "../views/AddNewTask";
import axios from "axios";

function App() {
  const [finishedToDoData, setFinishedToDoData] = useState(finishedToDos);
  const [toDoData, setData] = useState(toDoList);

  const FinishTask = (id) => {
    Swal.fire({
      title: "Are you sure you want to finish this task",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const Today = new Date();
        const month = Today.getMonth() + 1;
        const year = Today.getFullYear();
        const date = Today.getDate();
        const fullDate = `${year}-${month}-${date}`;
        const Task = toDoData.filter((e) => e.id == id);
        Task.FinishDate = fullDate;
        Task.finished = true;
        setData(toDoData.filter((e) => e.id != id));
        finishedToDoData.push(Task);
        setFinishedToDoData(finishedToDoData);
        Swal.fire("Task Finished!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Finishing Canceled", "", "info");
      }
    });
  };

  const deleteItemFunction = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this item",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const newData = toDoData.filter((user) => user.id !== id);
        setData(newData);
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Deletion cancelled", "", "info");
      }
    });
  };
  return (
    <>
      <Router>
        <GlobalStyle />
        <StyledBody>
          <Switch>
            <Route exact path="/">
              <LeftPanel />
              <ToDoBody
                toDoData={toDoData}
                DeleteItem={deleteItemFunction}
                FinishFunction={FinishTask}
              />
            </Route>
            <Route exact path="/edit/:itemId">
              <Edit />
            </Route>
            <Route exact path="/FinishedTasks">
              <FinishedTasks finishedToDoData={finishedToDoData} />
            </Route>
            <Route exact path="/AddNewTask">
              <AddNewTask />
            </Route>
          </Switch>
        </StyledBody>
      </Router>
    </>
  );
}

export default App;
