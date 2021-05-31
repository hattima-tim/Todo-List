import {createTask,sortedTasks,create_human_readable_importance_vaule} from './applicationLogic';
let task;
let taskCompletionCounter=0;
let taskCompletionCounterDOM=document.querySelector('#total_task_completed');
let projects=[[]];
let projectHeader=document.querySelector('#project_header');

let home=document.querySelector('#home');
home.setAttribute('data-index',`${0}`);
home.addEventListener('click',(e)=>{
    switchProject(e.target.dataset.index);
    projectHeader.textContent='Home';
})

let formCloseButton=document.querySelector('#close');
formCloseButton.addEventListener('click',()=>{
    formContainer.style.display='none';
})

let formContainer=document.querySelector('#container');
let addTaskButton=document.querySelector('#add_task');
addTaskButton.addEventListener('click',()=>{
    formContainer.style.display='flex';
    formContainer.style.justifyContent='center';
    formContainer.style.alignItems='center';
})
let updateIndexOfTasks=(index)=>{
    let taskList=document.querySelectorAll('.task_list');
    for (let i=index;i<taskList.length-1;i++){
        let indexOfNextTask=Number(i)+1;
        let indexOfCheckbox=0;
        let indexOfDetailsButton=2;
        taskList[indexOfNextTask].childNodes[indexOfCheckbox].firstChild.setAttribute('data-index',`${i}`);
        taskList[indexOfNextTask].childNodes[indexOfDetailsButton].firstChild.setAttribute('data-index',`${i}`);
    }
}
let taskDisplayDomContainer=document.querySelector('#display');
let display=(task,index)=>{
    let table=document.createElement('table');
    let tableRow=document.createElement('tr');
    let checkbox=document.createElement('td');
    let checkboxInput=document.createElement('input');
    let titleInfo=document.createElement('td');
    let detailsInfo=document.createElement('td');
    let detailsButton=document.createElement('button');
    let dueDate=document.createElement('td');
    
    tableRow.classList.add('task_list');
    checkboxInput.setAttribute('type','checkbox');
    checkboxInput.setAttribute('id','done');
    checkboxInput.setAttribute('name','done');
    checkboxInput.setAttribute('value','done');
    checkboxInput.setAttribute('data-index',`${index}`);
    checkboxInput.addEventListener('change',(e)=>{
        taskCompletionCounter+=1;
        taskCompletionCounterDOM.textContent=`Completed (${taskCompletionCounter})`;
        let indexOfCurrentTask=e.target.dataset.index;
        task.splice(indexOfCurrentTask,1);
        updateIndexOfTasks(indexOfCurrentTask);
        e.target.parentNode.parentNode.parentNode.remove();
    })
    titleInfo.textContent=task[index].title;
    detailsButton.textContent='Details';
    detailsButton.setAttribute('data-index',`${index}`);
    detailsButton.addEventListener('click',(e)=>{
        let coolImportanceValue=create_human_readable_importance_vaule(task[e.target.dataset.index].importance);
        alert(`Description:${task[e.target.dataset.index].description}
        Importance:${coolImportanceValue}`);
    })
    dueDate.textContent=task[index].dueDate;
    checkbox.appendChild(checkboxInput);
    tableRow.appendChild(checkbox);
    tableRow.appendChild(titleInfo);
    detailsInfo.appendChild(detailsButton);
    tableRow.appendChild(detailsInfo);
    tableRow.appendChild(dueDate);
    table.appendChild(tableRow);
    taskDisplayDomContainer.appendChild(table);
}
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
        display(sort,i);
    }
})

let updateIndexOfProjects=(index)=>{
    let projectNameList=document.querySelectorAll('.project_name');
    for (let i=index;i<projectNameList.length-1;i++){
        let indexOfNextproject=Number(i)+1;
        projectNameList[indexOfNextproject].setAttribute('data-index',`${i}`);
    }
}

let switchProject=(index,projectName)=>{
    while (table.firstChild) {
        table.firstChild.remove();
    }
    task=projects[index];
    for(let i=0;i<task.length;i++){
        display(task,i);
    }
    submitButton.setAttribute('data-index',`${index}`);
    projectHeader.textContent=`${projectName}`
}

let sidenav=document.querySelector('.sidenav');
let createNewProjectButton=document.querySelector('#add_project');
createNewProjectButton.addEventListener('click',()=>{
    projects.push([]);
    let projectName=prompt('Enter a name');
    let aElement=document.createElement('a');
    aElement.textContent=`${projectName}`;
    aElement.classList.add('project_name');
    aElement.setAttribute('data-index',`${projects.length-1}`);
    aElement.addEventListener('click',(e)=>{
        let indexOfClickedProject=e.target.dataset.index;
        switchProject(indexOfClickedProject,projectName);
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
        switchProject(0,'Home');
        e.target.parentNode.remove();
    })
    side_nav_project_name_container.appendChild(aElement);
    side_nav_project_name_container.appendChild(close);
    sidenav.insertBefore(side_nav_project_name_container,createNewProjectButton);
    switchProject(projects.length-1,projectName);
})
