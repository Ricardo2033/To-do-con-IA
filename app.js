// Lógica para la lista de tareas en el navegador

document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const taskTime = document.getElementById('taskTime');
  const scheduleList = document.getElementById('scheduleList');

  let schedule = [];

  function formatTimeTo12Hour(time) {
    const [hour, minute] = time.split(":");
    let h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${minute} ${ampm}`;
  }

  function renderSchedule() {
    scheduleList.innerHTML = '';
    schedule.forEach((item, idx) => {
      const li = document.createElement('li');
      li.textContent = `${item.task} - ${formatTimeTo12Hour(item.time)}`;
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Eliminar';
      removeBtn.className = 'remove-btn';
      removeBtn.onclick = () => {
        // Animación de quiebre
        li.classList.add('slide-fade-out');
        setTimeout(() => {
          schedule.splice(idx, 1);
          renderSchedule();
        }, 350);
      };
      li.appendChild(removeBtn);
      scheduleList.appendChild(li);
    });
  }

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = taskInput.value.trim();
    const time = taskTime.value;
    if (value && time) {
      schedule.push({ task: value, time });
      taskInput.value = '';
      taskTime.value = '';
      renderSchedule();
    }
  });

  renderSchedule();
});
