import "./css/style.css";
import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAtTime: string;
  createdAtDate: string;
};

const taskForm = document.getElementById("taskForm") as HTMLFormElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;
const item = document.getElementById("newTask") as HTMLInputElement;
const search = document.getElementById("searchForm") as HTMLFormElement;
const clearAllBtn = document.getElementById("clear-all") as HTMLButtonElement;

taskForm.addEventListener("submit", handleTaskFormSubmit);
taskList.addEventListener("click", itemDeletion);
search.addEventListener("submit", searchItem);
search.addEventListener("click", clearSearch);
clearAllBtn.addEventListener("click", clearAll);

const Tasks: Task[] = loadTasks();
Tasks.forEach((item) => renderTask(item));

function handleTaskFormSubmit(event: SubmitEvent) {
  event.preventDefault();

  if (item.value === null || item.value == "") return;

  const newTask: Task = {
    id: uuidV4(),
    title: item.value,
    completed: false,
    createdAtTime: new Date().toLocaleTimeString("en-US", {
      timeStyle: "short", // Only the time
    }),
    createdAtDate: new Date().toLocaleDateString("en-US", {
      dateStyle: "medium", // Only the date
    }),
  };

  Tasks.push(newTask);
  saveTask();

  renderTask(newTask);
  item.value = "";
}

function renderTask(taskItem: Task) {
  //Creating Li element
  const li = document.createElement("li") as HTMLLIElement;
  li.className = "task-item";

  //Creating checkbox element
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "task-checkbox";
  checkBox.checked = taskItem.completed;

  //updating task status
  if (taskItem.completed) {
    li.classList.toggle("completed");
  }
  checkBox.addEventListener("change", () => {
    taskItem.completed = checkBox.checked;
    li.classList.toggle("completed");
    saveTask();
  });

  //Creating Label element
  const label = document.createElement("label");
  label.className = "task-label";
  label.textContent = taskItem.title;

  //Creating Time Stamp
  const time = document.createElement("span");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  time.className = "time";
  p1.textContent = taskItem.createdAtTime;
  p2.textContent = taskItem.createdAtDate;

  //Creating Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.className = "task-delete-btn";
  const span = document.createElement("span");
  span.className = "material-icons";
  span.textContent = "delete";

  //assigining id for each taskItem
  deleteButton.id = taskItem.id;

  deleteButton.append(span);
  li.append(checkBox);
  li.append(label);
  time.append(p1);
  time.append(p2);
  li.append(time);
  li.append(deleteButton);

  taskList.append(li);
}

function saveTask() {
  localStorage.setItem("TASKS", JSON.stringify(Tasks));
}

function loadTasks(): Task[] {
  const tasksJSON = localStorage.getItem("TASKS");
  if (tasksJSON === null) return [];

  const tasks: Task[] = JSON.parse(tasksJSON);
  return tasks;
}

//Delete item
function itemDeletion(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const deleteBtn = target.closest(".task-delete-btn");

  if (deleteBtn) {
    const id = deleteBtn.id;

    const taskIndex = Tasks.findIndex((index) => index.id === id);

    if (taskIndex !== -1) {
      Tasks.splice(taskIndex, 1);
      saveTask();

      const itemToRemove = deleteBtn.closest(".task-item");
      itemToRemove?.remove();
    }
  }
}
function clearAll() {
  const confirmed = confirm("Are you sure you want to delete all task?");

  if (confirmed) {
    localStorage.removeItem("TASKS");
    taskList.innerHTML = "";
  }
}

//search item
const searchTerm = document.querySelector(".search-input") as HTMLInputElement;
function searchItem(event: SubmitEvent) {
  event.preventDefault();

  const searchString = searchTerm.value.toLowerCase().trim();

  const searchResult = Tasks.filter((tasks) =>
    tasks.title.toLowerCase().includes(searchString)
  );

  taskList.innerHTML = "";
  searchResult.forEach((item) => renderTask(item));
}

//clear search
function clearSearch(e: MouseEvent) {
  e.preventDefault();

  searchTerm.value = "";
  taskList.innerHTML = "";
  Tasks.forEach((item) => renderTask(item));
}
