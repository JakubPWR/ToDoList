import React, { useContext } from "react";
import { StyledLeftPanel } from "../styles/leftPanelStyles";
import { StyledButton, LeftPanelButton } from "../styles/buttonStyles";
import { useHistory } from "react-router-dom";
import { ToDoContext } from "../views/App";
import Swal from "sweetalert2";

export const LeftPanel = () => {
  const { logged, setLogged } = useContext(ToDoContext);
  const history = useHistory();
  const logOut = () => {
    Swal.fire({
      title: "Are you sure you want to log out",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        setLogged(false);
        sessionStorage.removeItem("accessToken");
        history.push("/");
        Swal.fire("Logged out!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Logging out cancelled", "", "info");
      }
    });
  };
  return (
    <StyledLeftPanel>
      {/* Show Login and Register buttons only if user is not logged in */}
      {!logged && (
        <>
          <LeftPanelButton onClick={() => history.push("/login")}>
            Login
          </LeftPanelButton>
          <LeftPanelButton onClick={() => history.push("/registration")}>
            Register
          </LeftPanelButton>
        </>
      )}

      {/* Show "Add new To Do List" only if user is logged in */}
      {logged && (
        <>
          <LeftPanelButton onClick={() => logOut()}>Logout</LeftPanelButton>
          <LeftPanelButton
            style={{ backgroundColor: "green" }}
            onClick={() => history.push("/AddNewToDoList")}
          >
            Add new To Do List
          </LeftPanelButton>
          <LeftPanelButton
            style={{ backgroundColor: "yellow" }}
            onClick={() => history.push("/ToDoLists")}
          >
            Show your's ToDoLists
          </LeftPanelButton>
        </>
      )}
    </StyledLeftPanel>
  );
};
