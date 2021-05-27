let createTask=(importance,title,description,dueDate)=>{

    return {importance,title,description,dueDate}
}
let sortedTasks=(task)=>{
    return task.sort(function (a,b){
        return a.importance-b.importance;
    })
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
    create_human_readable_importance_vaule
}