'use strict';

const root = document.querySelector('.todoapp');
const newTodoField = root.querySelector('.new-todo');
const itemsList = root.querySelector('.todo-list');

function updateInfo() {
  const notCompletedTogglers = root.querySelectorAll('.toggle:not(:checked)');
  const counter = root.querySelector('.todo-count');
  notCompletedTogglers.length === 1 ? counter.innerHTML = `${notCompletedTogglers.length} item left`:
  counter.innerHTML = `${notCompletedTogglers.length} items left`;
}

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