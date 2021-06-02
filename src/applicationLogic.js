let createTask=(importance,title,description,dueDate)=>{

    return {importance,title,description,dueDate}
}
let sortedTasks=(task)=>{
    return task.sort(function (a,b){
        return a.importance-b.importance;
    })
}
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
let updateIndexOfProjects=(index)=>{
    let projectNameList=document.querySelectorAll('.project_name');
    for (let i=index;i<projectNameList.length-1;i++){
        let indexOfNextproject=Number(i)+1;
        projectNameList[indexOfNextproject].setAttribute('data-index',`${i}`);
    }
}
let create_human_readable_importance_vaule=(value)=>{
    let coolImportanceValue;
    switch(value){
        case '1':
            coolImportanceValue='High';
            break;
        case '2':
            coolImportanceValue='medium';
            break;
        case '3':
            coolImportanceValue='Low';
            break;
    }
    return coolImportanceValue;
}
export {
    createTask,
    sortedTasks,
    updateIndexOfTasks,
    updateIndexOfProjects,
    create_human_readable_importance_vaule
}