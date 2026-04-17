import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function TodoForm({ addTask }) {
  const [taskText, setTaskText] = useState('')

  function handleAdd() {
    if (taskText.trim() === '') return
    addTask(taskText)
    setTaskText('')
  }

  return (
    <div className="bg-zinc-900 border border-yellow-900/30 p-6 rounded-2xl mb-4">
      <h2 className="text-yellow-500 text-right text-2xl font-bold mb-4 tracking-tight">To-Do App!</h2>
      <p className="text-yellow-700 text-sm mb-3 font-medium">Add New To-Do</p>
      <Input
        placeholder="Enter new task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="mb-3 bg-zinc-800 border-yellow-900/40 text-yellow-100 placeholder:text-zinc-500"
      />
      <div className="flex justify-end">
        <Button onClick={handleAdd} className="bg-yellow-600 hover:bg-yellow-500 text-black font-semibold px-6">
          Add
        </Button>
      </div>
    </div>
  )
}

export default TodoForm