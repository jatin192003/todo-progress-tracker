import { useState } from 'react';
import TodoItem from './TodoItem';
import EditModal from './EditModal';

function TodoList({ todos, setTodos, sortBy }) {
  const [editingTodo, setEditingTodo] = useState(null);

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
  };

  const closeEditModal = () => {
    setEditingTodo(null);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
    closeEditModal();
  };

  // Sort todos based on sortBy value
  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === 'date') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === 'priority') {
      const priorityValues = { high: 3, medium: 2, low: 1 };
      return priorityValues[b.priority] - priorityValues[a.priority];
    } else if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
      
      {sortedTodos.length === 0 ? (
        <div className="alert">
          <div>
            <span>You don't have any tasks yet. Add one above!</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onDelete={deleteTodo}
              onToggleComplete={toggleComplete}
              onEdit={openEditModal}
            />
          ))}
        </div>
      )}
      
      {editingTodo && (
        <EditModal 
          todo={editingTodo} 
          onClose={closeEditModal} 
          onUpdate={updateTodo} 
        />
      )}
    </div>
  );
}

export default TodoList; 