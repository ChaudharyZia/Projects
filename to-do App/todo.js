// Function to add a new task to the list
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    var listItem = document.createElement("li");
    listItem.innerHTML = `<input type="checkbox" onchange="toggleTask(this)"> ${taskInput.value}
                          <button onclick="deleteTask(this)">Delete</button>`;
    
    taskList.appendChild(listItem);
    taskInput.value = "";

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

// Function to toggle the task as done or undone
function toggleTask(checkbox) {
    var listItem = checkbox.parentNode;
    listItem.classList.toggle("completed");

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

// Function to delete a task
function deleteTask(button) {
    var listItem = button.parentNode;
    listItem.remove();

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

// Function to clear all tasks
function clearAll() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    var taskList = document.getElementById("taskList");
    var tasks = [];

    // Loop through each task and save it to the array
    for (var i = 0; i < taskList.children.length; i++) {
        var taskText = taskList.children[i].textContent.trim();
        var isCompleted = taskList.children[i].classList.contains("completed");

        tasks.push({ text: taskText, completed: isCompleted });
    }

    // Convert the tasks array to JSON and save it to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    var taskList = document.getElementById("taskList");
    var tasks = localStorage.getItem("tasks");

    // Parse the JSON string to an array
    tasks = JSON.parse(tasks) || [];

    // Loop through each task and add it to the list
    tasks.forEach(function(task) {
        var listItem = document.createElement("li");
        listItem.innerHTML = `<input type="checkbox" onchange="toggleTask(this)" ${task.completed ? 'checked' : ''}> ${task.text}
                              <button onclick="deleteTask(this)">Delete</button>`;

        // If the task was completed, add the 'completed' class
        if (task.completed) {
            listItem.classList.add("completed");
        }

        taskList.appendChild(listItem);
    });
}

// Function to load tasks from local storage when the page loads
loadTasksFromLocalStorage();

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}