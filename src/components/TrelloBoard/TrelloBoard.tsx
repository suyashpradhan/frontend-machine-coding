import React, {useState} from 'react';

// Initial TrelloBoard component for the user to extend
export const TrelloBoard = () => {
    // State to manage tasks and categories
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskCategory, setTaskCategory] = useState('');

    // Add a new task (Complete this function)
    const addTask = () => {
        // Placeholder: Add task logic
    };

    // Delete a task (Complete this function)
    const deleteTask = (id: any) => {
        // Placeholder: Delete task logic
    };

    // Start editing a task (Complete this function)
    const startEditing = (task: any) => {
        // Placeholder: Start editing task logic
    };

    // Save edited task (Complete this function)
    const saveEdit = () => {
        // Placeholder: Save edited task logic
    };

    // Change task category (Complete this function)
    const changeCategory = (taskId: any, newCategory: any) => {
        // Placeholder: Change category logic
    };

    // Group tasks by category (Complete this function)
    // const categories = [...new Set(tasks.map((task: any) => task.category))];

    return (
        <div>
            <h1>Trello-like Task Board</h1>

            {/* Add Task Form */}
            <div style={styles.form}>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Task name"
                    style={styles.input}
                />
                <input
                    type="text"
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value)}
                    placeholder="Task category"
                    style={styles.input}
                />
                <button onClick={addTask} style={styles.button}>Add Task</button>
            </div>

            {/* Display Tasks by Category */}

        </div>
    );
};

// Placeholder styles for the application
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
    },
    form: {
        marginBottom: '20px',
    },
    input: {
        padding: '8px',
        margin: '5px',
        fontSize: '16px',
        width: '200px',
    },
    button: {
        padding: '8px 16px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    category: {
        marginTop: '20px',
    },
    taskList: {
        listStyle: 'none',
        padding: 0,
    },
    taskItem: {
        marginBottom: '10px',
        textAlign: 'left',
    },
};

