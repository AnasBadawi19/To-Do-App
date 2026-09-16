To-Do App

A simple to-do / daily planner web app built with vanilla HTML, CSS, and JavaScript.

Overview

This project is a two-page app:

index.html — a welcome/landing page with a "Start!" button that leads into the workspace.
workspace.html — the actual to-do workspace, with:
A checklist section where users can check off tasks and type them into text boxes.
A table section to plan out tasks against specific times.
Features
Clean navy/chocolate color scheme with custom fonts and glowing text effects.
A styled, pill-shaped "Start!" button with a hover effect.
Checklist with checkboxes and task input fields.
A task/time planning table.
Keyboard navigation: pressing Enter inside a task box automatically moves focus to the next task box, so users can fill out their checklist without reaching for the mouse.
Project Structure
To do app/
├── index.html        # Welcome page
├── workspace.html     # Main to-do workspace
├── style.css          # Styling for both pages
├── script.js          # Enter-to-next-box logic for task inputs
└── images/
    ├── img.jpg
    └── img2.jpg
How It Works
document.querySelectorAll(".task-input") collects all task input boxes into a list.
A keydown event listener is attached to each box.
When the Enter key is pressed, the default behavior is prevented and focus is moved to the next input in the list (if one exists).
Getting Started
Clone the repo:
bash
   git clone https://github.com/AnasBadawi19/To-Do-App.git
Open index.html in your browser (or use a Live Server extension in VS Code).
Click Start! to go to the workspace and begin planning your day.
Status

This is a learning project built step-by-step while studying HTML, CSS, and JavaScript fundamentals. More features (like saving tasks, dynamic task creation, and additional interactivity) may be added over time.
