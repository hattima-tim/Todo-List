let createTask=(taskImportance,taskTitle,taskDescription,taskDueDate)=>{

    return {taskImportance,taskTitle,taskDescription,taskDueDate}
}
let sortTasks=(project)=>{
    return project.sort(function (a,b){
        return a.importance-b.importance;
    })
}
let updateIndexOfTasks=(index)=>{
    let taskList=document.querySelectorAll('.task_list');
    for (let i=index;i<taskList.length-1;i++){
        let indexOfNextTask=Number(i)+1;
        let indexOfCheckbox=0;
        let indexOfDetailsButton=2;
        let taskCheckbox=taskList[indexOfNextTask].childNodes[indexOfCheckbox].firstChild;
        let taskDetailsButton=taskList[indexOfNextTask].childNodes[indexOfDetailsButton].firstChild;
        taskCheckbox.setAttribute('data-index',`${i}`);
        taskDetailsButton.setAttribute('data-index',`${i}`);
    }
}
let updateIndexOfProjects=(index)=>{
    let projectNameList=document.querySelectorAll('.project_name');
    for (let i=index;i<projectNameList.length-1;i++){
        let indexOfNextproject=Number(i)+1;
        projectNameList[indexOfNextproject].setAttribute('data-index',`${i}`);
    }
}

let removeTask=(e,project)=>{
    let indexOfCurrentTask=e.target.dataset.index;
    project.splice(indexOfCurrentTask,1);
    updateIndexOfTasks(indexOfCurrentTask);
    e.target.parentNode.parentNode.parentNode.remove();
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
export {
    createTask,
    sortTasks,
    updateIndexOfProjects,
    removeTask,
    create_human_readable_importance_vaule
}