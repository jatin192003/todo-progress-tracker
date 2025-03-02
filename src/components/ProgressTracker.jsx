function ProgressTracker({ todos }) {
  // Calculate statistics
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <div className="card bg-primary text-primary-content mb-6">
      <div className="card-body">
        <h2 className="card-title">Progress Tracker</h2>
        
        <div className="mt-2">
          <div className="flex justify-between mb-1">
            <span>Completion Rate: {completionRate}%</span>
            <span>{completedTasks}/{totalTasks} tasks</span>
          </div>
          <progress 
            className="progress progress-accent w-full" 
            value={completionRate} 
            max="100"
          ></progress>
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker; 