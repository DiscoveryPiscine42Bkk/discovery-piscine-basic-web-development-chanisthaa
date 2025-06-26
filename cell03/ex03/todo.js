const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('newBtn');


function loadTodos() {
  const cookie = document.cookie.split('; ').find(row => row.startsWith('todoList='));
  if (!cookie) return [];
  try {
    return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
  } catch {
    return [];
  }
}


function saveTodos(todos) {
  
  const expires = new Date(Date.now() + 7*24*60*60*1000).toUTCString();
  document.cookie = `todoList=${encodeURIComponent(JSON.stringify(todos))}; expires=${expires}; path=/`;
}


function createTodoDiv(text) {
  const div = document.createElement('div');
  div.textContent = text;
  div.addEventListener('click', () => {
    if (confirm(`Delete this TO DO?\n"${text}"`)) {
      div.remove();
      
      const todos = Array.from(ftList.children).map(child => child.textContent);
      saveTodos(todos);
    }
  });
  return div;
}


function renderTodos(todos) {
  ftList.innerHTML = '';
  todos.forEach(todo => {
    const div = createTodoDiv(todo);
    ftList.appendChild(div);
  });
}

newBtn.addEventListener('click', () => {
  const text = prompt('Enter new TO DO:');
  if (text && text.trim() !== '') {
    
    const div = createTodoDiv(text.trim());
    ftList.insertBefore(div, ftList.firstChild);

    
    const todos = Array.from(ftList.children).map(child => child.textContent);
    saveTodos(todos);
  }
});


window.onload = () => {
  const todos = loadTodos();
  renderTodos(todos);
};
