'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`)
        const data = await res.json()
        setProduct(data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(i => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      cart.push({ ...product, quantity })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new CustomEvent('cartUpdated'))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!product) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400">Product not found</p>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to store
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 fade-in">
        {/* image */}
        <div className="relative h-96 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">
              {product.category}
            </span>
          </div>
        </div>

        {/* details */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-3">{product.name}</h1>
            <p className="text-gray-400 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">
              ${parseFloat(product.price).toFixed(2)}
            </span>
            <span className="text-gray-500 text-sm">USD</span>
          </div>

          {/* stock */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Stock available</span>
              <span className="text-white">{product.stock} units</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* quantity */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Quantity</span>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="text-gray-400 hover:text-white transition-colors"
              >
                -
              </button>
              <span className="text-white w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="text-gray-400 hover:text-white transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* add to cart */}
          <button
            onClick={addToCart}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
              added
                ? 'bg-green-500 scale-95'
                : 'bg-blue-600 hover:bg-blue-500 hover:scale-105'
            }`}
          >
            {added ? '✓ Added to cart' : 'Add to cart'}
          </button>

          {/* demo notice */}
          <p className="text-center text-gray-600 text-xs">
            Demo store — no real transactions processed
          </p>
        </div>
      </div>
    </div>
  )
}