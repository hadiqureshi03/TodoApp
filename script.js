// local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// DOM
const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");

const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");

// Gem localStorage
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ID
function createId() {
    return Date.now().toString();
}

// Render
function render() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");

        // Task 
        const info = document.createElement("span");
        info.className = "task-info";
        info.textContent = task.text;

        // Knapper
        const actions = document.createElement("div");
        actions.className = "actions";

        if (task.done) {
            const undoBtn = document.createElement("button");
            undoBtn.className = "btn-undo";
            undoBtn.textContent = "Fortryd";
            undoBtn.addEventListener("click", function () {
                task.done = false;
                save();
                render();
            });
            actions.appendChild(undoBtn);
        } else {
            const doneBtn = document.createElement("button");
            doneBtn.className = "btn-done";
            doneBtn.textContent = "Færdig";
            doneBtn.addEventListener("click", function () {
                task.done = true;
                save();
                render();
            });
            actions.appendChild(doneBtn);
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-delete";
        deleteBtn.textContent = "Slet";
        deleteBtn.addEventListener("click", function () {
            tasks = tasks.filter(function (t) {
                return t.id !== task.id;
            });
            save();
            render();
        });
        actions.appendChild(deleteBtn);

        li.appendChild(info);
        li.appendChild(actions);

        if (task.done) {
            doneList.appendChild(li);
        } else {
            todoList.appendChild(li);
        }
    });
}

// Tilføj
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = {
        id: createId(),
        text: text,

        done: false
    };

    tasks.push(newTask);
    save();
    render();

    taskInput.value = "";
    taskInput.focus();
});

// Render
render();
