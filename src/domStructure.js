import {removeTask,removeProject,create_human_readable_importance_vaule} from './applicationLogic';
let taskCompletionCounter=0;
let taskCompletionCounterDOM=document.querySelector('#total_task_completed');
let domContainerForTasks=document.querySelector('#task_container');
let detailsModal=document.querySelector('#details_modal');
let detailsModalContent=document.querySelector('#datails_modal_content');
let containerOfFormForEditingTask=document.querySelector('#container_of_form_for_editing_task');
let formForEditingTask=document.querySelector('#form_for_editing_task');
let task_importance_dropdown_of_form_for_task_editing=document.querySelector('#task_importance_dropdown_of_form_for_task_editing');
let submitButtonForUpdatingTask=document.querySelector('#submit_button_of_form_for_editing_task');

let showDetailsModal=(e,currentProjectTaskList)=>{
    let importanceValue=create_human_readable_importance_vaule(currentProjectTaskList[e.target.dataset.index].taskImportance);
    let taskName=document.createElement('p');
    let taskDescription=document.createElement('p');
    let taskImportance=document.createElement('p');
    taskName.textContent=`Task Name:${currentProjectTaskList[e.target.dataset.index].taskTitle}`;
    taskDescription.textContent=`Description:${currentProjectTaskList[e.target.dataset.index].taskDescription}`;
    taskImportance.textContent=`Importance:${importanceValue}`;
    detailsModalContent.appendChild(taskName);
    detailsModalContent.appendChild(taskDescription);
    detailsModalContent.appendChild(taskImportance);
    detailsModal.style.display='block';
}

let createDomStructurForTask=(currentProjectTaskList,index)=>{
    let table=document.createElement('table');
    let tableRow=document.createElement('tr');
    let checkbox=document.createElement('td');
    let checkboxInput=document.createElement('input');
    let titleInfo=document.createElement('td');
    let detailsInfo=document.createElement('td');
    let detailsButton=document.createElement('button');
    let dueDate=document.createElement('td');
    let taskEditButtonContainer=document.createElement('td');
    let taskEditButton=document.createElement('button');
    let taskEditIcon=document.createElement('i');

    tableRow.classList.add('task_list');
   
    checkboxInput.setAttribute('type','checkbox');
    checkboxInput.setAttribute('id','done');
    checkboxInput.setAttribute('name','done');
    checkboxInput.setAttribute('value','done');
    checkboxInput.setAttribute('data-index',`${index}`);
    checkboxInput.addEventListener('change',(e)=>{
        taskCompletionCounter+=1;
        taskCompletionCounterDOM.textContent=`Completed (${taskCompletionCounter})`;
        removeTask(e,currentProjectTaskList);
    })
   
    titleInfo.textContent=currentProjectTaskList[index].taskTitle;
   
    detailsButton.textContent='Details';
    detailsButton.setAttribute('data-index',`${index}`);
    detailsButton.addEventListener('click',(e)=>{
        showDetailsModal(e,currentProjectTaskList);
    })
   
    dueDate.textContent=currentProjectTaskList[index].taskDueDate;
    
    taskEditIcon.setAttribute('data-index',`${index}`);
    taskEditIcon.addEventListener('click',(e)=>{
        containerOfFormForEditingTask.style.display='flex';
        containerOfFormForEditingTask.style.justifyContent='center';
        containerOfFormForEditingTask.style.alignItems='center';
        formForEditingTask[0].value=currentProjectTaskList[e.target.dataset.index].taskTitle;
        formForEditingTask[1].value=currentProjectTaskList[e.target.dataset.index].taskDescription;
        task_importance_dropdown_of_form_for_task_editing.value=currentProjectTaskList[e.target.dataset.index].taskImportance;
        formForEditingTask[3].value=currentProjectTaskList[e.target.dataset.index].taskDueDate;
        submitButtonForUpdatingTask.setAttribute('data-index',`${e.target.dataset.index}`);
    })
    taskEditIcon.setAttribute('class','far fa-edit');

    checkbox.appendChild(checkboxInput);
    tableRow.appendChild(checkbox);
    tableRow.appendChild(titleInfo);
    detailsInfo.appendChild(detailsButton);
    tableRow.appendChild(detailsInfo);
    tableRow.appendChild(dueDate);
    taskEditButton.appendChild(taskEditIcon);
    taskEditButtonContainer.appendChild(taskEditButton);
    tableRow.appendChild(taskEditButtonContainer);
    table.appendChild(tableRow);
    domContainerForTasks.appendChild(table);
}

let sidenav=document.querySelector('.sidenav');
let createDomStructurForProject=(switchProject,createNewProjectButton,projectName,index)=>{
    let side_nav_project_name_container=document.createElement('div');
    side_nav_project_name_container.classList.add('side_nav_project_name_holder');

    let projectNameLink=document.createElement('a');
    projectNameLink.textContent=`${projectName}`;
    projectNameLink.classList.add('project_name');
    projectNameLink.setAttribute('data-index',`${index}`);
    projectNameLink.addEventListener('click',(e)=>{
        let indexOfClickedProject=e.target.dataset.index;
        switchProject(indexOfClickedProject,projectName);
    });

    let projectRemover=document.createElement('span');
    projectRemover.textContent='x';
    projectRemover.addEventListener('click',(e)=>{
        removeProject(e);
        e.target.parentNode.remove();
    })
    side_nav_project_name_container.appendChild(projectNameLink);
    side_nav_project_name_container.appendChild(projectRemover);
    sidenav.insertBefore(side_nav_project_name_container,createNewProjectButton);
    switchProject(index,projectName);
}
export {
    domContainerForTasks,
    createDomStructurForTask,
    createDomStructurForProject
}