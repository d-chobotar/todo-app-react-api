import React, { useEffect, useState } from "react";
import { Task } from "./Task";
import { fetchTasks, updateTask, createTask, deleteTask, createUser } from "../apiClient";
import { mapTaskData, mapTaskToApiFormat } from "../transformers";

export const TodoContainer = () => {
    const USERNAME = 'dchobotar';
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');


    useEffect(() => {
        const initializeTasks = async () => {
            try {
                let fetchedTasksResponse = await fetchTasks(USERNAME);
                if(fetchedTasksResponse.status === 404){
                    await createUser(USERNAME);
                    const newTask = { isCompleted: false, val: 'Initial task - delete it!' };
                    createTaskApiSyncUi(newTask);
                    fetchedTasksResponse = await fetchTasks(USERNAME);
                }
                console.log(fetchedTasksResponse.data.todos)
                if(fetchedTasksResponse.data.todos.length === 0){
                    const newTask = { isCompleted: false, val: 'Initial task - delete it!' };
                    createTaskApiSyncUi(newTask);
                }

                setTasks(mapTaskData(fetchedTasksResponse.data.todos));
                console.log('Tasks have been fetched', fetchedTasksResponse);
            } catch (error) {
                console.error('Failed to initialize tasks:', error);
            };
        }
        initializeTasks();
    }, []);

    const createTaskApiSyncUi = async (newTask) => {
        try {
            const createResponse = await createTask(USERNAME, mapTaskToApiFormat(newTask));
            console.log('New task has been created with status: ', createResponse);
            if (createResponse.status === 201) {
                const taskWithId = {...newTask, id: createResponse.data.id};
                setTasks(prevTasks => [...prevTasks, taskWithId]);
            }
        } catch (error) {
            console.error('Error creating a new task:', error);
        }
    }

    const handleTaskInput = (event) => {
        if (event.key === 'Enter') {
            if (input.trim() !== '') {
                event.preventDefault();
                const newTask = { isCompleted: false, val: input };
                createTaskApiSyncUi(newTask);
                setInput('');
            } else {
                setInput('Enter the task in order to add it.');
            }
        }
    }

    const addTask = () => {
        if (input.trim() !== '') {
            const newTask = { isCompleted: false, val: input };
            createTaskApiSyncUi(newTask);
            setInput('');
        }
    }

    const completeHandler = (index) => {
        const taskToUpdate = tasks[index];
        const updatedTask = { ...taskToUpdate, isCompleted: !taskToUpdate.isCompleted };

        const markCompleteTaskApi = async () => {
            try {
                const updateResponse = await updateTask(taskToUpdate.id, mapTaskToApiFormat(updatedTask));
                console.log('Marking task as completed: ', updateResponse)
                if (updateResponse && updateResponse.status === 200) {
                    setTasks(prevTasks => prevTasks.map((task, idx) => {
                        if (idx === index) {
                            return { ...task, isCompleted: !task.isCompleted };
                        }
                        return task;
                    }));
                } else {
                    console.log('Failed to mark task as completed:', updateResponse.status);
                }

            } catch (error) {
                console.log('Error while updating a task', error);
            }
        }

        markCompleteTaskApi();
    }

    const clickTrashHandler = (index) => {
        const taskToDelete = tasks[index];
        console.log('index: ', tasks[index], taskToDelete);
        const deleteTaskAndUpdateUi = async () => {
            try {
                console.log('task id: ', taskToDelete.id);
                const deleteResponse = await deleteTask(taskToDelete.id);
                console.log('Deleted the task ', deleteResponse)
                if (deleteResponse.status === 204) {
                    setTasks(prevTasks => {
                        const newTasks = prevTasks.filter((_, idx) => idx !== index);
                        console.log('New tasks array after deletion: ', newTasks);
                        return newTasks;
                    });

                }
            } catch (error) {
                console.log('Error in deleting a task', error);
            }
        };
        deleteTaskAndUpdateUi();
    }

    const filteredTasks = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isCompleted);
            case 'completed':
                return tasks.filter(task => task.isCompleted);
            default:
                return tasks;
        }
    }

    return (
        <div className="todoContainer">
            <div className="appHeader">
                Make Today Productive!
            </div>

            <div className="taskInput">
                <div className="checkMark">
                    <i className="fas fa-circle"></i>
                </div>
                <div className="inputBox">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleTaskInput}
                        type="text"
                        placeholder="Create a new task..."
                    />
                </div>
                <div className="addTask" onClick={addTask}>
                    <i className="fas fa-plus"></i>
                </div>
            </div>

            <div className="tasksContainer">
                <ul>
                    {filteredTasks().map((task) => (
                        <li key={task.id}>
                            <Task
                                remove={clickTrashHandler}
                                markComplete={completeHandler}
                                taskObj={task}
                                index={tasks.indexOf(task)}
                                val={task.val}
                            />
                        </li>
                    ))}
                </ul>
                <div className="footer d-flex justify-content-between">
                    <div>{tasks.length} tasks left</div>
                    <div className="filters">
                        <button
                            className={`footerButton ${filter === 'all' ? 'active-filter' : ''}`}
                            onClick={() => setFilter('all')}
                        > All </button>
                        <button
                            className={`footerButton ${filter === 'active' ? 'active-filter' : ''}`}
                            onClick={() => setFilter('active')}
                        >Active</button>
                        <button
                            className={`footerButton ${filter === 'completed' ? 'active-filter' : ''}`}
                            onClick={() => setFilter('completed')}
                        >Completed</button>
                    </div>
                    <button className="footerButton" onClick={() => setTasks(tasks.filter(task => !task.isCompleted))}>Clear Completed</button>
                </div>
            </div>
        </div>
    );
}