document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');

    addTodoBtn.addEventListener('click', addTodo);

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const li = document.createElement('li');
            li.innerHTML = `<span class="todo-text">${todoText}</span>
                            <button onclick="deleteTodo(this)">Delete</button>`;
            todoList.appendChild(li);
            todoInput.value = ''; // Clear input
        }
    }

    // Delete Todo function
    window.deleteTodo = function(button) {
        button.parentNode.remove();
    };

    // Toggle completed state (optional, add to li element if needed)
    todoList.addEventListener('click', function(event) {
        if (event.target.tagName === 'SPAN' && event.target.classList.contains('todo-text')) {
            event.target.parentNode.classList.toggle('completed');
        }
    });
});