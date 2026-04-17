import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="text-center py-12">
      <div className="bg-zinc-900 border border-yellow-900/30 rounded-2xl p-8 max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
        <p className="text-zinc-400 mb-6">Page not found.</p>
        <Button
            onClick={() => navigate('/')}
            className="bg-yellow-600 hover:bg-yellow-500 text-black font-semibold"
        >
            ← Back to Home
        </Button>
      </div>
    </div>
  )
}

export default NotFound