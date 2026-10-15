const container = document.querySelector("#wchecklist");
const addBtn = document.querySelector("#task-btn");

function createTaskRow(){
  const row = document.createElement("div");
  row.className = "task-row";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "wchecklist";
  input.placeholder = "New Task....";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✕";
  removeBtn.className = "remove-btn";
  removeBtn.addEventListener("click", function() {
    row.remove();
  });

  row.appendChild(input);
  row.appendChild(removeBtn);
  container.appendChild(row);

  container.appendChild(addBtn);
  input.focus();
}

addBtn.addEventListener("click", createTaskRow);
function createTimePicker() {
  const wrapper = document.createElement("div");
  wrapper.className = "time-picker";

  const hourSelect = document.createElement("select");
  for (let h = 0; h < 24; h++) {
    const opt = document.createElement("option");
    opt.value = h;
    opt.textContent = String(h).padStart(2, "0");
    hourSelect.appendChild(opt);
  }

  const minuteSelect = document.createElement("select");
  for (let m = 0; m < 60; m++) {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = String(m).padStart(2, "0");
    minuteSelect.appendChild(opt);
  }

  const secondSelect = document.createElement("select");
  for (let s = 0; s < 60; s++) {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = String(s).padStart(2, "0");
    secondSelect.appendChild(opt);
  }

  wrapper.appendChild(hourSelect);
  wrapper.appendChild(document.createTextNode(":"));
  wrapper.appendChild(minuteSelect);
  wrapper.appendChild(document.createTextNode(":"));
  wrapper.appendChild(secondSelect);

  return wrapper;
}
const table = document.querySelector("#wtable table");
const addRowBtn = document.querySelector("#add-row-btn");

function createTableRow(){
  const newRow = document.createElement("tr");

  const taskCell = document.createElement("td");
  const taskInput = document.createElement("input");
  taskInput.type = "text";
  taskInput.placeholder = "enter your task...";
  taskCell.appendChild(taskInput);

  const timeCell = document.createElement("td");
  timeCell.appendChild(createTimePicker());

  const removeCell = document.createElement("td");
  const removeRowBtn = document.createElement("button");
  removeRowBtn.textContent = "✕";
  removeRowBtn.addEventListener("click", function(){
    newRow.remove();
  });
  removeCell.appendChild(removeRowBtn);

  newRow.appendChild(taskCell);
  newRow.appendChild(timeCell);
  newRow.appendChild(removeCell);

  table.appendChild(newRow);
  taskInput.focus();
}

addRowBtn.addEventListener("click", createTableRow);

// Enter-key navigation that works for rows added later too (event delegation)
table.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && event.target.tagName === "INPUT") {
    event.preventDefault();
    const allInputs = Array.from(table.querySelectorAll("input"));
    const currentIndex = allInputs.indexOf(event.target);
    const nextInput = allInputs[currentIndex + 1];
    if (nextInput) nextInput.focus();
  }
});

// Swap your existing 24 hardcoded time inputs for the picker on page load
document.querySelectorAll("#wtable table tr td:nth-child(2)").forEach(cell => {
  cell.innerHTML = "";
  cell.appendChild(createTimePicker());
});

/* ---------- Pomodoro Timer ---------- */
const pomodoro = document.querySelector("#pomodoro");
const pomoMode = document.querySelector("#pomo-mode");
const pomoDisplay = document.querySelector("#pomo-display");
const pomoToggle = document.querySelector("#pomo-toggle");
const pomoReset = document.querySelector("#pomo-reset");
const pomoWork = document.querySelector("#pomo-work");
const pomoBreak = document.querySelector("#pomo-break");

let pomoCurrentMode = "work";   // "work" or "break"
let pomoRemaining = 0;          // seconds left (used while paused)
let pomoEndTime = 0;            // timestamp (ms) when the current period ends
let pomoTimerId = null;         // null = not running

// Read the minutes from an input, keep them valid, return seconds
function getPomoSeconds(mode) {
  const input = mode === "work" ? pomoWork : pomoBreak;
  const max = Number(input.max);
  let minutes = parseInt(input.value, 10);
  if (isNaN(minutes) || minutes < 1) minutes = 1;
  if (minutes > max) minutes = max;
  input.value = minutes; // write the cleaned value back
  return minutes * 60;
}

