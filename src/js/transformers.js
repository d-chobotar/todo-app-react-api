const mapTaskData = (tasks) => {
    return tasks.map(task => ({
        val: task.label,
        isCompleted: task.is_done,
        id: task.id
    }));
}

const mapTaskToApiFormat = (task) => {
    return {
        label: task.val,
        is_done: task.isCompleted
    }
}

export {mapTaskData, mapTaskToApiFormat};