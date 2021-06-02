import {createTask,sortedTasks} from './applicationLogic';
import {taskDisplayDomContainer,createDomStructurForTask,createDomStructurForProject} from './domStructure';
let task;
let projects=[[]];
let projectHeader=document.querySelector('#project_header');

let home=document.querySelector('#home');
home.setAttribute('data-index',`${0}`);
home.addEventListener('click',(e)=>{
    switchProject(e.target.dataset.index);
    projectHeader.textContent='Home';
})

let formCloseButton=document.querySelector('#closeForm');
formCloseButton.addEventListener('click',()=>{
    formContainer.style.display='none';
})

let detailsModal=document.querySelector('#details_modal');
let detailsModalContent=document.querySelector('#datails_modal_content');
let detailsModalCloseButton=document.querySelector('#close_details_info');
detailsModalCloseButton.addEventListener('click',()=>{
    for (let i=0;i<3;i++) {
        detailsModalContent.lastChild.remove();
    }
    detailsModal.style.display='none';
})

let formContainer=document.querySelector('#container');
let addTaskButton=document.querySelector('#add_task');
addTaskButton.addEventListener('click',()=>{
    formContainer.style.display='flex';
    formContainer.style.justifyContent='center';
    formContainer.style.alignItems='center';
})

let submitButton=document.querySelector('#submit');
submitButton.setAttribute('data-index',`${0}`);
submitButton.addEventListener('click',(e)=>{
    formContainer.style.display='none';
    let importanceDropdown=document.querySelector('#importance');
    let title=`${form[0].value}`;
    let description=`${form[1].value}`;
    let importance=`${importanceDropdown.value}`;
    let dueDate=`${form[3].value}`;
    task=projects[e.target.dataset.index];
    task.push(createTask(importance,title,description,dueDate));
    let sort= sortedTasks(task);
    while (taskDisplayDomContainer.firstChild) {
        taskDisplayDomContainer.firstChild.remove();
    }
    for (let i=0;i<sort.length;i++){
        createDomStructurForTask(sort,i);
    }
})

let switchProject=(index,projectName)=>{
    task=projects[index];
    while (taskDisplayDomContainer.firstChild) {
        taskDisplayDomContainer.firstChild.remove();
    }
    for(let i=0;i<task.length;i++){
        createDomStructurForTask(task,i);
    }
    submitButton.setAttribute('data-index',`${index}`);
    projectHeader.textContent=`${projectName}`
}

let createNewProjectButton=document.querySelector('#add_project');
createNewProjectButton.addEventListener('click',()=>{
    createDomStructurForProject(projects,switchProject,createNewProjectButton)
})
