const API_URL = "http://192.168.1.77:3000/todos";

export const getTasks = async () => {
  const res = await fetch(API_URL);
  const json = await res.json();
  return json.data;
};

export const getTaskById = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`);
  const json = await res.json();
  return json.data;
};

export const createTask = async (task: {
  title: string;
  description: string;
  completed: boolean;
}) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (
  id: string,
  task: { title: string; description: string; completed: boolean },
) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const deleteTask = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
};
