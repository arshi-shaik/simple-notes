const notesList = document.getElementById('notes-list');
const noteInput = document.getElementById('note-input');
const addBtn = document.getElementById('add-btn');
const alarmAudio = document.getElementById('alarm-audio');

function addNote(text) {
  const li = document.createElement('li');
  li.textContent = text + ' ';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = function() {
    li.remove();
  };
  li.appendChild(deleteBtn);

  // State to control alarm loop for this note
  let alarmInterval = null;

  const alarmBtn = document.createElement('button');
  alarmBtn.textContent = 'Alarm';
  alarmBtn.onclick = function() {
    const sec = prompt('Set alarm (seconds from now):');
    if (sec && !isNaN(sec)) {
      setTimeout(() => {
        // Loop alarm
        alarmInterval = setInterval(() => {
          alarmAudio.currentTime = 0;
          alarmAudio.play();
        }, 1200); // Play again when short beep completes (1.2 seconds typical)

        alert('Alarm for: ' + text);
        // Suggest user to press 'Stop Alarm' to stop the sound!
      }, sec * 1000);
    }
  };
  li.appendChild(alarmBtn);

  // Stop alarm button
  const stopBtn = document.createElement('button');
  stopBtn.textContent = 'Stop Alarm';
  stopBtn.onclick = function() {
    if (alarmInterval) {
      clearInterval(alarmInterval);
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      alarmInterval = null;
    }
  };
  li.appendChild(stopBtn);

  notesList.appendChild(li);
}

addBtn.onclick = function() {
  const note = noteInput.value.trim();
  if (note) {
    addNote(note);
    noteInput.value = '';
  }
};
