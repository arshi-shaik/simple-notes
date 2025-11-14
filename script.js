const notesList = document.getElementById('notes-list');
const noteInput = document.getElementById('note-input');
const addBtn = document.getElementById('add-btn');
const alarmAudio = document.getElementById('alarm-audio');
const songInput = document.getElementById('song-input');
const setSongBtn = document.getElementById('set-song-btn');
const playSongBtn = document.getElementById('play-song-btn');

setSongBtn.onclick = function() {
  const url = songInput.value.trim();
  if (url) {
    alarmAudio.src = url;
    alarmAudio.load();
    alert('Alarm song updated!');
  }
};

playSongBtn.onclick = function() {
  alarmAudio.currentTime = 0;
  alarmAudio.play();
};

function addNote(text) {
  const li = document.createElement('li');
  li.textContent = text + ' ';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = function() {
    li.remove();
  };
  li.appendChild(deleteBtn);

  let alarmInterval = null;

  const alarmBtn = document.createElement('button');
  alarmBtn.textContent = 'Alarm';
  alarmBtn.onclick = function() {
    const sec = prompt('Set alarm (seconds from now):');
    if (sec && !isNaN(sec)) {
      setTimeout(() => {
        alarmInterval = setInterval(() => {
          alarmAudio.currentTime = 0;
          alarmAudio.play();
        }, 1200);
        alert('🔔 Alarm ringing for: ' + text + '\nPress "Stop Alarm" to stop the sound!');
      }, sec * 1000);
    }
  };
  li.appendChild(alarmBtn);

  const stopBtn = document.createElement('button');
  stopBtn.textContent = 'Stop Alarm';
  stopBtn.onclick = function() {
    if (alarmInterval) {
      clearInterval(alarmInterval);
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      alarmInterval = null;
      alert('The alarm has been stopped!');
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

