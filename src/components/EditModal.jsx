import { useState, useEffect } from 'react';

function EditModal({ todo, onClose, onUpdate }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [dueDate, setDueDate] = useState(todo.dueDate || '');
  const [priority, setPriority] = useState(todo.priority || 'medium');

  useEffect(() => {
    
    document.body.classList.add('modal-open');
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    const updatedTodo = {
      ...todo,
      title,
      description,
      dueDate,
      priority,
    };
    
    onUpdate(updatedTodo);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="card bg-base-100 w-full max-w-3xl">
        <div className="card-body p-6">
          <h2 className="card-title mb-4">Edit Task</h2>
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
            
            <div className="form-control mt-6 flex flex-col sm:flex-row justify-end gap-2">
              <button 
                type="button" 
                className="btn btn-ghost w-full sm:w-auto" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary w-full sm:w-auto"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal; 