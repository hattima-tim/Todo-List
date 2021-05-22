import {tasks,createTask} from './applicationLogic';
let projects=[[]];
let task;
let defaultProject=document.querySelector('#default_project');
defaultProject.setAttribute('data-index',`${0}`);
defaultProject.addEventListener('click',(e)=>{
    switchProject(e.target.dataset.index);
    task=projects[e.target.dataset.index];
    for(let i=0;i<task.length;i++){
        display(task,i);
    }
})
let table=document.querySelector('#table');
function display(task,index){
    let tableRow=document.createElement('tr');
    let titleInfo=document.createElement('td');
    titleInfo.textContent=task[index].title;
    let detailsInfo=document.createElement('td');
    detailsInfo.textContent=task[index].details;
    tableRow.appendChild(titleInfo);
    tableRow.appendChild(detailsInfo);
    table.appendChild(tableRow);
}
let submitButton=document.querySelector('#submit');
submitButton.setAttribute('data-index',`${0}`);
submitButton.addEventListener('click',(e)=>{
    let title=`${form[0].value}`;
    let details=`${form[1].value}`;
    task=projects[e.target.dataset.index];
    task.push(createTask(title,details));
    display(task,task.length-1);
})
let projectList=document.querySelector('#projects');
let createNewProject=document.querySelector('#add_project');
createNewProject.addEventListener('click',()=>{
    projects.push([]);
    let projectName=prompt('Enter a name');
    let aElement=document.createElement('a');
    aElement.textContent=`${projectName}`;
    aElement.setAttribute('data-index',`${projects.length-1}`);
    aElement.addEventListener('click',(e)=>{
        switchProject(e.target.dataset.index);
        task=projects[e.target.dataset.index];
        for(let i=0;i<task.length;i++){
            display(task,i);
        }
    });
    projectList.appendChild(aElement);
    switchProject(projects.length-1);
})
let switchProject=(index)=>{
    while (table.firstChild) {
        table.firstChild.remove();
    }
    submitButton.setAttribute('data-index',`${index}`);
}