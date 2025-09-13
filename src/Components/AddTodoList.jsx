import React, { useState } from 'react'

const AddTodoList = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');
  

    const handleAddTask = (e) => {
      e.preventDefault();
      if (!task.trim()) return;
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    };
  
    const handleDelete = (id) => {
      setTasks(tasks.filter((task) => task.id !== id));
    };
  
    const handleToggle = (id) => {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    };
  
    const handleEdit = (id, text) => {
      setEditingId(id);
      setEditingText(text);
    };
  
    const handleSaveEdit = (id) => {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: editingText } : task
      ));
      setEditingId(null);
      setEditingText('');
    };

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Add a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add</button>
        </form>
        <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
            />
            
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => handleToggle(task.id)}>{task.text}</span>
                <div className="actions">
                  <button onClick={() => handleEdit(task.id, task.text)}>✏️</button>
                  <button onClick={() => handleDelete(task.id)}>❌</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
     
      </div>
  )
}

export default AddTodoList