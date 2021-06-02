import {updateIndexOfTasks,updateIndexOfProjects,create_human_readable_importance_vaule} from './applicationLogic';
let taskCompletionCounter=0;
let taskCompletionCounterDOM=document.querySelector('#total_task_completed');
let taskDisplayDomContainer=document.querySelector('#display');
let detailsModal=document.querySelector('#details_modal');
let detailsModalContent=document.querySelector('#datails_modal_content');
let createDomStructurForTask=(task,index)=>{
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
        let taskName=document.createElement('p');
        let description=document.createElement('p');
        let importance=document.createElement('p');
        taskName.textContent=`Task Name:${task[e.target.dataset.index].title}`;
        description.textContent=`Description:${task[e.target.dataset.index].description}`;
        importance.textContent=`Importance:${coolImportanceValue}`;
        detailsModalContent.appendChild(taskName);
        detailsModalContent.appendChild(description);
        detailsModalContent.appendChild(importance);
        detailsModal.style.display='block';
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

let sidenav=document.querySelector('.sidenav');
let createDomStructurForProject=(projects,switchProject,createNewProjectButton)=>{
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
}
export {
    taskDisplayDomContainer,
    createDomStructurForTask,
    createDomStructurForProject
}