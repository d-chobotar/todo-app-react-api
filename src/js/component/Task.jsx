import React, { useState } from "react";

export const Task = ({remove, markComplete, taskObj, val, index}) => {
    
    return (
        <div className="task">
            <div onClick={() => markComplete(index)} className="checkMark">
                <i className={`${taskObj.isCompleted ? 'fas fa-check-circle completed' : 'fas fa-circle unchecked'}`}></i>
            </div>
            <div className="inputBox">
                <input readOnly className={`${taskObj.isCompleted ? 'strike' : ''}`} type="text" value={val} />
            </div>
            <div className="trashCan">
                <i onClick={() => remove(index)} className="fas fa-trash"></i>
            </div>
        </div>
    );
}