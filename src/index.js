import { initializeApp } from "firebase/app";
import { firebaseConfig, signIn, signOutUser, initFirebaseAuth } from "./firebaseLogic";
import {
  createTask,
  showAllTasksOfCurrentProject,
  showAllCurrentProjects,
} from "./applicationLogic";
import { createDomStructurForProject } from "./domStructure";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initFirebaseAuth();

const signInArea = document.querySelector('.sign_in');
signInArea.addEventListener('click',signIn);

const signOutButton = document.querySelector('.sign_out');
signOutButton.addEventListener('click',signOutUser);

let projects = JSON.parse(localStorage.getItem("projectArray")) || [[]];
let currentProjectTaskList;
let projectName;
let projectNameArray = JSON.parse(localStorage.getItem("projectNameArray")) || [
  "home",
];
let projectHeader = document.querySelector("#project_header");

let taskCompletionCounterDOM = document.querySelector("#total_task_completed");
let taskCompletionCounter =
  JSON.parse(localStorage.getItem("totalCompletedTask")) || 0;
localStorage.setItem(
  "totalCompletedTask",
  JSON.stringify(taskCompletionCounter)
);
taskCompletionCounterDOM.textContent = `Completed (${taskCompletionCounter})`;

currentProjectTaskList = projects[0];
showAllTasksOfCurrentProject(currentProjectTaskList);

let formContainer = document.querySelector("#form_container");
let addTaskButton = document.querySelector("#add_task_button");
addTaskButton.addEventListener("click", () => {
  formContainer.style.display = "flex";
  formContainer.style.justifyContent = "center";
  formContainer.style.alignItems = "center";
});

let formSubmitButton = document.querySelector("#form_submit_button");
let importanceDropdown = document.querySelector("#importance");
formSubmitButton.setAttribute("data-index", `${0}`);
formSubmitButton.addEventListener("click", (e) => {
  formContainer.style.display = "none";
  let taskTitle = `${form[0].value}`;
  let taskDescription = `${form[1].value}`;
  let taskImportance = `${importanceDropdown.value}`;
  let taskDueDate = `${form[3].value}`;

  let newTask = createTask(
    taskImportance,
    taskTitle,
    taskDescription,
    taskDueDate
  );
  currentProjectTaskList = projects[e.target.dataset.index];
  currentProjectTaskList.push(newTask);

  localStorage.setItem("projectArray", JSON.stringify(projects));

  showAllTasksOfCurrentProject(currentProjectTaskList);
  form.reset();
});

let formCloseButton = document.querySelector("#form_close_button");
formCloseButton.addEventListener("click", () => {
  formContainer.style.display = "none";
});

let detailsModal = document.querySelector("#details_modal");
let detailsModalContent = document.querySelector("#datails_modal_content");
let detailsModalCloseButton = document.querySelector(
  "#details_modal_close_button"
);
detailsModalCloseButton.addEventListener("click", () => {
  for (let i = 0; i < 3; i++) {
    detailsModalContent.lastChild.remove();
  }
  detailsModal.style.display = "none";
});

let containerOfFormForEditingTask = document.querySelector(
  "#container_of_form_for_editing_task"
);
let formForEditingTask = document.querySelector("#form_for_editing_task");
let task_importance_dropdown_of_form_for_task_editing = document.querySelector(
  "#task_importance_dropdown_of_form_for_task_editing"
);
let submitButtonForEditingTask = document.querySelector(
  "#submit_button_of_form_for_editing_task"
);
submitButtonForEditingTask.addEventListener("click", (e) => {
  containerOfFormForEditingTask.style.display = "none";
  let taskTitle = formForEditingTask[0].value;
  let taskDescription = formForEditingTask[1].value;
  let taskImportance = task_importance_dropdown_of_form_for_task_editing.value;
  let taskDueDate = formForEditingTask[3].value;

  let newTask = createTask(
    taskImportance,
    taskTitle,
    taskDescription,
    taskDueDate
  );
  let index_of_the_task_which_need_to_be_Edited = e.target.dataset.index;
  currentProjectTaskList.splice(
    index_of_the_task_which_need_to_be_Edited,
    1,
    newTask
  );

  localStorage.setItem("projectArray", JSON.stringify(projects));

  showAllTasksOfCurrentProject(currentProjectTaskList);
});

let closeButtonOfFormForEditingTask = document.querySelector(
  "#close_button_of_form_for_editing_task"
);
closeButtonOfFormForEditingTask.addEventListener("click", () => {
  containerOfFormForEditingTask.style.display = "none";
});

let createNewProjectButton = document.querySelector("#add_project");
createNewProjectButton.addEventListener("click", () => {
  projects.push([]);
  projectName = prompt("Enter a Name");
  projectNameArray.push(projectName);

  localStorage.setItem("projectArray", JSON.stringify(projects));
  localStorage.setItem("projectNameArray", JSON.stringify(projectNameArray));

  let index = projects.length - 1;
  createDomStructurForProject(
    switchProject,
    createNewProjectButton,
    projectName,
    index
  );
});

let switchProject = (index, projectName) => {
  currentProjectTaskList = projects[index];
  showAllTasksOfCurrentProject(currentProjectTaskList);
  formSubmitButton.setAttribute("data-index", `${index}`);
  projectHeader.textContent = `${projectName}`;
};

let home = document.querySelector("#home");
home.setAttribute("data-index", `${0}`);
home.addEventListener("click", (e) => {
  switchProject(e.target.dataset.index, "Home");
});

showAllCurrentProjects();

switchProject(0, "Home");

export { projects, projectNameArray, switchProject };
