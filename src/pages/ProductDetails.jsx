import { useParams, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { Button } from '@/components/ui/button'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-yellow-500 text-xl animate-pulse">Loading...</p>
    </div>
  )

  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-400 text-xl mb-4">{error}</p>
      <Button onClick={() => navigate('/')} className="bg-yellow-600 text-black">
        ← Back
      </Button>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full rounded-xl object-cover"
          />

          <div className="flex flex-col gap-4">
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 w-fit">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-card-foreground">{product.title}</h1>
            <p className="text-muted-foreground text-sm">{product.description}</p>
            <p className="text-3xl font-bold text-yellow-500">${product.price}</p>

            {product.stock === 0 ? (
              <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 w-fit">
                Out of Stock
              </span>
            ) : (
              <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 w-fit">
                In Stock — {product.stock} left
              </span>
            )}

            <div className="flex gap-3 mt-4">
              <Button
                disabled={product.stock === 0}
                onClick={() => dispatch(addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  category: product.category,
                  thumbnail: product.thumbnail,
                  stock: product.stock,
                }))}
                className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold"
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                ← Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails