"use client"

import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Wireless Bluetooth Headphones",
      price: 79.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Premium Coffee Beans",
      price: 24.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Minimalist Desk Lamp",
      price: 45.50,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150&h=150&fit=crop&crop=center"
    }
  ]);

  const [suggestions] = useState([
    {
      id: 4,
      title: "Organic Green Tea",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Ceramic Mug Set",
      price: 32.00,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "Notebook Collection",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 7,
      title: "Plant Pot Set",
      price: 28.50,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=150&h=150&fit=crop&crop=center"
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, 1);
    } else {
      setCartItems(items => [...items, { ...product, quantity: 1 }]);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const EmptyCart = () => (
    <div className="text-center py-16">
      <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 className="text-xl font-medium text-gray-600 mb-2">Your cart is empty</h3>
      <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Continue Shopping
      </button>
    </div>
  );

  const CartSummary = ({ className = "" }) => (
    <div className={`bg-gray-50 p-6 rounded-lg ${className}`}>
      <h3 className="font-medium text-lg mb-4">Order Summary</h3>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
        Proceed to Checkout
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <p className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
        </div>
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 mb-8 lg:mb-0">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                    <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Cart Summary */}
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <CartSummary />
            </div>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {cartItems.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-medium mb-6">You may also like</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {suggestions.map(item => (
              <div key={item.id} className="flex-shrink-0 w-48 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-medium text-sm mb-2 line-clamp-2">{item.title}</h4>
                <div className="flex items-center justify-between">
                  <span className="font-bold">${item.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Cart Summary - Sticky Bottom */}
      {cartItems.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <CartSummary />
        </div>
      )}

      {/* Mobile spacing to prevent overlap with sticky summary */}
      {cartItems.length > 0 && <div className="lg:hidden h-48"></div>}
    </div>
  );
}