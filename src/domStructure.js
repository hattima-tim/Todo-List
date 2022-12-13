import { setCompletionCountInCloud } from "./firebaseLogic";
import {
  removeTask,
  removeProject,
  create_human_readable_importance_vaule,
  showFormForEditingTask,
} from "./applicationLogic";

let taskCompletionCountDOM = document.querySelector("#total_task_completed");
let domContainerForTasks = document.querySelector("#task_container");
let detailsModal = document.querySelector("#details_modal");
let detailsModalContent = document.querySelector("#datails_modal_content");
let submitButtonForEditingTask = document.querySelector(
  "#submit_button_of_form_for_editing_task"
);

let showDetailsModal = (e, currentProjectTaskList) => {
  let importanceValue = create_human_readable_importance_vaule(
    currentProjectTaskList[e.target.dataset.index].taskImportance
  );
  let taskName = document.createElement("p");
  let taskDescription = document.createElement("p");
  let taskImportance = document.createElement("p");
  taskName.textContent = `Task Name:${
    currentProjectTaskList[e.target.dataset.index].taskTitle
  }`;
  taskDescription.textContent = `Description:${
    currentProjectTaskList[e.target.dataset.index].taskDescription
  }`;
  taskImportance.textContent = `Importance:${importanceValue}`;
  detailsModalContent.appendChild(taskName);
  detailsModalContent.appendChild(taskDescription);
  detailsModalContent.appendChild(taskImportance);
  detailsModal.style.display = "block";
};

let createDomStructurForTask = (currentProjectTaskList, index, currentProjectName) => {
  let table = document.createElement("table");
  let tableRow = document.createElement("tr");
  let checkbox = document.createElement("td");
  let checkboxInput = document.createElement("input");
  let titleInfo = document.createElement("td");
  let detailsInfo = document.createElement("td");
  let detailsButton = document.createElement("button");
  let dueDate = document.createElement("td");
  let taskDeleteIconContainer = document.createElement("td");
  let taskDeleteIcon = document.createElement("i");
  let taskEditIconContainer = document.createElement("td");
  let taskEditIcon = document.createElement("i");

  tableRow.classList.add("task_list");

  checkboxInput.setAttribute("type", "checkbox");
  checkboxInput.setAttribute("id", "done");
  checkboxInput.setAttribute("name", "done");
  checkboxInput.setAttribute("value", "done");
  checkboxInput.setAttribute("data-index", `${index}`);
  checkboxInput.addEventListener("change", async (e) => {
    let taskCompletionCount = JSON.parse(
      localStorage.getItem("taskCompletionCount")
    );
    taskCompletionCount += 1;

    localStorage.setItem(
      "taskCompletionCount",
      JSON.stringify(taskCompletionCount)
    );
    setCompletionCountInCloud(taskCompletionCount,'update');

    taskCompletionCountDOM.textContent = `Completed (${taskCompletionCount})`;
    removeTask(e, currentProjectTaskList,currentProjectName);
  });

  titleInfo.textContent = currentProjectTaskList[index].taskTitle;

  detailsButton.textContent = "Details";
  detailsButton.setAttribute("data-index", `${index}`);
  detailsButton.addEventListener("click", (e) => {
    showDetailsModal(e, currentProjectTaskList);
  });

  dueDate.textContent = currentProjectTaskList[index].taskDueDate;

  taskEditIcon.setAttribute("class", "far fa-edit");
  taskEditIconContainer.setAttribute("data-index", `${index}`);
  taskEditIconContainer.addEventListener("click", (e) => {
    showFormForEditingTask(e, currentProjectTaskList);
    submitButtonForEditingTask.setAttribute(
      "data-index",
      `${e.target.dataset.index}`
    );
  });

  taskDeleteIcon.setAttribute("class", "far fa-trash-alt");
  taskDeleteIconContainer.setAttribute("data-index", `${index}`);
  taskDeleteIconContainer.addEventListener("click", (e) => {
    removeTask(e, currentProjectTaskList, currentProjectName);
  });

  checkbox.appendChild(checkboxInput);
  tableRow.appendChild(checkbox);
  tableRow.appendChild(titleInfo);
  detailsInfo.appendChild(detailsButton);
  tableRow.appendChild(detailsInfo);
  tableRow.appendChild(dueDate);
  taskEditIconContainer.appendChild(taskEditIcon);
  tableRow.appendChild(taskEditIconContainer);
  taskDeleteIconContainer.appendChild(taskDeleteIcon);
  tableRow.appendChild(taskDeleteIconContainer);
  table.appendChild(tableRow);
  domContainerForTasks.appendChild(table);
};

let sidenav = document.querySelector(".sidenav");
let createDomStructurForProject = (
  switchProject,
  createNewProjectButton,
  projectName,
  projectNameArray,
  index
) => {
  let side_nav_project_name_container = document.createElement("div");
  side_nav_project_name_container.classList.add("side_nav_project_name_holder");

  let projectNameLink = document.createElement("a");
  projectNameLink.textContent = `${projectName}`;
  projectNameLink.classList.add("project_name");
  projectNameLink.setAttribute("data-index", `${index}`);
  projectNameLink.addEventListener("click", (e) => {
    let indexOfClickedProject = e.target.dataset.index;
    switchProject(indexOfClickedProject, projectName);
  });

  let projectRemover = document.createElement("span");
  projectRemover.textContent = "x";
  projectRemover.addEventListener("click", (e) => {
    removeProject(e, projectName, projectNameArray);
    e.target.parentNode.remove();
  });
  side_nav_project_name_container.appendChild(projectNameLink);
  side_nav_project_name_container.appendChild(projectRemover);
  sidenav.insertBefore(side_nav_project_name_container, createNewProjectButton);
  switchProject(index, projectName);
};
export {
  domContainerForTasks,
  createDomStructurForTask,
  createDomStructurForProject,
};
