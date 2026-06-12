'use client'

import { useState, useEffect } from 'react'

export default function Cart() {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState([])

  const loadCart = () => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(stored)
  }

  useEffect(() => {
    loadCart()
    const handleToggle = () => setOpen(prev => !prev)
    const handleUpdate = () => loadCart()
    window.addEventListener('toggleCart', handleToggle)
    window.addEventListener('cartUpdated', handleUpdate)
    return () => {
      window.removeEventListener('toggleCart', handleToggle)
      window.removeEventListener('cartUpdated', handleUpdate)
    }
  }, [])

  const updateQuantity = (id, delta) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0)
    localStorage.setItem('cart', JSON.stringify(updated))
    setCart(updated)
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)

  return (
    <>
      {/* overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* cart drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[#111] border-l border-white/10 z-50 flex flex-col transition-transform duration-300 ${
        open ? 'translate-x-0 slide-in' : 'translate-x-full'
      }`}>
        {/* header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-white font-semibold text-lg">Your Cart</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-4 border border-white/10">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.name}</p>
                  <p className="text-blue-400 text-sm font-bold mt-1">
                    ${parseFloat(item.price).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-sm transition-colors"
                    >
                      -
                    </button>
                    <span className="text-white text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-sm transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total</span>
              <span className="text-white font-bold text-xl">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors duration-200">
              Checkout (Demo)
            </button>
            <p className="text-center text-gray-600 text-xs">
              This is a demo store — no real payments
            </p>
          </div>
        )}
      </div>
    </>
  )
}