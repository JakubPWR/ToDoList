import React, { useState, useEffect, createContext } from "react";
import { StyledBody } from "../styles/appStyles";
import { GlobalStyle } from "../styles/globalStyles";
import { ToDoBody } from "../components/toDoBody";
import { LeftPanel } from "../components/leftPanel";
import { finishedToDos } from "../data/finishedToDos";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { Edit } from "../views/Edit";
import Swal from "sweetalert2";
import { FinishedTasks } from "./FinishedTasks";
import { AddNewTask } from "../views/AddNewTask";
import axios from "axios";
import { Login } from "../views/Login";
import { Registration } from "../views/Registration";
import { AddNewToDoList } from "../views/AddNewToDoList";
import { ToDoLists } from "./ToDoLists";

export const ToDoContext = createContext();

function App() {
  const [finishedToDoData, setFinishedToDoData] = useState(finishedToDos);
  const [toDoData, setData] = useState([]);
  const [logged, setLogged] = useState(false);
  const [currentToDoList, setCurrentToDoList] = useState("");
  const location = useLocation();
  const [toDoListName, setToDoListName] = useState("");

  const GetUser = () => {
    const authenticated = sessionStorage.getItem("accessToken");
    if (authenticated) {
      setLogged(true);
    }
  };
  // const fetchToDoData = () => {
  //   if (currentToDoList === "") {
  //     return;
  //   }
  //   axios
  //     .get("http://localhost:5000/ToDos/byListId", {
  //       headers: {
  //         id: currentToDoList,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching To-Do data:", error);
  //     });
  // };

  useEffect(() => {
    // fetchToDoData();
    GetUser();
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      // fetchToDoData();
      GetUser();
    }
  }, [location]);

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
        Task.listId = currentToDoList;
        axios.patch(`http://localhost:5000/ToDos/finish/${id}`, Task);
        axios.delete(`http://localhost:5000/ToDos/delete/${id}`);

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
        axios
          .delete(`http://localhost:5000/ToDos/delete/${id}`)
          .then(() => {
            // Immediately update the state by filtering out the deleted item
            setData((prevData) => prevData.filter((item) => item.id !== id));
            Swal.fire("Deleted!", "", "success");
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            Swal.fire("Error deleting item", "", "error");
          });
      } else if (result.isDenied) {
        Swal.fire("Deletion cancelled", "", "info");
      }
    });
  };

  return (
    <ToDoContext.Provider
      value={{
        logged,
        setLogged,
        toDoData,
        setData,
        finishedToDoData,
        setFinishedToDoData,
        FinishTask,
        deleteItemFunction,
        currentToDoList,
        setCurrentToDoList,
        toDoListName,
        setToDoListName,
      }}
    >
      <Router>
        <GlobalStyle />
        <StyledBody>
          <Switch>
            <Route exact path="/Login">
              <Login />
            </Route>
            <Route exact path="/">
              <LeftPanel />
              <ToDoBody />
            </Route>
            <Route exact path="/Edit/:itemId">
              <Edit />
            </Route>
            <Route exact path="/FinishedTasks">
              <FinishedTasks />
            </Route>
            <Route exact path="/AddNewTask">
              <AddNewTask />
            </Route>
            <Route exact path="/Registration">
              <Registration />
            </Route>
            <Route exact path="/AddNewToDoList">
              <AddNewToDoList />
            </Route>
            <Route exact path="/ToDoLists">
              <LeftPanel />
              <ToDoLists />
            </Route>
          </Switch>
        </StyledBody>
      </Router>
    </ToDoContext.Provider>
  );
}

export default App;
