import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, addToCart, decreaseQuantity } from '../store/cartSlice'
import { Button } from "@/components/ui/button"

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-yellow-500 mb-8 font-heading">🛒 Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-16 text-center shadow-2xl">
          <p className="text-muted-foreground text-xl mb-6">Your cart is currently empty.</p>
          <p className="text-muted-foreground text-sm">Start browsing our products to add items here!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col md:flex-row items-center gap-6 bg-card p-6 rounded-2xl border border-border hover:border-yellow-600/30 transition-all shadow-lg"
            >
              <div className="w-24 h-24 bg-muted rounded-xl p-2 flex-shrink-0">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-card-foreground font-semibold text-lg line-clamp-1">{item.title}</h3>
                <p className="text-yellow-500 font-bold text-xl mt-1">${item.price}</p>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="w-8 h-8 rounded-full border border-border text-card-foreground hover:border-yellow-500 hover:text-yellow-500 transition-colors font-bold"
                >
                  −
                </button>
                <span className="text-card-foreground font-bold text-lg w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="w-8 h-8 rounded-full border border-border text-card-foreground hover:border-yellow-500 hover:text-yellow-500 transition-colors font-bold"
                >
                  +
                </button>
              </div>

              <Button 
                variant="destructive" 
                onClick={() => dispatch(removeFromCart(item.id))}
                className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-colors px-6"
              >
                Remove
              </Button>
            </div>
          ))}

          <div className="mt-8 p-6 bg-card rounded-2xl border-t-4 border-yellow-600 shadow-xl flex justify-between items-center">
            <span className="text-muted-foreground text-lg">Total Items: <span className="text-card-foreground font-bold">{totalItems}</span></span>
            <Button className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold px-10">
              Checkout Now
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart