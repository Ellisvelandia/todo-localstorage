const input = document.querySelector(".input-btn input");
const listTasks = document.querySelector(".list-tasks ul");
const message = document.querySelector(".list-tasks");
let tasks = [];

function eventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    tasks = [];
    createHTML();
  });

  listTasks.addEventListener("click", deleteTask);
}

function addTasks() {
  const task = input.value;
  if (task === "") {
    showError("The field is empty");
    return;
  }

  const taskObj = {
    task,
    id: Date.now(),
  };
  tasks = [...tasks, taskObj];

  createHTML();
  sincronizationStorage();
  input.value = "";
}

function createHTML() {
  clearHTML();
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
      ${task.task} <span task-id="${task.id}">X</span>
      `;
      listTasks.appendChild(li);
    });
  }
}

function deleteTask(e) {
  if (e.target.tagName == "SPAN") {
    const deleteId = parseInt(e.target.getAttribute("task-id"));
    tasks = tasks.filter((task) => task.id !== deleteId);
    createHTML();
    sincronizationStorage();
  }
}

function sincronizationStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearHTML() {
  listTasks.innerHTML = "";
}

function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    createHTML();
    sincronizationStorage();
  }
}

function showError(error) {
  const messageError = document.createElement("p");
  messageError.textContent = error;
  messageError.classList.add("error");

  message.appendChild(messageError);

  setTimeout(() => {
    messageError.remove();
  }, 2000);
}

eventListeners();
