const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// تحميل المهام من LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => renderTask(task));

// إضافة مهمة جديدة
function addTask() {
  const taskText = taskInput.value.trim();
  if(taskText === "") return;

  const task = { text: taskText, completed: false };
  tasks.push(task);
  saveAndRender();
  taskInput.value = "";
}

// حفظ المهام في LocalStorage وعرضها
function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskList.innerHTML = "";
  tasks.forEach(renderTask);
}

// عرض مهمة واحدة
function renderTask(task) {
  const li = document.createElement('li');
  li.textContent = task.text;
  if(task.completed) li.classList.add('completed');

  li.onclick = () => {
    task.completed = !task.completed;
    saveAndRender();
  }

  const delBtn = document.createElement('button');
  delBtn.textContent = 'حذف';
  delBtn.onclick = (e) => {
    e.stopPropagation();
    tasks = tasks.filter(t => t !== task);
    saveAndRender();
  }

  li.appendChild(delBtn);
  taskList.appendChild(li);
}
