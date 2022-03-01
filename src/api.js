const baseUrl = "https://accountability-project.herokuapp.com";

export const loginUrl = `${baseUrl}/user/login`;
export const createTaskUrl = `${baseUrl}/tasks`;
export const getUserTaskForToday = (userId) =>
  `${baseUrl}/tasks/user/${userId}/today`;
export const getAllTasksUrl = (userId) => `${baseUrl}/tasks/user/${userId}`;

export const deleteTaskurl = (taskId) => `${baseUrl}/tasks/${taskId}`;
export const completeTaskurl = (taskId) =>
  `${baseUrl}/tasks/complete/${taskId}`;
