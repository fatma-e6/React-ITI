import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import ProductCard from '../components/ProductCard'
import { Button } from '@/components/ui/button'

function ProductsList() {
  const [products, setProducts] = useState([])
  const [allCategories, setAllCategories] = useState([]) 
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category')
  const [skip, setSkip] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setAllCategories(data))
  }, []);

  useEffect(() => {
    setLoading(true)
    const baseUrl = category 
      ? `https://dummyjson.com/products/category/${category}`
      : `https://dummyjson.com/products`;
    
    fetch(`${baseUrl}?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products)
        setLoading(false)
      })
  }, [skip, category])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-yellow-500 mb-6">
        {category ? `Category: ${category}` : 'All Products'}
      </h1>

      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          onClick={() => { setSearchParams({}); setSkip(0); }}
          className={`text-xs ${!category ? 'bg-yellow-600 text-black' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          All
        </Button>
        {allCategories.map((cat) => {
          const catName = typeof cat === 'object' ? cat.name : cat;
          const catSlug = typeof cat === 'object' ? cat.slug : cat;
          return (
            <Button
              key={catSlug}
              onClick={() => { setSearchParams({ category: catSlug }); setSkip(0); }}
              className={`text-xs ${category === catSlug ? 'bg-yellow-600 text-black' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
              {catName}
            </Button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-12">
        <Button disabled={skip === 0} onClick={() => setSkip(prev => prev - limit)} className="bg-muted text-muted-foreground">
          Previous
        </Button>
        <span className="text-muted-foreground self-center">Page {(skip / limit) + 1}</span>
        <Button onClick={() => setSkip(prev => prev + limit)} className="bg-muted text-yellow-500">
          Next
        </Button>
      </div>
    </div>
  )
}

export default ProductsList;