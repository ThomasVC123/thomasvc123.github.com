if (localStorage.getItem('isLoggedIn')) {
function renderTasks() {
  const tasksContainer = document.getElementById('tasks');
  let tasks = [];
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasksContainer.innerHTML = '';
  
  if (tasks.length > 0) {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const checkboxHeader = document.createElement('th');
    checkboxHeader.innerHTML = 'Done';
    const descriptionHeader = document.createElement('th');
    descriptionHeader.innerHTML = 'Description';
    headerRow.appendChild(checkboxHeader);
    headerRow.appendChild(descriptionHeader);
    table.appendChild(headerRow);
  
    tasks.forEach(task => {
      const row = document.createElement('tr');
      const checkboxCell = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.done;
      checkbox.addEventListener('change', () => {
        task.done = checkbox.checked;
        if (checkbox.checked) {
          task.description += ' (Thomas)';
        } else {
          task.description = task.description.replace(' (Thomas)', '');
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      });
      checkboxCell.appendChild(checkbox);
      row.appendChild(checkboxCell);
  
      const descriptionCell = document.createElement('td');
      descriptionCell.innerHTML = task.description;
      row.appendChild(descriptionCell);
  
      table.appendChild(row);
    });
  
    tasksContainer.appendChild(table);
  } else {
    tasksContainer.innerHTML = 'No tasks found.';
  }
  
}
function goToLoginScreen() {
  window.location.href = 'index.html';
}
}
else{
  window.location.href = 'index.html';
}