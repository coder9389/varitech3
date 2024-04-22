document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Display tasks
    function displayTasks() {
      taskList.innerHTML = '';
      tasks.forEach(function(task, index) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
          <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(li);
      });
    }
  
    // Add task
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const text = taskInput.value.trim();
      if (text !== '') {
        tasks.push({ text, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
        taskInput.value = '';
      }
    });
  
    // Delete task
    taskList.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-btn')) {
        const index = event.target.dataset.index;
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
      }
    });
  
    // Toggle task completion
    taskList.addEventListener('click', function(event) {
      if (event.target.tagName === 'SPAN') {
        const index = [...event.target.parentNode.parentNode.children].indexOf(event.target.parentNode);
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
      }
    });
  
    // Initial display of tasks
    displayTasks();
  });
  