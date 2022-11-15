'use strict';

const root = document.querySelector('.todoapp');
const newTodoField = root.querySelector('.new-todo');
const itemsList = root.querySelector('.todo-list');
const allToggler = root.querySelector('.toggle-all');
const clearCompletedButton = root.querySelector('.clear-completed');

function updateInfo() {
  const notCompletedTogglers = root.querySelectorAll('.toggle:not(:checked)');
  const counter = root.querySelector('.todo-count');
  const completedTogglers = root.querySelectorAll('.toggle:checked');

  notCompletedTogglers.length === 1 ? counter.innerHTML = `${notCompletedTogglers.length} item left`:
  counter.innerHTML = `${notCompletedTogglers.length} items left`;
  allToggler.checked = notCompletedTogglers.length === 0;
  clearCompletedButton.hidden = completedTogglers.length === 0;
}

allToggler.addEventListener('change', () => {
  const togglers = root.querySelectorAll('.toggle');

  for (const toggler of togglers) {
    toggler.checked = allToggler.checked;
    toggler.closest('.todo-item').classList.toggle('completed', allToggler.checked);
  }
});

newTodoField.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') {
    return;
  }

  if (!newTodoField.value) {
    return; 
  }

  const id = +new Date();

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

itemsList.addEventListener('click', (event) => {
  if (!event.target.matches('.destroy')) {
    return;
  }

  event.target.closest('.todo-item').remove();
  updateInfo();
});

itemsList.addEventListener('change', (event) => {
  if (!event.target.matches('.toggle')) {
    return;
  }

  event.target.closest('.todo-item').classList.toggle('completed', event.target.checked);
  updateInfo();
});

clearCompletedButton.addEventListener('click', () => {
  const completedTogglers = root.querySelectorAll('.toggle:checked');

  for (const toggler of completedTogglers) {
    toggler.closest('.todo-item').remove();
  }
  updateInfo();
});