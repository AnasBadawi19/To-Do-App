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

