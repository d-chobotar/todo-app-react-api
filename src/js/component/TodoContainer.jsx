import React, { useState } from "react";
import { Task } from "./Task";

export const TodoContainer = () => {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');

    const handleTaskInput = (event) => {
        if (event.key === 'Enter') {
            if (input.trim() !== '') {
                event.preventDefault();
                const newTask = { isCompleted: false, val: input };
                setTasks(prevTasks => [...prevTasks, newTask]);
                setInput('');
            } else {
                setInput('Enter the task in order to add it.');
            }
        }
    }

    const addTask = () => {
        if (input.trim() !== '') {
            const newTask = { isCompleted: false, val: input };
            setTasks(prevTasks => [...prevTasks, newTask]);
            setInput('');
        }
    }

    const clickTrashHandler = (index) => {
        setTasks(prevTasks => prevTasks.filter((_, idx) => idx !== index))
    }

    const completeHandler = (index) => {
        setTasks(prevTasks =>
                prevTasks.map((task, idx) => {
                    if(idx === index){
                        console.log("Toggling completion for task:", task);
                        return {...task, isCompleted: !task.isCompleted};
                    }
                    return task;
                }
            )
        );
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

    const showAllHandler = () => {
        setTasks(prevTasks => [...prevTasks]);
    }

    const showActiveHandler = () => {
        setTasks(prevTasks => prevTasks.filter((task) => !task.isCompleted));
    }

    const showCompletedHandler = () => {
        setTasks(prevTasks => prevTasks.filter((task) => task.isCompleted));
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
                    {filteredTasks().map((task, idx) => (
                        <li key={idx}>
                            <Task
                                remove={clickTrashHandler}
                                markComplete={completeHandler}
                                taskObj={task}
                                index={idx}
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