const API_URL = "http://localhost:4000/api/tasks";

export const taskService = {
  getAll: async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  },
  create: async (task) => {
    console.log(task);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...task,
        completed: false,
      }),
    });

    return res.json();
  },
  delete: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
  },
  update: async (id, updatedData) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error("Failed to update task");
    }
    return res.json();
  },
  toggleStatus: async (id) => {
    const res = await fetch(`${API_URL}/${id}/toggle`, { method: "PATCH" });
    return res.json();
  },
};
