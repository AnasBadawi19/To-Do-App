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