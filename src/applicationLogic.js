import {switchProject} from './index';
import {domContainerForTasks,createDomStructurForTask,createDomStructurForProject} from './domStructure';
import { addTaskListToCloud, deleteProjectInCloud, saveProjectNameArrayInCloud } from './firebaseLogic';

let createTask=(taskImportance,taskTitle,taskDescription,taskDueDate)=>{

    return {taskImportance,taskTitle,taskDescription,taskDueDate}
}
let sortTasks=(currentProjectTaskList)=>{
    return currentProjectTaskList.sort(function (a,b){
        return a.taskImportance-b.taskImportance;
    })
}

let showAllTasksOfCurrentProject=(currentProjectTaskList,currentProjectName)=>{
    let sortedTasks= sortTasks(currentProjectTaskList);
    while (domContainerForTasks.firstChild) {
        domContainerForTasks.firstChild.remove();
    }
    for (let i=0;i<sortedTasks.length;i++){
        createDomStructurForTask(sortedTasks,i,currentProjectName);
    }
}

let showAllCurrentProjects=(projectNameArray)=>{
    for (let i=1;i<projectNameArray.length;i++){
        let projectName=projectNameArray[i];
        let index=i;
        let createNewProjectButton=document.querySelector('#add_project');
        createDomStructurForProject(switchProject,createNewProjectButton,projectName,projectNameArray,index);
    }
}

let updateIndexOfTasks=()=>{
    let taskList=document.querySelectorAll('.task_list');
    for (let i=0;i<=taskList.length-1;i++){
        let indexOfCheckbox=0;
        let indexOfDetailsButton=2;
        let indexOfTaskEditIconContainerElement=4;
        let indexOfTaskDeleteIconContainerElement=5;

        let taskCheckbox=taskList[i].childNodes[indexOfCheckbox].firstChild;
        let taskDetailsButton=taskList[i].childNodes[indexOfDetailsButton].firstChild;
        let taskEditIconContainer=taskList[i].childNodes[indexOfTaskEditIconContainerElement];
        let taskDeleteIconContainer=taskList[i].childNodes[indexOfTaskDeleteIconContainerElement];
        
        taskCheckbox.setAttribute('data-index',`${i}`);
        taskDetailsButton.setAttribute('data-index',`${i}`);
        taskEditIconContainer.setAttribute('data-index',`${i}`);
        taskDeleteIconContainer.setAttribute('data-index',`${i}`);
    }
}
let updateIndexOfProjects=(index)=>{
    let projectNameList=document.querySelectorAll('.project_name');
    for (let i=index;i<projectNameList.length-1;i++){
        let indexOfNextproject=Number(i)+1;
        projectNameList[indexOfNextproject].setAttribute('data-index',`${i}`);
    }
}

let removeTask=(e,currentProjectTaskList, currentProjectName)=>{
    let indexOfCurrentTask=e.target.dataset.index;
    currentProjectTaskList.splice(indexOfCurrentTask,1);
    
    const taskListJSON = JSON.stringify(currentProjectTaskList);
    localStorage.setItem(`${currentProjectName}`,taskListJSON);
    addTaskListToCloud(currentProjectName,taskListJSON);

    e.target.closest('table').remove();
    updateIndexOfTasks();
}

let removeProject=(e, projectName, projectNameArray)=>{
    let indexOfTheProject=e.target.previousElementSibling.dataset.index;
    projectNameArray.splice(indexOfTheProject,1)
    
    const projectNameArrayJSON = JSON.stringify(projectNameArray);
    localStorage.setItem('projectNameArray',projectNameArrayJSON);
    saveProjectNameArrayInCloud(projectNameArrayJSON,'update');
    
    localStorage.removeItem(`${projectName}`);
    deleteProjectInCloud(projectName);

    updateIndexOfProjects(indexOfTheProject);
    switchProject(0,'Home');
}

let create_human_readable_importance_vaule=(value)=>{
    let importanceValue;
    switch(value){
        case '1':
            importanceValue='High';
            break;
        case '2':
            importanceValue='medium';
            break;
        case '3':
            importanceValue='Low';
            break;
    }
    return importanceValue;
}

let showFormForEditingTask=(e,currentProjectTaskList)=>{
    let containerOfFormForEditingTask=document.querySelector('#container_of_form_for_editing_task');
    let formForEditingTask=document.querySelector('#form_for_editing_task');
    let task_importance_dropdown_of_form_for_task_editing=document.querySelector('#task_importance_dropdown_of_form_for_task_editing');

    containerOfFormForEditingTask.style.display='flex';
    containerOfFormForEditingTask.style.justifyContent='center';
    containerOfFormForEditingTask.style.alignItems='center';
    formForEditingTask[0].value=currentProjectTaskList[e.target.dataset.index].taskTitle;
    formForEditingTask[1].value=currentProjectTaskList[e.target.dataset.index].taskDescription;
    task_importance_dropdown_of_form_for_task_editing.value=currentProjectTaskList[e.target.dataset.index].taskImportance;
    formForEditingTask[3].value=currentProjectTaskList[e.target.dataset.index].taskDueDate;
}

export {
    createTask,
    sortTasks,
    showAllTasksOfCurrentProject,
    showAllCurrentProjects,
    updateIndexOfProjects,
    removeTask,
    removeProject,
    create_human_readable_importance_vaule,
    showFormForEditingTask
}