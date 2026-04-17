import { Button } from '@/components/ui/button'

function TodoItem({ task, deleteTask, toggleTask }) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-yellow-900/20 last:border-0">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-4 h-4 cursor-pointer accent-yellow-500"
        />
        <span className={task.completed ? 'line-through text-zinc-600' : 'text-yellow-100'}>
          {task.text}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => deleteTask(task.id)}
        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
      >
        Delete
      </Button>
    </div>
  )
}

export default TodoItem