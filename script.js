const notesList = document.getElementById('notes-list');
const noteInput = document.getElementById('note-input');
const addBtn = document.getElementById('add-btn');

function addNote(text) {
  const li = document.createElement('li');
  li.textContent = text + ' ';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = function() {
    li.remove();
  };
  li.appendChild(deleteBtn);

  const alarmBtn = document.createElement('button');
  alarmBtn.textContent = 'Alarm';
  alarmBtn.onclick = function() {
    const sec = prompt('Set alarm (seconds from now):');
    if (sec && !isNaN(sec)) {
      setTimeout(() => {
        alert('Alarm for: ' + text);
      }, sec * 1000);
    }
  };
  li.appendChild(alarmBtn);

  notesList.appendChild(li);
}

addBtn.onclick = function() {
  const note = noteInput.value.trim();
  if (note) {
    addNote(note);
    noteInput.value = '';
  }
};
