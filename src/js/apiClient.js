const API_BASE_URL = 'https://playground.4geeks.com'

const createUser = async (username) => {
    console.log('Creating new user as ', username)
    try{
        const response = await fetch(`${API_BASE_URL}/todo/users/${username}`, {
            method: 'POST'
        });
        const data = await response.json();
        return {
            status: response.status,
            data: data
        }
    } catch (error) {
        console.error('Creating user error:', error);
        throw error;
    }
}


const fetchTasks = async (username) => {
    console.log('Fetching Tasks...')
    try {
        const response = await fetch(`${API_BASE_URL}/todo/users/${username}`);
        if (!response.ok) {
            console.log('Status was not ok')
            if (response.status === 404) {
                return { status: 404, data: { todos: [] } };
            }
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return {status: response.status, data}
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

const createTask = async (username, task) => {
    console.log('Creating new task as ', task)
    try {
        const response = await fetch(`${API_BASE_URL}/todo/todos/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        const data = await response.json();
        return {
            status: response.status,
            data: data
        }
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

const updateTask = async (taskId, task) => {
    console.log('Updating existing task', task)
    try {
        const response = await fetch(`${API_BASE_URL}/todo/todos/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        const data = await response.json();
        return {
            status: response.status,
            data: data
        }
    } catch (error) {
        console.error('Error while updating task', error);
        throw error;
    }
}

const deleteTask = async (taskId) => {
    console.log('Deleting existing task', taskId)
    try {
        const response = await fetch(`${API_BASE_URL}/todo/todos/${taskId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete the task.')
        }
        return {
            status: response.status,
        }
    } catch (error) {
        console.log('Error deleteing task', error);
        throw error;
    }
}

export { fetchTasks, createTask, deleteTask, updateTask, createUser };







