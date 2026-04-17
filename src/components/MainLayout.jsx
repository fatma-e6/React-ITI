import { Outlet } from 'react-router'
import Navbar from './Navbar'
import useThemeStore from '../store/useThemeStore'

export default function MainLayout() {
  const { theme } = useThemeStore()

  document.documentElement.className = theme

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <Outlet />
      </main>
    </div>
  )
}