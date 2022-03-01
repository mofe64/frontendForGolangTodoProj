import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import TaskTile from "../components/TaskTile";
import Loader from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import { greenPrimary } from "../store/constant";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/context";
import { useCallback, useContext, useEffect, useState } from "react";
import { getUserTaskForToday } from "../api";
import notify from "../hooks/useNotify";

const Home = () => {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const navigate = useNavigate();
  const hasReached1200px = useMediaQuery("(max-width: 1200px)");
  const hasReached450px = useMediaQuery("(max-width: 450px)");

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const authToken = auth.token;
      const userId = auth.userId;
      const url = getUserTaskForToday(userId);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const response = await res.json();
      setLoading(false);
      if (res.ok) {
        const tasks = response.data.data;
        console.log("return", tasks);
        if (tasks !== null) {
          setTodaysTasks(tasks);
        }
      } else {
        console.log("res not ok block");
        throw Error("Something went wrong please try again");
      }
    } catch (err) {
      setLoading(false);
      notify(err.message, true);
    }
  }, [auth]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);
  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader type="TailSpin" color={greenPrimary} height={50} width={50} />
      </Box>
    );
  }
  if (todaysTasks.length === 0 || todaysTasks === null) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography mb="1rem" sx={{ fontWeight: "700", fontSize: "20px" }}>
            No Tasks Created For today
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: hasReached450px ? "column" : "row",
            }}
          >
            <Button
              onClick={() => {
                navigate({ pathname: "/create" });
              }}
              variant="contained"
              sx={{
                backgroundColor: greenPrimary,
                marginTop: "1rem",
                marginRight: hasReached450px ? "" : "1rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                "&:hover": { backgroundColor: greenPrimary },
              }}
            >
              Create New Task
            </Button>
            <Button
              onClick={() => {
                navigate({ pathname: "/all" });
              }}
              variant="contained"
              sx={{
                backgroundColor: greenPrimary,
                marginTop: "1rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                marginRight: hasReached450px ? "" : "1rem",
                "&:hover": { backgroundColor: greenPrimary },
              }}
            >
              View All My Tasks
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        padding: !hasReached1200px ? "3rem" : "1.5rem",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <ToastContainer />
      <Typography mb="1rem" sx={{ fontWeight: "700", fontSize: "20px" }}>
        {`Welcome ${auth.name}`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          marginBottom: "2rem",
          justifyContent: hasReached450px ? "center" : "start",
          flexDirection: hasReached450px ? "column" : "row",
        }}
      >
        <Button
          onClick={() => {
            navigate({ pathname: "/create" });
          }}
          variant="contained"
          sx={{
            backgroundColor: greenPrimary,
            marginTop: "1rem",
            marginRight: hasReached450px ? "" : "1rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            "&:hover": { backgroundColor: greenPrimary },
          }}
        >
          Create New Task
        </Button>
        <Button
          onClick={() => {
            navigate({ pathname: "/all" });
          }}
          variant="contained"
          sx={{
            backgroundColor: greenPrimary,
            marginTop: "1rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            marginRight: hasReached450px ? "" : "1rem",
            "&:hover": { backgroundColor: greenPrimary },
          }}
        >
          View All My Tasks
        </Button>
        <Button
          onClick={() => {
            const user = auth.name === "mofe" ? "Suvwe" : "mofe";
            navigate({ pathname: `/tasks/${user}` });
          }}
          variant="contained"
          sx={{
            backgroundColor: greenPrimary,
            marginTop: "1rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            "&:hover": { backgroundColor: greenPrimary },
          }}
        >
          {`See ${auth.name === "mofe" ? "Suvwe's" : "Mofe's"} Tasks`}
        </Button>
      </Box>
      <Typography mb="1rem" sx={{ fontWeight: "700", fontSize: "17px" }}>
        Here are today's tasks
      </Typography>
      <Box sx={{ width: "100%" }}>
        {todaysTasks.map((value, index) => (
          <TaskTile key={index} task={value} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
