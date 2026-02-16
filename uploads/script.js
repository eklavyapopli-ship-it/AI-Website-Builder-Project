document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    addButton.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${taskText}</span>
                <button class="delete-button">Delete</button>
            `;

            taskList.appendChild(listItem);

            // Add delete functionality to the new button
            const deleteButton = listItem.querySelector('.delete-button');
            deleteButton.addEventListener('click', deleteTask);

            taskInput.value = ''; // Clear the input
        }
    }

    function deleteTask(event) {
        const listItem = event.target.parentNode;
        taskList.removeChild(listItem);
    }
});