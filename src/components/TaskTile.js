import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { greenPrimary } from "../store/constant";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCallback, useContext, useState } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../store/context";
import { completeTaskurl, deleteTaskurl } from "../api";
import notify from "../hooks/useNotify";

const TaskTile = ({ task }) => {
  const { auth } = useContext(AuthContext);
  const [loadingProcess, setLoadingProcess] = useState("");
  const [loading, setLoading] = useState(false);
  const hasReached1200px = useMediaQuery("(max-width: 1200px)");
  const hasReached650px = useMediaQuery("(max-width: 650px)");
  const complete = useCallback(async () => {
    try {
      setLoading(true);
      setLoadingProcess("complete");
      const authToken = auth.token;
      const taskId = task.id;
      const url = completeTaskurl(taskId);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const response = await res.json();
      setLoading(false);
      setLoadingProcess("");
      if (res.ok) {
        console.log("completed", response);
        notify("Completed", false, () => {
          window.location.reload();
        });
      } else {
        throw Error(response.data.data);
      }
    } catch (err) {
      console.log(err);
      notify(err.message, true);
    }
  }, [auth.token, task.id]);

  const deleteTask = useCallback(async () => {
    try {
      setLoading(true);
      setLoadingProcess("delete");
      const authToken = auth.token;
      const taskId = task.id;
      const url = deleteTaskurl(taskId);
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const response = await res.json();
      setLoading(false);
      setLoadingProcess("");
      if (res.ok) {
        console.log("Deleted", response);
        notify("Deleted", false, () => {
          window.location.reload();
        });
      } else {
        throw Error(response.data.data);
      }
    } catch (err) {
      console.log(err);
      notify(err.message, true);
    }
  }, [auth.token, task.id]);

  return (
    <Box
      sx={{
        minHeight: "5rem",
        display: "flex",
        flexDirection: hasReached1200px ? "column" : "row",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        marginTop: "1rem",
        borderRadius: "5px",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: hasReached650px ? "center" : "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            fontSize: "17px",
            flexDirection: hasReached650px ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "17px", fontWeight: "bold", color: greenPrimary }}
          >
            Task Title:
          </Typography>
          <Typography sx={{ fontSize: "12px" }}> {task.name}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            fontSize: "17px",
            flexDirection: hasReached650px ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "17px", fontWeight: "bold", color: greenPrimary }}
          >
            Task Description:
          </Typography>
          <Typography sx={{ fontSize: "12px" }}> {task.description}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            fontSize: "17px",
            flexDirection: hasReached650px ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "17px", fontWeight: "bold", color: greenPrimary }}
          >
            Task Completed:
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>
            {" "}
            {task.completed ? "True" : "False"}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
        }}
      >
        <Button
          onClick={complete}
          variant="contained"
          sx={{
            backgroundColor: greenPrimary,
            fontSize: "17px",
            "&:hover": { backgroundColor: greenPrimary },
          }}
        >
          {loading && loadingProcess === "complete" && (
            <Loader type="TailSpin" color="#FFF" height={20} width={20} />
          )}
          {!loading && loadingProcess !== "complete" && "Complete"}
        </Button>

        <Box sx={{ marginRight: "3rem" }} />
        <Button
          onClick={deleteTask}
          variant="contained"
          sx={{
            backgroundColor: "red",
            fontSize: "17px",
            "&:hover": { backgroundColor: "red" },
          }}
        >
          {loading && loadingProcess === "delete" && (
            <Loader type="TailSpin" color="#FFF" height={20} width={20} />
          )}
          {!loading && loadingProcess !== "delete" && "Delete"}
        </Button>
      </Box>
    </Box>
  );
};

export default TaskTile;
