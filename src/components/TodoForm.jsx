import { useState } from 'react';

function TodoForm({ setTodos }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTodos(prevTodos => [...prevTodos, newTodo]);
    
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
  };

  return (
    <div className="card bg-base-200 mb-6">
      <div className="card-body p-6">
        <h2 className="card-title mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Task Title</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter task title" 
                  className="input input-bordered w-full" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Due Date</span>
                </label>
                <input 
                  type="date" 
                  className="input input-bordered w-full" 
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Priority</span>
                </label>
                <select 
                  className="select select-bordered w-full" 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="form-control h-full">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea 
                className="textarea textarea-bordered h-[calc(100%-2rem)]" 
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full md:w-auto md:float-right">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm; 