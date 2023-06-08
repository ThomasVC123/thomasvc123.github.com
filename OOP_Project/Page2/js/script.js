if (localStorage.getItem('isLoggedIn')) {
function addTask() {
    const taskDescription = document.getElementById('task').value;
  
    if (taskDescription.trim() === '') {
      showMessage('Please enter a task description');
      return;
    }
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const task = {
      id: tasks.length + 1,
      description: taskDescription,
      done: false
    };
  
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showMessage('Task added successfully');
    displayTasks();
  }
  
  function displayTasks() {
    const taskTableBody = document.getElementById('taskTableBody');
    taskTableBody.innerHTML = '';
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    tasks.forEach(function(task) {
      const row = document.createElement('tr');
  
      const idCell = document.createElement('td');
      idCell.textContent = task.id;
  
      const descriptionCell = document.createElement('td');
      descriptionCell.textContent = task.description;
  
      const statusCell = document.createElement('td');
      statusCell.textContent = task.done ? 'Done' : 'Not done';
  
      const actionCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        deleteTask(task.id);
        row.remove();
      });
      actionCell.appendChild(deleteButton);
  
      row.appendChild(idCell);
      row.appendChild(descriptionCell);
      row.appendChild(statusCell);
      row.appendChild(actionCell);
  
      taskTableBody.appendChild(row);
    });
  }
  
  function goToLoginScreen() {
    // Clear tasks and localStorage when navigating to the login screen
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
  }
  function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(function(task) {
      return task.id === taskId;
    });
  
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      showMessage('Task deleted successfully');
    }
  }
}
else{
    window.location.href = 'index.html';
}