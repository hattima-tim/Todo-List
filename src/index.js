import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  firebaseConfig,
  signIn,
  signOutUser,
  getProfilePicUrl,
  isUserSignedIn,
  saveToDB,
  getTaskCompletionCountFromCloud
} from "./firebaseLogic";

import {
  createTask,
  showAllTasksOfCurrentProject,
  showAllCurrentProjects,
} from "./applicationLogic";

import { createDomStructurForProject } from "./domStructure";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let taskCompletionCount = 0;
let taskCompletionCountDOM = document.querySelector("#total_task_completed");
taskCompletionCountDOM.textContent = `Completed (${taskCompletionCount})`;

const authStateObserver = async (user) => {
  const userInfo = document.querySelector(".user_info");
  const userPicElement = document.querySelector(".user_pic");
  const signInArea = document.querySelector(".sign_in");

  if (user) {
    // User is signed in!
    taskCompletionCount = await getTaskCompletionCountFromCloud();
    localStorage.setItem(
      "taskCompletionCount",
      JSON.stringify(taskCompletionCount)
    );
    taskCompletionCountDOM.textContent = `Completed (${taskCompletionCount})`;
    
    const profilePicUrl = getProfilePicUrl();
    userPicElement.src = `${profilePicUrl}`;
    userInfo.style.display = "block";
    signInArea.style.display = "none";
  } else {
    // User is signed out!
    userInfo.style.display = "none";
    signInArea.style.display = "block";
  }
}

// Initialize firebase auth
// Listen to auth state changes.
onAuthStateChanged(getAuth(), authStateObserver);

const signInArea = document.querySelector(".sign_in");
signInArea.addEventListener("click", signIn);

const signOutButton = document.querySelector(".sign_out");
signOutButton.addEventListener("click", signOutUser);

let allProjectsTasks = JSON.parse(
  localStorage.getItem("allProjectsTasksArr")
) || [[]];
let currentProjectTaskList;
let projectName;
let projectNameArray = JSON.parse(localStorage.getItem("projectNameArray")) || [
  "home",
];
let currentProjectName = projectNameArray[0];
let projectHeader = document.querySelector("#project_header");

currentProjectTaskList = allProjectsTasks[0];
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
  currentProjectTaskList = allProjectsTasks[e.target.dataset.index];
  currentProjectTaskList.push(newTask);

  // localStorage.setItem("allProjectsTasksArr", JSON.stringify(allProjectsTasks));
  saveToDB(currentProjectName,newTask,'addTask');
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

  localStorage.setItem("allProjectsTasksArr", JSON.stringify(allProjectsTasks));

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
  allProjectsTasks.push([]);
  projectName = prompt("Enter a Name");
  projectNameArray.push(projectName);
  currentProjectName = projectName;

  saveToDB(projectName,null,'createProject');
  // localStorage.setItem("allProjectsTasksArr", JSON.stringify(allProjectsTasks));
  // localStorage.setItem("projectNameArray", JSON.stringify(projectNameArray));

  let index = allProjectsTasks.length - 1;
  createDomStructurForProject(
    switchProject,
    createNewProjectButton,
    projectName,
    index
  );
});

let switchProject = (index, projectName) => {
  currentProjectName = projectName;
  currentProjectTaskList = allProjectsTasks[index];
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

export { allProjectsTasks, projectNameArray, switchProject };
