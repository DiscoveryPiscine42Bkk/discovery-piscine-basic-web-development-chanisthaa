const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('newBtn');

// โหลดข้อมูลจาก cookie
function loadTodos() {
  const cookie = document.cookie.split('; ').find(row => row.startsWith('todoList='));
  if (!cookie) return [];
  try {
    return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
  } catch {
    return [];
  }
}

// บันทึกข้อมูลลง cookie
function saveTodos(todos) {
  // กำหนดอายุ cookie 7 วัน
  const expires = new Date(Date.now() + 7*24*60*60*1000).toUTCString();
  document.cookie = `todoList=${encodeURIComponent(JSON.stringify(todos))}; expires=${expires}; path=/`;
}

// สร้าง div TO DO
function createTodoDiv(text) {
  const div = document.createElement('div');
  div.textContent = text;
  div.addEventListener('click', () => {
    if (confirm(`Delete this TO DO?\n"${text}"`)) {
      div.remove();
      // อัพเดตรายการใน cookie
      const todos = Array.from(ftList.children).map(child => child.textContent);
      saveTodos(todos);
    }
  });
  return div;
}

// โหลด TO DO ทั้งหมดใส่ในหน้า
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
    // สร้าง div ใหม่และแทรกบนสุด
    const div = createTodoDiv(text.trim());
    ftList.insertBefore(div, ftList.firstChild);

    // บันทึกข้อมูลใหม่
    const todos = Array.from(ftList.children).map(child => child.textContent);
    saveTodos(todos);
  }
});

// โหลดเมื่อเปิดหน้า
window.onload = () => {
  const todos = loadTodos();
  renderTodos(todos);
};
