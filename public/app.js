const API = "/tasks";

async function fetchTasks() {
  const res = await fetch(API);
  const tasks = await res.json();

  const container = document.getElementById("tasks");
  container.innerHTML = "";

  tasks.forEach(task => {
    container.innerHTML += `
      <div class="task">
        <h3 class="${task.completed ? "done" : ""}">${task.title}</h3>
        <p>${task.description || ""}</p>

        <button onclick="toggleTask(${task.id}, ${task.completed})">
          ${task.completed ? "Undo" : "Done"}
        </button>

        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
  });
}

async function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  });

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  fetchTasks();
}

async function toggleTask(id, completed) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed })
  });

  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  fetchTasks();
}

fetchTasks();