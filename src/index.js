import {tasks,createTask} from './applicationLogic';
let projects=[{tasks}]
let task=projects[0].tasks;
let table=document.querySelector('#table');
function display(a){
    let tableRow=document.createElement('tr');
    let titleInfo=document.createElement('td');
    titleInfo.textContent=task[a].title;
    let detailsInfo=document.createElement('td');
    detailsInfo.textContent=task[a].details;
    let closeButton=document.createElement('span');
    closeButton.textContent='x';
    tableRow.appendChild(titleInfo);
    tableRow.appendChild(detailsInfo);
    tableRow.appendChild(closeButton);
    table.appendChild(tableRow);
}
let a=0;
let submitButton=document.querySelector('.submit');
submitButton.addEventListener('click',()=>{
    let title=`${form[0].value}`;
    let details=`${form[1].value}`;
    task[a]=createTask(title,details);
    display(a);
    a++;
})
let addProject=document.querySelector('#add_project');
addProject.addEventListener('click',()=>{
    let projectName=prompt('Enter a name');
    
})