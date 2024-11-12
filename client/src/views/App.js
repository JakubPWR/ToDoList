import React, { useState, useEffect, createContext } from "react";
import { StyledBody } from "../styles/appStyles";
import { GlobalStyle } from "../styles/globalStyles";
import { ToDoBody } from "../components/toDoBody";
import { LeftPanel } from "../components/leftPanel";
import { finishedToDos } from "../data/finishedToDos";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Edit } from "../views/Edit";
import Swal from "sweetalert2";
import { FinishedTasks } from "./FinishedTasks";
import { AddNewTask } from "../views/AddNewTask";
import axios from "axios";

// Create a context for the To-Do data
export const ToDoContext = createContext();

function App() {
  const [finishedToDoData, setFinishedToDoData] = useState(finishedToDos);
  const [toDoData, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/ToDos").then((response) => {
      setData(response.data);
    });
  }, []);

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
        const fullDate = `${Today.getFullYear()}-${
          Today.getMonth() + 1
        }-${Today.getDate()}`;
        const Task = toDoData.find((e) => e.id === id);
        Task.FinishDate = fullDate;
        Task.finished = true;

        // Remove the task from toDoData and add it to finishedToDoData
        setData(toDoData.filter((e) => e.id !== id));
        setFinishedToDoData([...finishedToDoData, Task]);
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
        const newData = toDoData.filter((task) => task.id !== id);
        setData(newData);
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Deletion cancelled", "", "info");
      }
    });
  };

  return (
    <ToDoContext.Provider
      value={{
        toDoData,
        setData,
        finishedToDoData,
        setFinishedToDoData,
        FinishTask,
        deleteItemFunction,
      }}
    >
      <Router>
        <GlobalStyle />
        <StyledBody>
          <Switch>
            <Route exact path="/">
              <LeftPanel />
              <ToDoBody />
            </Route>
            <Route exact path="/edit/:itemId">
              <Edit />
            </Route>
            <Route exact path="/FinishedTasks">
              <FinishedTasks />
            </Route>
            <Route exact path="/AddNewTask">
              <AddNewTask />
            </Route>
          </Switch>
        </StyledBody>
      </Router>
    </ToDoContext.Provider>
  );
}

export default App;
