let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let completedCount = 0;

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            completedCount++;
        }

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>
            <div class="actions">
                <button class="complete-btn" onclick="toggleTask(${index})">
                    ✔
                </button>
                <button class="delete-btn" onclick="deleteTask(${index})">
                    ✖
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    document.getElementById("total").innerText = tasks.length;
    document.getElementById("completed").innerText = completedCount;
    document.getElementById("remaining").innerText = tasks.length - completedCount;

    updateMessage(completedCount);
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";

    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function updateMessage(completed) {
    const message = document.getElementById("motivation");

    if (completed === tasks.length && tasks.length > 0) {
        message.innerText = "Amazing! All tasks completed 🎉";
    } else if (completed > 0) {
        message.innerText = "Nice progress! Keep working 💪";
    } else {
        message.innerText = "Start your tasks and stay productive ✨";
    }
}

renderTasks();
