import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import ProgressTracker from './components/ProgressTracker';
import Header from './components/Header';

function App() {
  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState('date'); 
  
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-4">
      <div className="container mx-auto max-w-4xl">
        <Header />
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <ProgressTracker todos={todos} />
            <TodoForm setTodos={setTodos} />
            <div className="flex justify-end mb-4">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-sm m-1">
                  Sort by: {sortBy === 'date' ? 'Due Date' : sortBy === 'priority' ? 'Priority' : 'Name'}
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a onClick={() => setSortBy('date')}>Due Date</a></li>
                  <li><a onClick={() => setSortBy('priority')}>Priority</a></li>
                  <li><a onClick={() => setSortBy('name')}>Name</a></li>
                </ul>
              </div>
            </div>
            <TodoList todos={todos} setTodos={setTodos} sortBy={sortBy} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
