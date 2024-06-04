import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { TodoContainer } from './TodoContainer';

export const ContainerComponent = () => {
    return(
        <div className='container'>
            <div className='background upperColor'/>
            <div className='background lowerColor'/>
            <div className='content'>
                <ThemeToggle />
                <TodoContainer />
            </div>
        </div>
    );
}