'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProductCard({ product, index }) {
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const addToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setAdding(true)

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(i => i.id === product.id)

    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new CustomEvent('cartUpdated'))

    setTimeout(() => {
      setAdding(false)
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    }, 500)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className="card-hover fade-in bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer group"
        style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}
      >
        {/* product image */}
        <div className="relative h-52 overflow-hidden bg-white/5">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* category badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20">
              {product.category}
            </span>
          </div>

          {/* stock badge */}
          {product.stock < 20 && (
            <div className="absolute top-3 right-3">
              <span className="bg-red-500/80 text-white text-xs px-2 py-1 rounded-full">
                Low stock
              </span>
            </div>
          )}
        </div>

        {/* product info */}
        <div className="p-5">
          <h3 className="text-white font-semibold text-base mb-1 truncate">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-xl">
              ${parseFloat(product.price).toFixed(2)}
            </span>

            <button
              onClick={addToCart}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                added
                  ? 'bg-green-500 text-white scale-95'
                  : adding
                  ? 'bg-blue-400 text-white scale-95'
                  : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105'
              }`}
            >
              {added ? '✓ Added' : adding ? 'Adding...' : 'Add to cart'}
            </button>
          </div>

          {/* stock count */}
          <div className="mt-3 flex items-center gap-1">
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
              />
            </div>
            <span className="text-gray-500 text-xs">{product.stock} left</span>
          </div>
        </div>
      </div>
    </Link>
  )
}