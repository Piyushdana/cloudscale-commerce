'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('All')
  const [categories, setCategories] = useState(['All'])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
        const data = await res.json()
        setProducts(data.data)
        setFiltered(data.data)
        const cats = ['All', ...new Set(data.data.map(p => p.category))]
        setCategories(cats)
      } catch (err) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filterByCategory = (cat) => {
    setCategory(cat)
    setFiltered(cat === 'All' ? products : products.filter(p => p.category === cat))
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading store...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-3">
        <p className="text-red-400 text-lg">{error}</p>
        <p className="text-gray-600 text-sm">Make sure the backend is running</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
      {/* hero */}
      <div className="mb-16 text-center space-y-4 fade-in">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-4">
          <div className="w-2 h-2 bg-blue-400 rounded-full pulse-dot" />
          <span className="text-blue-400 text-sm">Production grade infrastructure</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
          CloudScale
          <span className="text-blue-500"> Commerce</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
          A cloud-native e-commerce platform demonstrating production DevOps practices — 
          Kubernetes, GitOps, observability, and automated deployments.
        </p>
      </div>

      {/* category filter */}
      <div className="flex gap-2 flex-wrap mb-10 justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => filterByCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              category === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* stats bar at bottom */}
      <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Uptime', value: '99.9%' },
          { label: 'Deployments', value: '48' },
          { label: 'Containers', value: '4' },
          { label: 'Avg Response', value: '120ms' },
        ].map(stat => (
          <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-white font-bold text-2xl">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}