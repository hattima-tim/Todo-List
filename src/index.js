import {createTask} from './applicationLogic';
let projects=[[]];
let task;
let defaultProject=document.querySelector('#default_project');
defaultProject.setAttribute('data-index',`${0}`);
defaultProject.addEventListener('click',(e)=>{
    switchProject(e.target.dataset.index);
})
let table=document.querySelector('#table');
function display(task,index){
    let tableRow=document.createElement('tr');
    let checkbox=document.createElement('td');
    let checkboxInput=document.createElement('input');
    checkboxInput.setAttribute('type','checkbox');
    checkboxInput.setAttribute('id','done');
    checkboxInput.setAttribute('name','done');
    checkboxInput.setAttribute('value','done');
    checkbox.appendChild(checkboxInput);
    tableRow.appendChild(checkbox);
    let titleInfo=document.createElement('td');
    titleInfo.textContent=task[index].title;
    tableRow.appendChild(titleInfo);
    let detailsInfo=document.createElement('td');
    let detailsButton=document.createElement('button');
    detailsButton.addEventListener('click',()=>{
        alert(task[index].details);
    })
    detailsButton.textContent='Details';
    detailsInfo.appendChild(detailsButton);
    tableRow.appendChild(detailsInfo);
    let dueDate=document.createElement('td');
    dueDate.textContent=task[index].dueDate;
    tableRow.appendChild(dueDate);
    table.appendChild(tableRow);
}
let submitButton=document.querySelector('#submit');
submitButton.setAttribute('data-index',`${0}`);
submitButton.addEventListener('click',(e)=>{
    let title=`${form[0].value}`;
    let details=`${form[1].value}`;
    let dueDate=`${form[2].value}`;
    task=projects[e.target.dataset.index];
    task.push(createTask(title,details,dueDate));
    display(task,task.length-1);
})

let updateIndexOfProjects=(index)=>{
    let projectNameList=document.querySelectorAll('.project_name');
    for (let i=index;i<projectNameList.length-1;i++){
        let indexOfNextproject=Number(i)+1;
        projectNameList[indexOfNextproject].setAttribute('data-index',`${i}`);
    }
}

let switchProject=(index)=>{
    while (table.firstChild) {
        table.firstChild.remove();
    }
    task=projects[index];
    for(let i=0;i<task.length;i++){
        display(task,i);
    }
    submitButton.setAttribute('data-index',`${index}`);
}

let sidenav=document.querySelector('.sidenav');
let createNewProject=document.querySelector('#add_project');
createNewProject.addEventListener('click',()=>{
    projects.push([]);
    let projectName=prompt('Enter a name');
    let aElement=document.createElement('a');
    aElement.textContent=`${projectName}`;
    aElement.classList.add('project_name');
    aElement.setAttribute('data-index',`${projects.length-1}`);
    aElement.addEventListener('click',(e)=>{
        let indexOfClickedProject=e.target.dataset.index;
        switchProject(indexOfClickedProject);
    });
    let side_nav_project_name_container=document.createElement('div');
    side_nav_project_name_container.classList.add('side_nav_project_name_holder');
    let close=document.createElement('span');
    close.textContent='x';
    close.setAttribute('data-index',`${projects.length-1}`);
    close.addEventListener('click',(e)=>{
        let indexOfCurrentProject=e.target.previousElementSibling.dataset.index;
        projects.splice(indexOfCurrentProject,1);
        updateIndexOfProjects(indexOfCurrentProject);
        switchProject(0);
        e.target.parentNode.remove();
    })
    side_nav_project_name_container.appendChild(aElement);
    side_nav_project_name_container.appendChild(close);
    sidenav.appendChild(side_nav_project_name_container);
    switchProject(projects.length-1);
})
