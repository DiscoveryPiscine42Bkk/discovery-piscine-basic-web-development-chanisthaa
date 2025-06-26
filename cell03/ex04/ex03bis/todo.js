$(function () {
  const $ftList = $('#ft_list');
  const $newBtn = $('#newBtn');

  function loadTodos() {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('todoList='));
    if (!cookie) return [];
    try {
      return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    } catch {
      return [];
    }
  }

  function saveTodos(todos) {

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `todoList=${encodeURIComponent(JSON.stringify(todos))}; expires=${expires}; path=/`;
  }

  

  function createTodoDiv(text) {
    const $div = $('<div>').text(text);

    $div.on('click', function () {
      if (confirm(`Delete this TO DO?\n"${text}"`)) {
        $(this).remove();
        const todos = $ftList.children().map(function () {
          return $(this).text();
        }).get();

        saveTodos(todos);
      }
    });
    return $div;
  }

  function renderTodos(todos) {
    $ftList.empty();

    todos.forEach(function (todo) {
      const $div = createTodoDiv(todo);
      $ftList.append($div);
    });
  }

  $newBtn.on('click', function () {
    const text = prompt('Enter new TO DO:');
    if (text && text.trim() !== '') {
      const $div = createTodoDiv(text.trim());
      $ftList.prepend($div);


      const todos = $ftList.children().map(function () {
        return $(this).text();
      }).get();
      saveTodos(todos);




    }
  });

  renderTodos(loadTodos());
});
