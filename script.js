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
  const timeInput = document.createElement("input");
  timeInput.type = "time";
  timeCell.appendChild(timeInput);

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

