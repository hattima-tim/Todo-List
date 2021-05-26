let createTask=(importance,title,details,dueDate)=>{
    return {importance,title,details,dueDate}
}
let sortedTasks=(task)=>{
    return task.sort(function (a,b){
        return a.importance-b.importance;
    })
}
export {
    createTask,
    sortedTasks
}