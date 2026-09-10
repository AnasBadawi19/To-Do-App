const taskInputs = document.querySelectorAll(".task-input");

taskInputs.forEach(function(input, index) {
  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextInput = taskInputs[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  });
});