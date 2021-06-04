import {createTask,sortTasks} from './applicationLogic';
import {domContainerForTasks,createDomStructurForTask,createDomStructurForProject} from './domStructure';
let project;
let projects=[[]];
let projectHeader=document.querySelector('#project_header');

let formContainer=document.querySelector('#form_container');
let addTaskButton=document.querySelector('#add_task_button');
addTaskButton.addEventListener('click',()=>{
    formContainer.style.display='flex';
    formContainer.style.justifyContent='center';
    formContainer.style.alignItems='center';
})

let formSubmitButton=document.querySelector('#form_submit_button');
formSubmitButton.setAttribute('data-index',`${0}`);
formSubmitButton.addEventListener('click',(e)=>{
    formContainer.style.display='none';
    let importanceDropdown=document.querySelector('#importance');
    let taskTitle=`${form[0].value}`;
    let taskDescription=`${form[1].value}`;
    let taskImportance=`${importanceDropdown.value}`;
    let taskDueDate=`${form[3].value}`;
    
    let newTask=createTask(taskImportance,taskTitle,taskDescription,taskDueDate);
    project=projects[e.target.dataset.index];
    project.push(newTask);
    
    let sortedTasks= sortTasks(project);
    while (domContainerForTasks.firstChild) {
        domContainerForTasks.firstChild.remove();
    }
    for (let i=0;i<sortedTasks.length;i++){
        createDomStructurForTask(sortedTasks,i);
    }
})

let formCloseButton=document.querySelector('#form_close_button');
formCloseButton.addEventListener('click',()=>{
    formContainer.style.display='none';
})

let detailsModal=document.querySelector('#details_modal');
let detailsModalContent=document.querySelector('#datails_modal_content');
let detailsModalCloseButton=document.querySelector('#details_modal_close_button');
detailsModalCloseButton.addEventListener('click',()=>{
    for (let i=0;i<3;i++) {
        detailsModalContent.lastChild.remove();
    }
    detailsModal.style.display='none';
})

let createNewProjectButton=document.querySelector('#add_project');
createNewProjectButton.addEventListener('click',()=>{
    createDomStructurForProject(projects,switchProject,createNewProjectButton)
})

let switchProject=(index,projectName)=>{
    project=projects[index];
    while (domContainerForTasks.firstChild) {
        domContainerForTasks.firstChild.remove();
    }
    for(let i=0;i<project.length;i++){
        createDomStructurForTask(project,i);
    }
    formSubmitButton.setAttribute('data-index',`${index}`);
    projectHeader.textContent=`${projectName}`
}

let home=document.querySelector('#home');
home.setAttribute('data-index',`${0}`);
home.addEventListener('click',(e)=>{
    switchProject(e.target.dataset.index);
    projectHeader.textContent='Home';
})