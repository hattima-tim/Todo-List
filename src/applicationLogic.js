import {projects,projectNameArray,switchProject} from './index';
import {domContainerForTasks,createDomStructurForTask,createDomStructurForProject} from './domStructure';

let createTask=(taskImportance,taskTitle,taskDescription,taskDueDate)=>{

    return {taskImportance,taskTitle,taskDescription,taskDueDate}
}
let sortTasks=(currentProjectTaskList)=>{
    return currentProjectTaskList.sort(function (a,b){
        return a.taskImportance-b.taskImportance;
    })
}

let showAllTasksOfCurrentProject=(currentProjectTaskList)=>{
    let sortedTasks= sortTasks(currentProjectTaskList);
    while (domContainerForTasks.firstChild) {
        domContainerForTasks.firstChild.remove();
    }
    for (let i=0;i<sortedTasks.length;i++){
        createDomStructurForTask(sortedTasks,i);
    }
}

let showAllCurrentProjects=()=>{
    for (let i=1;i<projects.length;i++){
        let projectName=projectNameArray[i];
        let index=i;
        let createNewProjectButton=document.querySelector('#add_project');
        createDomStructurForProject(switchProject,createNewProjectButton,projectName,index);
    }
}

let updateIndexOfTasks=(index)=>{
    let taskList=document.querySelectorAll('.task_list');
    for (let i=index;i<taskList.length-1;i++){
        let indexOfNextTask=Number(i)+1;
        let indexOfCheckbox=0;
        let indexOfDetailsButton=2;
        let indexOfTaskEditIconContainerElement=4;
        let indexOfTaskDeleteIconContainerElement=5;

        let taskCheckbox=taskList[indexOfNextTask].childNodes[indexOfCheckbox].firstChild;
        let taskDetailsButton=taskList[indexOfNextTask].childNodes[indexOfDetailsButton].firstChild;
        let taskEditIcon=taskList[indexOfNextTask].childNodes[indexOfTaskEditIconContainerElement].firstChild;
        let taskDeleteIcon=taskList[indexOfNextTask].childNodes[indexOfTaskDeleteIconContainerElement].firstChild;
        
        taskCheckbox.setAttribute('data-index',`${i}`);
        taskDetailsButton.setAttribute('data-index',`${i}`);
        taskEditIcon.setAttribute('data-index',`${i}`);
        taskDeleteIcon.setAttribute('data-index',`${i}`);
    }
}
let updateIndexOfProjects=(index)=>{
    let projectNameList=document.querySelectorAll('.project_name');
    for (let i=index;i<projectNameList.length-1;i++){
        let indexOfNextproject=Number(i)+1;
        projectNameList[indexOfNextproject].setAttribute('data-index',`${i}`);
    }
}

let removeTask=(e,currentProjectTaskList)=>{
    let indexOfCurrentTask=e.target.dataset.index;
    currentProjectTaskList.splice(indexOfCurrentTask,1);
    
    localStorage.setItem('projectArray',JSON.stringify(projects));
    
    updateIndexOfTasks(indexOfCurrentTask);
    e.target.parentNode.parentNode.parentNode.remove();
}

let removeProject=(e)=>{
    let indexOfCurrentProject=e.target.previousElementSibling.dataset.index;
    projects.splice(indexOfCurrentProject,1);
    projectNameArray.splice(indexOfCurrentProject,1)
    
    localStorage.setItem('projectArray',JSON.stringify(projects));
    localStorage.setItem('projectNameArray',JSON.stringify(projectNameArray));
    
    updateIndexOfProjects(indexOfCurrentProject);
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