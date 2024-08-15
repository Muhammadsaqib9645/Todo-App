document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('newTask');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const listItem = createTodoItem(taskText);
        document.getElementById('todoList').appendChild(listItem);
        taskInput.value = '';
    }
}

function createTodoItem(text) {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.value = text;
    taskInput.disabled = true;

    const buttons = document.createElement('div');
    buttons.className = 'buttons';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => toggleEdit(taskInput);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(listItem);

    const upButton = document.createElement('button');
    upButton.textContent = 'Up';
    upButton.onclick = () => moveTask(listItem, -1);

    const downButton = document.createElement('button');
    downButton.textContent = 'Down';
    downButton.onclick = () => moveTask(listItem, 1);

    const duplicateButton = document.createElement('button');
    duplicateButton.textContent = 'Duplicate';
    duplicateButton.onclick = () => duplicateTask(text);

    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    buttons.appendChild(upButton);
    buttons.appendChild(downButton);
    buttons.appendChild(duplicateButton);

    listItem.appendChild(taskInput);
    listItem.appendChild(buttons);

    return listItem;
}

function toggleEdit(input) {
    input.disabled = !input.disabled;
    input.focus();
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }
}
function moveTask(listItem, direction) {
    const list = document.getElementById('todoList');
    const index = Array.from(list.children).indexOf(listItem);

    if (direction === -1 && index > 0) {
        list.insertBefore(listItem, list.children[index - 1]);
    } else if (direction === 1 && index < list.children.length - 1) {
        list.insertBefore(list.children[index + 1], listItem);
    }

    saveTasks();
}

function duplicateTask(text) {
    const listItem = createTodoItem(text);
    document.getElementById('todoList').appendChild(listItem);
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todoList input[type="text"]').forEach(input => {
        tasks.push(input.value);
    });
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    tasks.forEach(task => {
        const listItem = createTodoItem(task);
        list.appendChild(listItem);
    });
}

function clearTasks() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        localStorage.removeItem('todoTasks');
        document.getElementById('todoList').innerHTML = '';
    }
    function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
{
    const updateTaskStatus = async (taskId, completed) => {
        await Task.findByIdAndUpdate(taskId, { completed });
      };
}
}