/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/applicationLogic.js":
/*!*********************************!*\
  !*** ./src/applicationLogic.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createTask\": () => (/* binding */ createTask),\n/* harmony export */   \"sortTasks\": () => (/* binding */ sortTasks),\n/* harmony export */   \"showAllTasksOfCurrentProject\": () => (/* binding */ showAllTasksOfCurrentProject),\n/* harmony export */   \"showAllCurrentProjects\": () => (/* binding */ showAllCurrentProjects),\n/* harmony export */   \"updateIndexOfProjects\": () => (/* binding */ updateIndexOfProjects),\n/* harmony export */   \"removeTask\": () => (/* binding */ removeTask),\n/* harmony export */   \"removeProject\": () => (/* binding */ removeProject),\n/* harmony export */   \"create_human_readable_importance_vaule\": () => (/* binding */ create_human_readable_importance_vaule),\n/* harmony export */   \"showFormForEditingTask\": () => (/* binding */ showFormForEditingTask)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n/* harmony import */ var _domStructure__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domStructure */ \"./src/domStructure.js\");\n\n\n\nlet createTask=(taskImportance,taskTitle,taskDescription,taskDueDate)=>{\n\n    return {taskImportance,taskTitle,taskDescription,taskDueDate}\n}\nlet sortTasks=(currentProjectTaskList)=>{\n    return currentProjectTaskList.sort(function (a,b){\n        return a.taskImportance-b.taskImportance;\n    })\n}\n\nlet showAllTasksOfCurrentProject=(currentProjectTaskList)=>{\n    let sortedTasks= sortTasks(currentProjectTaskList);\n    while (_domStructure__WEBPACK_IMPORTED_MODULE_1__.domContainerForTasks.firstChild) {\n        _domStructure__WEBPACK_IMPORTED_MODULE_1__.domContainerForTasks.firstChild.remove();\n    }\n    for (let i=0;i<sortedTasks.length;i++){\n        (0,_domStructure__WEBPACK_IMPORTED_MODULE_1__.createDomStructurForTask)(sortedTasks,i);\n    }\n}\n\nlet showAllCurrentProjects=()=>{\n    for (let i=1;i<_index__WEBPACK_IMPORTED_MODULE_0__.projects.length;i++){\n        let projectName=_index__WEBPACK_IMPORTED_MODULE_0__.projectNameArray[i];\n        let index=i;\n        let createNewProjectButton=document.querySelector('#add_project');\n        (0,_domStructure__WEBPACK_IMPORTED_MODULE_1__.createDomStructurForProject)(_index__WEBPACK_IMPORTED_MODULE_0__.switchProject,createNewProjectButton,projectName,index);\n    }\n}\n\nlet updateIndexOfTasks=(index)=>{\n    let taskList=document.querySelectorAll('.task_list');\n    for (let i=index;i<taskList.length-1;i++){\n        let indexOfNextTask=Number(i)+1;\n        let indexOfCheckbox=0;\n        let indexOfDetailsButton=2;\n        let indexOfTaskEditIconContainerElement=4;\n        let indexOfTaskDeleteIconContainerElement=5;\n\n        let taskCheckbox=taskList[indexOfNextTask].childNodes[indexOfCheckbox].firstChild;\n        let taskDetailsButton=taskList[indexOfNextTask].childNodes[indexOfDetailsButton].firstChild;\n        let taskEditIcon=taskList[indexOfNextTask].childNodes[indexOfTaskEditIconContainerElement].firstChild;\n        let taskDeleteIcon=taskList[indexOfNextTask].childNodes[indexOfTaskDeleteIconContainerElement].firstChild;\n        \n        taskCheckbox.setAttribute('data-index',`${i}`);\n        taskDetailsButton.setAttribute('data-index',`${i}`);\n        taskEditIcon.setAttribute('data-index',`${i}`);\n        taskDeleteIcon.setAttribute('data-index',`${i}`);\n    }\n}\nlet updateIndexOfProjects=(index)=>{\n    let projectNameList=document.querySelectorAll('.project_name');\n    for (let i=index;i<projectNameList.length-1;i++){\n        let indexOfNextproject=Number(i)+1;\n        projectNameList[indexOfNextproject].setAttribute('data-index',`${i}`);\n    }\n}\n\nlet removeTask=(e,currentProjectTaskList)=>{\n    let indexOfCurrentTask=e.target.dataset.index;\n    currentProjectTaskList.splice(indexOfCurrentTask,1);\n    \n    localStorage.setItem('projectArray',JSON.stringify(_index__WEBPACK_IMPORTED_MODULE_0__.projects));\n    \n    updateIndexOfTasks(indexOfCurrentTask);\n    e.target.parentNode.parentNode.parentNode.remove();\n}\n\nlet removeProject=(e)=>{\n    let indexOfCurrentProject=e.target.previousElementSibling.dataset.index;\n    _index__WEBPACK_IMPORTED_MODULE_0__.projects.splice(indexOfCurrentProject,1);\n    _index__WEBPACK_IMPORTED_MODULE_0__.projectNameArray.splice(indexOfCurrentProject,1)\n    \n    localStorage.setItem('projectArray',JSON.stringify(_index__WEBPACK_IMPORTED_MODULE_0__.projects));\n    localStorage.setItem('projectNameArray',JSON.stringify(_index__WEBPACK_IMPORTED_MODULE_0__.projectNameArray));\n    \n    updateIndexOfProjects(indexOfCurrentProject);\n    (0,_index__WEBPACK_IMPORTED_MODULE_0__.switchProject)(0,'Home');\n}\n\nlet create_human_readable_importance_vaule=(value)=>{\n    let importanceValue;\n    switch(value){\n        case '1':\n            importanceValue='High';\n            break;\n        case '2':\n            importanceValue='medium';\n            break;\n        case '3':\n            importanceValue='Low';\n            break;\n    }\n    return importanceValue;\n}\n\nlet showFormForEditingTask=(e,currentProjectTaskList)=>{\n    let containerOfFormForEditingTask=document.querySelector('#container_of_form_for_editing_task');\n    let formForEditingTask=document.querySelector('#form_for_editing_task');\n    let task_importance_dropdown_of_form_for_task_editing=document.querySelector('#task_importance_dropdown_of_form_for_task_editing');\n\n    containerOfFormForEditingTask.style.display='flex';\n    containerOfFormForEditingTask.style.justifyContent='center';\n    containerOfFormForEditingTask.style.alignItems='center';\n    formForEditingTask[0].value=currentProjectTaskList[e.target.dataset.index].taskTitle;\n    formForEditingTask[1].value=currentProjectTaskList[e.target.dataset.index].taskDescription;\n    task_importance_dropdown_of_form_for_task_editing.value=currentProjectTaskList[e.target.dataset.index].taskImportance;\n    formForEditingTask[3].value=currentProjectTaskList[e.target.dataset.index].taskDueDate;\n}\n\n\n\n//# sourceURL=webpack://Todo-List/./src/applicationLogic.js?");

