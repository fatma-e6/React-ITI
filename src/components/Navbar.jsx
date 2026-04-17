import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import useThemeStore from '../store/useThemeStore'
import { useLanguage } from '../context/LanguageContext'

function Navbar() {
  const { theme, toggleTheme } = useThemeStore()
  const cartCount = useSelector((state) => state.cart.cartItems.length)
  const { language, toggleLanguage } = useLanguage()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-yellow-500 font-bold text-xl tracking-tight">🛒 FE.Shop</span>
        <div className="flex gap-6 items-center">
          <span className="text-yellow-500 text-sm font-medium">
            {language === 'en' ? 'Welcome' : 'مرحباً'}
          </span>
          <Link to="/" className="text-foreground hover:text-yellow-400 transition-colors text-sm font-medium">
            Home
          </Link>
          <Link to="/cart" className="text-foreground hover:text-yellow-400 transition-colors text-sm font-medium flex items-center gap-1">
            Cart
            {cartCount > 0 && (
              <span className="bg-yellow-500 text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/users" className="text-foreground hover:text-yellow-400 transition-colors text-sm font-medium">
            Users
          </Link>
          <Link to="/register" className="text-foreground hover:text-yellow-400 transition-colors text-sm font-medium">
            Register
          </Link>
          <button
            onClick={toggleLanguage}
            className="text-foreground hover:text-yellow-400 transition-colors text-sm font-medium border border-border px-3 py-1 rounded"
          >
            {language === 'en' ? '🌐 AR' : '🌐 EN'}
          </button>
          <button
            onClick={toggleTheme}
            className="text-foreground hover:text-yellow-400 transition-colors text-sm font-medium border border-border px-3 py-1 rounded"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar