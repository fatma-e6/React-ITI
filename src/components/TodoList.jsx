import TodoItem from './TodoItem'

function TodoList({ tasks, deleteTask, toggleTask }) {
  return (
    <div className="bg-zinc-900 border border-yellow-900/30 rounded-2xl p-4 min-h-32">
      {tasks.length === 0 ? (
        <p className="text-center text-zinc-500 py-8">Let's get some work done!</p>
      ) : (
        tasks.map((task) => (
          <TodoItem key={task.id} task={task} deleteTask={deleteTask} toggleTask={toggleTask} />
        ))
      )}
    </div>
  )
}

export default TodoList