/***/ }),

/***/ "./src/domStructure.js":
/*!*****************************!*\
  !*** ./src/domStructure.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"domContainerForTasks\": () => (/* binding */ domContainerForTasks),\n/* harmony export */   \"createDomStructurForTask\": () => (/* binding */ createDomStructurForTask),\n/* harmony export */   \"createDomStructurForProject\": () => (/* binding */ createDomStructurForProject)\n/* harmony export */ });\n/* harmony import */ var _applicationLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applicationLogic */ \"./src/applicationLogic.js\");\n\nlet taskCompletionCounterDOM=document.querySelector('#total_task_completed');\nlet domContainerForTasks=document.querySelector('#task_container');\nlet detailsModal=document.querySelector('#details_modal');\nlet detailsModalContent=document.querySelector('#datails_modal_content');\nlet submitButtonForEditingTask=document.querySelector('#submit_button_of_form_for_editing_task');\n\nlet showDetailsModal=(e,currentProjectTaskList)=>{\n    let importanceValue=(0,_applicationLogic__WEBPACK_IMPORTED_MODULE_0__.create_human_readable_importance_vaule)(currentProjectTaskList[e.target.dataset.index].taskImportance);\n    let taskName=document.createElement('p');\n    let taskDescription=document.createElement('p');\n    let taskImportance=document.createElement('p');\n    taskName.textContent=`Task Name:${currentProjectTaskList[e.target.dataset.index].taskTitle}`;\n    taskDescription.textContent=`Description:${currentProjectTaskList[e.target.dataset.index].taskDescription}`;\n    taskImportance.textContent=`Importance:${importanceValue}`;\n    detailsModalContent.appendChild(taskName);\n    detailsModalContent.appendChild(taskDescription);\n    detailsModalContent.appendChild(taskImportance);\n    detailsModal.style.display='block';\n}\n\nlet createDomStructurForTask=(currentProjectTaskList,index)=>{\n    let table=document.createElement('table');\n    let tableRow=document.createElement('tr');\n    let checkbox=document.createElement('td');\n    let checkboxInput=document.createElement('input');\n    let titleInfo=document.createElement('td');\n    let detailsInfo=document.createElement('td');\n    let detailsButton=document.createElement('button');\n    let dueDate=document.createElement('td');\n    let taskDeleteIconContainer=document.createElement('td');\n    let taskDeleteIcon=document.createElement('i');\n    let taskEditIconContainer=document.createElement('td');\n    let taskEditIcon=document.createElement('i');\n\n    tableRow.classList.add('task_list');\n   \n    checkboxInput.setAttribute('type','checkbox');\n    checkboxInput.setAttribute('id','done');\n    checkboxInput.setAttribute('name','done');\n    checkboxInput.setAttribute('value','done');\n    checkboxInput.setAttribute('data-index',`${index}`);\n    checkboxInput.addEventListener('change',(e)=>{\n        let taskCompletionCounter=JSON.parse(localStorage.getItem('totalCompletedTask'));\n        taskCompletionCounter+=1;\n        localStorage.setItem('totalCompletedTask',JSON.stringify(taskCompletionCounter));\n        taskCompletionCounterDOM.textContent=`Completed (${taskCompletionCounter})`;\n        (0,_applicationLogic__WEBPACK_IMPORTED_MODULE_0__.removeTask)(e,currentProjectTaskList);\n    })\n   \n    titleInfo.textContent=currentProjectTaskList[index].taskTitle;\n   \n    detailsButton.textContent='Details';\n    detailsButton.setAttribute('data-index',`${index}`);\n    detailsButton.addEventListener('click',(e)=>{\n        showDetailsModal(e,currentProjectTaskList);\n    })\n   \n    dueDate.textContent=currentProjectTaskList[index].taskDueDate;\n    \n    taskEditIcon.setAttribute('class','far fa-edit');\n    taskEditIcon.setAttribute('data-index',`${index}`);\n    taskEditIcon.addEventListener('click',(e)=>{\n        (0,_applicationLogic__WEBPACK_IMPORTED_MODULE_0__.showFormForEditingTask)(e,currentProjectTaskList);\n        submitButtonForEditingTask.setAttribute('data-index',`${e.target.dataset.index}`);\n    })\n\n    taskDeleteIcon.setAttribute('class','far fa-trash-alt');\n    taskDeleteIcon.setAttribute('data-index',`${index}`);\n    taskDeleteIcon.addEventListener('click',(e)=>{\n        (0,_applicationLogic__WEBPACK_IMPORTED_MODULE_0__.removeTask)(e,currentProjectTaskList);\n    })\n\n    checkbox.appendChild(checkboxInput);\n    tableRow.appendChild(checkbox);\n    tableRow.appendChild(titleInfo);\n    detailsInfo.appendChild(detailsButton);\n    tableRow.appendChild(detailsInfo);\n    tableRow.appendChild(dueDate);\n    taskEditIconContainer.appendChild(taskEditIcon);\n    tableRow.appendChild(taskEditIconContainer);\n    taskDeleteIconContainer.appendChild(taskDeleteIcon);\n    tableRow.appendChild(taskDeleteIconContainer);\n    table.appendChild(tableRow);\n    domContainerForTasks.appendChild(table);\n}\n\nlet sidenav=document.querySelector('.sidenav');\nlet createDomStructurForProject=(switchProject,createNewProjectButton,projectName,index)=>{\n    let side_nav_project_name_container=document.createElement('div');\n    side_nav_project_name_container.classList.add('side_nav_project_name_holder');\n\n    let projectNameLink=document.createElement('a');\n    projectNameLink.textContent=`${projectName}`;\n    projectNameLink.classList.add('project_name');\n    projectNameLink.setAttribute('data-index',`${index}`);\n    projectNameLink.addEventListener('click',(e)=>{\n        let indexOfClickedProject=e.target.dataset.index;\n        switchProject(indexOfClickedProject,projectName);\n    });\n\n    let projectRemover=document.createElement('span');\n    projectRemover.textContent='x';\n    projectRemover.addEventListener('click',(e)=>{\n        (0,_applicationLogic__WEBPACK_IMPORTED_MODULE_0__.removeProject)(e);\n        e.target.parentNode.remove();\n    })\n    side_nav_project_name_container.appendChild(projectNameLink);\n    side_nav_project_name_container.appendChild(projectRemover);\n    sidenav.insertBefore(side_nav_project_name_container,createNewProjectButton);\n    switchProject(index,projectName);\n}\n\n\n//# sourceURL=webpack://Todo-List/./src/domStructure.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projects\": () => (/* binding */ projects),\n/* harmony export */   \"projectNameArray\": () => (/* binding */ projectNameArray),\n/* harmony export */   \"switchProject\": () => (/* binding */ switchProject)\n/* harmony export */ });\n/* harmony import */ var _applicationLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applicationLogic */ \"./src/applicationLogic.js\");\n/* harmony import */ var _domStructure__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domStructure */ \"./src/domStructure.js\");\n\n\nlet projects=JSON.parse(localStorage.getItem('projectArray')) || [[]];\nlet currentProjectTaskList;\nlet projectName;\nlet projectNameArray=JSON.parse(localStorage.getItem('projectNameArray')) || [\"home\"];\nlet projectHeader=document.querySelector('#project_header');\n\nlet taskCompletionCounterDOM=document.querySelector('#total_task_completed');\nlet taskCompletionCounter=JSON.parse(localStorage.getItem('totalCompletedTask')) || 0;\nlocalStorage.setItem('totalCompletedTask',JSON.stringify(taskCompletionCounter));\ntaskCompletionCounterDOM.textContent=`Completed (${taskCompletionCounter})`;\n\ncurrentProjectTaskList=projects[0];\n(0,_applicationLogic__WEBPACK_IMPORTED_MODULE_0__.showAllTasksOfCurrentProject)(currentProjectTaskList);\n\nlet formContainer=document.querySelector('#form_container');\nlet addTaskButton=document.querySelector('#add_task_button');\naddTaskButton.addEventListener('click',()=>{\n    formContainer.style.display='flex';\n    formContainer.style.justifyContent='center';\n    formContainer.style.alignItems='center';\n})\n\nlet formSubmitButton=document.querySelector('#form_submit_button');\nlet importanceDropdown=document.querySelector('#importance');\nformSubmitButton.setAttribute('data-index',`${0}`);\nformSubmitButton.addEventListener('click',(e)=>{\n    formContainer.style.display='none';\n    let taskTitle=`${form[0].value}`;\n    let taskDescription=`${form[1].value}`;\n    let taskImportance=`${importanceDropdown.value}`;\n    let taskDueDate=`${form[3].value}`;\n    \n    let newTask=(0,_applicationLogic__WEBPACK_IMPORTED_MODULE_0__.createTask)(taskImportance,taskTitle,taskDescription,taskDueDate);\n    currentProjectTaskList=projects[e.target.dataset.index];\n    currentProjectTaskList.push(newTask);\n    \n    localStorage.setItem('projectArray',JSON.stringify(projects));\n\n    (0,_applicationLogic__WEBPACK_IMPORTED_MODULE_0__.showAllTasksOfCurrentProject)(currentProjectTaskList);\n    form.reset();\n})\n\nlet formCloseButton=document.querySelector('#form_close_button');\nformCloseButton.addEventListener('click',()=>{\n    formContainer.style.display='none';\n})\n\nlet detailsModal=document.querySelector('#details_modal');\nlet detailsModalContent=document.querySelector('#datails_modal_content');\nlet detailsModalCloseButton=document.querySelector('#details_modal_close_button');\ndetailsModalCloseButton.addEventListener('click',()=>{\n    for (let i=0;i<3;i++) {\n        detailsModalContent.lastChild.remove();\n    }\n    detailsModal.style.display='none';\n})\n\nlet containerOfFormForEditingTask=document.querySelector('#container_of_form_for_editing_task');\nlet formForEditingTask=document.querySelector('#form_for_editing_task');\nlet task_importance_dropdown_of_form_for_task_editing=document.querySelector('#task_importance_dropdown_of_form_for_task_editing');\nlet submitButtonForEditingTask=document.querySelector('#submit_button_of_form_for_editing_task');\nsubmitButtonForEditingTask.addEventListener('click',(e)=>{\n    containerOfFormForEditingTask.style.display='none';\n    let taskTitle=formForEditingTask[0].value;\n    let taskDescription=formForEditingTask[1].value;\n    let taskImportance=task_importance_dropdown_of_form_for_task_editing.value;\n    let taskDueDate=formForEditingTask[3].value;\n    \n    let newTask=(0,_applicationLogic__WEBPACK_IMPORTED_MODULE_0__.createTask)(taskImportance,taskTitle,taskDescription,taskDueDate);\n    let index_of_the_task_which_need_to_be_Edited=e.target.dataset.index;\n    currentProjectTaskList.splice(index_of_the_task_which_need_to_be_Edited,1,newTask);\n\n    localStorage.setItem('projectArray',JSON.stringify(projects));\n\n    (0,_applicationLogic__WEBPACK_IMPORTED_MODULE_0__.showAllTasksOfCurrentProject)(currentProjectTaskList);\n})\n\nlet closeButtonOfFormForEditingTask=document.querySelector('#close_button_of_form_for_editing_task');\ncloseButtonOfFormForEditingTask.addEventListener('click',()=>{\n    containerOfFormForEditingTask.style.display='none';\n})\n\nlet createNewProjectButton=document.querySelector('#add_project');\ncreateNewProjectButton.addEventListener('click',()=>{\n    projects.push([]);\n    projectName=prompt('Enter a Name');\n    projectNameArray.push(projectName);\n    \n    localStorage.setItem('projectArray',JSON.stringify(projects));\n    localStorage.setItem('projectNameArray',JSON.stringify(projectNameArray));\n    \n    let index=projects.length-1;\n    (0,_domStructure__WEBPACK_IMPORTED_MODULE_1__.createDomStructurForProject)(switchProject,createNewProjectButton,projectName,index)\n})\n\nlet switchProject=(index,projectName)=>{\n    currentProjectTaskList=projects[index];\n    (0,_applicationLogic__WEBPACK_IMPORTED_MODULE_0__.showAllTasksOfCurrentProject)(currentProjectTaskList);\n    formSubmitButton.setAttribute('data-index',`${index}`);\n    projectHeader.textContent=`${projectName}`\n}\n\nlet home=document.querySelector('#home');\nhome.setAttribute('data-index',`${0}`);\nhome.addEventListener('click',(e)=>{\n    switchProject(e.target.dataset.index,'Home');\n})\n\n;(0,_applicationLogic__WEBPACK_IMPORTED_MODULE_0__.showAllCurrentProjects)();\n\nswitchProject(0,'Home');\n\n\n\n//# sourceURL=webpack://Todo-List/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;