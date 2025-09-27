// Retrieve tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

// DOM Elements
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Save to Local Storage
function saveTasks() {
  localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

// Render all tasks
function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No tasks yet. Add one above! ✅</p>";
    return;
  }

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-card";
    if (task.completed) taskDiv.classList.add("completed");

    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p class="meta">📘 Subject: ${task.subject}</p>
      <p class="meta">🗓 Deadline: ${task.deadline}</p>
      <p>${task.description}</p>
      <div class="actions">
        <button onclick="toggleComplete(${index})">
          ${task.completed ? "✅ Completed" : "✔️ Mark Complete"}
        </button>
        <button class="delete" onclick="deleteTask(${index})">🗑 Delete</button>
      </div>
    `;

    taskList.appendChild(taskDiv);
  });
}

// Add new task
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const deadline = document.getElementById("deadline").value;
  const description = document.getElementById("description").value.trim();

  if (!title || !subject || !deadline || !description) return;

  const newTask = {
    title,
    subject,
    deadline,
    description,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskForm.reset();
});

// Mark task as complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete a task
function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

// Initial render
renderTasks();