function renderPomo(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  pomoDisplay.textContent = mins + ":" + secs;
  pomoMode.textContent = pomoCurrentMode === "work" ? "Work" : "Break";
  pomodoro.classList.toggle("break-mode", pomoCurrentMode === "break");
}

function pomoBeep() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    osc.frequency.value = 880;
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
    setTimeout(function() { ctx.close(); }, 600);
  } catch (err) {
    // no sound available, that's fine
  }
}

function switchPomoMode() {
  pomoCurrentMode = pomoCurrentMode === "work" ? "break" : "work";
  pomoRemaining = getPomoSeconds(pomoCurrentMode);
  pomoEndTime = Date.now() + pomoRemaining * 1000;
  pomoBeep();
  renderPomo(pomoRemaining);
}

function pomoTick() {
  // Work out the time left from the clock, so the timer stays accurate
  // even if the browser slows the interval down in a background tab
  const secondsLeft = Math.ceil((pomoEndTime - Date.now()) / 1000);
  if (secondsLeft <= 0) {
    switchPomoMode();
  } else {
    pomoRemaining = secondsLeft;
    renderPomo(secondsLeft);
  }
}

function startPomo() {
  if (pomoTimerId !== null) return;
  pomoEndTime = Date.now() + pomoRemaining * 1000;
  pomoTimerId = setInterval(pomoTick, 250);
  pomoToggle.textContent = "Pause";
}

function pausePomo() {
  if (pomoTimerId === null) return;
  clearInterval(pomoTimerId);
  pomoTimerId = null;
  pomoRemaining = Math.max(0, Math.ceil((pomoEndTime - Date.now()) / 1000));
  pomoToggle.textContent = "Start";
}

function resetPomo() {
  pausePomo();
  pomoCurrentMode = "work";
  pomoRemaining = getPomoSeconds("work");
  renderPomo(pomoRemaining);
}

// When you edit a time while paused, the display updates right away.
// While running, the new value is used from the next period onward.
function onPomoSettingChange() {
  const secs = getPomoSeconds(pomoCurrentMode);
  if (pomoTimerId === null) {
    pomoRemaining = secs;
    renderPomo(pomoRemaining);
  }
}

if (pomodoro) {
  pomoToggle.addEventListener("click", function() {
    if (pomoTimerId === null) {
      startPomo();
    } else {
      pausePomo();
    }
  });
  pomoReset.addEventListener("click", resetPomo);
  pomoWork.addEventListener("change", onPomoSettingChange);
  pomoBreak.addEventListener("change", onPomoSettingChange);

  resetPomo(); // sets the starting display from the work input
}

/* ---------- Weekly Planner ---------- */
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const weekGrid = document.querySelector("#week-grid");

function createDayTask(list, text){
  const li = document.createElement("li");
  li.className = "day-task";

  const check = document.createElement("input");
  check.type = "checkbox";

  const label = document.createElement("span");
  label.textContent = text;

  check.addEventListener("change", function(){
    label.classList.toggle("done", check.checked);
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✕";
  removeBtn.className = "remove-btn";
  removeBtn.addEventListener("click", function(){
    li.remove();
  });

  li.appendChild(check);
  li.appendChild(label);
  li.appendChild(removeBtn);
  list.appendChild(li);
}

function createDayCard(dayName, isToday){
  const card = document.createElement("div");
  card.className = "day-card";
  if (isToday) card.classList.add("today");

  const title = document.createElement("h3");
  title.textContent = dayName;

  const list = document.createElement("ul");
  list.className = "day-list";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "day-input";
  input.placeholder = "Add a task...";

  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = "+ Add";
  addTaskBtn.className = "day-add-btn";

  function addFromInput(){
    const text = input.value.trim();
    if (text === "") return;
    createDayTask(list, text);
    input.value = "";
    input.focus();
  }

  addTaskBtn.addEventListener("click", addFromInput);
  input.addEventListener("keydown", function(event){
    if (event.key === "Enter") addFromInput();
  });

  card.appendChild(title);
  card.appendChild(list);
  card.appendChild(input);
  card.appendChild(addTaskBtn);
  return card;
}

function buildWeeklyPlanner(){
  if (!weekGrid) return;
  // getDay(): Sunday = 0, so shift it so Monday = 0
  const todayIndex = (new Date().getDay() + 6) % 7;

  weekDays.forEach(function(dayName, index){
    weekGrid.appendChild(createDayCard(dayName, index === todayIndex));
  });
}

buildWeeklyPlanner();