import { Link } from 'react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'

function ProductCard({ id, title, price, category, thumbnail, stock }) {
  const dispatch = useDispatch()

  function handleAddToCart() {
    dispatch(addToCart({ id, title, price, category, thumbnail, stock }))
  }

  return (
    <Card className="bg-card border border-border hover:border-yellow-600/50 hover:shadow-xl hover:shadow-yellow-900/10 transition-all duration-300 overflow-hidden">
      <div className="h-1 w-full bg-yellow-600/40"></div>
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="relative bg-muted rounded-lg h-40 flex items-center justify-center overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="h-full object-contain hover:scale-105 transition-transform"
          />
          {stock === 0 ? (
            <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-red-600 text-white font-bold uppercase">
              Out of Stock
            </span>
          ) : (
            <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-green-600 text-white font-bold uppercase">
              In Stock
            </span>
          )}
        </div>

        <span className="text-[10px] px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 w-fit font-bold uppercase tracking-tighter">
          {category}
        </span>

        <h3 className="font-semibold text-card-foreground text-sm line-clamp-1">{title}</h3>
        <p className="text-yellow-500 font-bold">${price}</p>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <Link to={`/product/${id}`}>
            <Button variant="outline" className="w-full text-xs h-8">
              Details
            </Button>
          </Link>
          
          <Button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold text-xs h-8"
          >
            Buy
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard