'use strict';

let currentTodos = [
  {id:1, title: 'HTML', completed: true},
  {id:2, title: 'HTML', completed: true},
  {id:3, title: 'HTML', completed: true}
]

const root = document.querySelector('.todoapp');
const newTodoField = root.querySelector('.new-todo');
const itemsList = root.querySelector('.todo-list');
const allToggler = root.querySelector('.toggle-all');
const clearCompletedButton = root.querySelector('.clear-completed');
const filter = root.querySelector('.filters');

initTodos(currentTodos);

// Add exist todo data
function initTodos(todos) {
  for (const todo of currentTodos) {
    itemsList.insertAdjacentHTML('beforeend', `
  <li data-id="${todo.id}" class="todo-item ${todo.comleted ? 'completed' : ''}">
    <div class="view">
      <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
      <label>${todo.title}</label>
      <button class="destroy"></button>
    </div>
  </li>
  `);
  }
}

// Update todo list
function updateInfo() {
  const activeTogglers = root.querySelectorAll('.toggle:not(:checked)');
  const completedTogglers = root.querySelectorAll('.toggle:checked');
  const counter = root.querySelector('.todo-count');
  const footer = root.querySelector('.footer');
  const toggleAllContainer = root.querySelector('.toggle-all-container');

  activeTogglers.length === 1 ? counter.innerHTML = `${activeTogglers.length} item left`:
  counter.innerHTML = `${activeTogglers.length} items left`;
  allToggler.checked = activeTogglers.length === 0;
  clearCompletedButton.hidden = completedTogglers.length === 0;

  const hasTodos = completedTogglers.length > 0 || activeTogglers.length > 0;
  footer.hidden = !hasTodos;
  toggleAllContainer.hidden = !hasTodos;
  console.log(currentTodos);
}

// Filter todo list
filter.addEventListener('click', (event) => {
  if (!event.target.dataset.filter) {
    return;
  }

  const filterButtons = root.querySelectorAll('[data-filter]');

  for (const button of filterButtons) {
    button.classList.toggle('selected', event.target === button);
  }

  const togglers = root.querySelectorAll('.toggle');

  for (const toggler of togglers) {
    const item = toggler.closest('.todo-item');

    switch (event.target.dataset.filter) {
      case 'all':
        item.hidden = false;
        break;

      case 'active':
        item.hidden = toggler.checked;
        break;

      case 'completed':
        item.hidden = !toggler.checked;
        break;
    }
  }
});

// Add todo
newTodoField.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') {
    return;
  }

  if (!newTodoField.value) {
    return; 
  }

  const id = +new Date();
  currentTodos.push({
    id: id,
    title: newTodoField.value,
    completed: false,
  });

  itemsList.insertAdjacentHTML('beforeend', `
  <li data-id="${id}" class="todo-item">
    <div class="view">
      <input class="toggle" type="checkbox">
      <label>${newTodoField.value}</label>
      <button class="destroy"></button>
    </div>
  </li>
  `);

  newTodoField.value = '';
  updateInfo();
});

// Toggle all
allToggler.addEventListener('change', () => {
  const togglers = root.querySelectorAll('.toggle');

  for (const toggler of togglers) {
    toggler.checked = allToggler.checked;
    toggler.closest('.todo-item').classList.toggle('completed', allToggler.checked);
  }

  currentTodos.forEach(todo => {
    todo.completed = allToggler.checked;
  });
  
  updateInfo();
});

// Remove todo
itemsList.addEventListener('click', (event) => {
  if (!event.target.matches('.destroy')) {
    return;
  }
  const item = event.target.closest('.todo-item');
  item.remove();

  currentTodos = currentTodos.filter(todo => todo.id !== +item.dataset.id);
  updateInfo();
});

// Toggle todo status
itemsList.addEventListener('change', (event) => {
  if (!event.target.matches('.toggle')) {
    return;
  }

  const item = event.target.closest('.todo-item');
  item.classList.toggle('completed', event.target.checked);
  const selectedTodo = currentTodos.find(todo => todo.id === +item.dataset.id)
  selectedTodo.completed = event.target.checked
  updateInfo();
});

// Clear completed
clearCompletedButton.addEventListener('click', () => {
  const completedTogglers = root.querySelectorAll('.toggle:checked');

  for (const toggler of completedTogglers) {
    toggler.closest('.todo-item').remove();
  }

  currentTodos = currentTodos.filter(todo => !todo.completed);
  updateInfo();
});