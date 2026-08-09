import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

interface CartPageProps {
  navigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ navigate }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotalUSD, formatPrice, addToast } = useApp();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'crypto'>('card');
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', country: 'United States' });

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.email) {
      addToast('Please enter your name and email to receive digital downloads.', 'error');
      return;
    }
    setCheckoutStep('success');
    clearCart();
    addToast('Order completed successfully! Digital access links sent to your email.', 'success');
  };

  if (checkoutStep === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-[#F27D26]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">
          Payment Successful & Order Confirmed!
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Thank you for purchasing digital assets from BRANIFY Store. We have dispatched your instant download links and invoice receipt to <span className="text-white font-bold">{customerInfo.email}</span>.
        </p>
        <button
          onClick={() => navigate('/digital-products')}
          className="px-8 py-4 bg-[#F27D26] hover:bg-orange-500 text-black text-xs font-extrabold uppercase tracking-widest rounded-full shadow-lg"
        >
          Explore More Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-[10px] font-extrabold uppercase tracking-widest">
          <ShoppingBag className="w-3.5 h-3.5" />
          Shopping Cart & Checkout
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          {checkoutStep === 'cart' ? 'Your Shopping Cart' : 'Instant Checkout'}
        </h1>
      </div>

      {cart.length === 0 && checkoutStep === 'cart' ? (
        <div className="bg-[#080808] border border-white/10 rounded-2xl p-12 text-center space-y-4 max-w-xl mx-auto">
          <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
          <div className="text-sm font-bold text-white uppercase tracking-wider">Your cart is currently empty</div>
          <p className="text-xs text-zinc-500">Discover instant download AI prompts, Canva kits, and Notion workspaces in our store.</p>
          <button
            onClick={() => navigate('/digital-products')}
            className="px-6 py-3 bg-[#F27D26] text-black text-xs font-extrabold uppercase tracking-wider rounded-full"
          >
            Browse Digital Store
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {checkoutStep === 'cart' ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#080808] border border-white/10 rounded-2xl p-4 sm:p-6 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] font-extrabold text-[#F27D26] uppercase tracking-widest">{item.category}</div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">{item.title}</h3>
                    <div className="text-xs font-black text-white">{formatPrice(item.priceUSD)}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-zinc-950 border border-white/10 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-white px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-zinc-500 hover:text-rose-500 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <form onSubmit={handleProcessOrder} className="bg-[#080808] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                <h3 className="text-base font-black text-white uppercase tracking-tight">Customer Information</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="e.g. Alex Wright"
                      className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Email Address for Downloads *</label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-[#F27D26] text-black border-[#F27D26]'
                          : 'bg-zinc-950 text-zinc-400 border-white/10'
                      }`}
                    >
                      Credit Card / Stripe
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                        paymentMethod === 'bank'
                          ? 'bg-[#F27D26] text-black border-[#F27D26]'
                          : 'bg-zinc-950 text-zinc-400 border-white/10'
                      }`}
                    >
                      Bank Transfer
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('crypto')}
                      className={`p-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                        paymentMethod === 'crypto'
                          ? 'bg-[#F27D26] text-black border-[#F27D26]'
                          : 'bg-zinc-950 text-zinc-400 border-white/10'
                      }`}
                    >
                      USDT / Crypto
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#F27D26] hover:bg-orange-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-black" />
                  Pay & Download Instant Access ({formatPrice(cartTotalUSD)})
                </button>
              </form>
            )}
          </div>

          {/* Cart Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 space-y-6 sticky top-28 shadow-xl">
              <h3 className="text-xs font-black text-white uppercase tracking-widest">Order Summary</h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{formatPrice(cartTotalUSD)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Instant Digital Delivery</span>
                  <span className="font-bold text-emerald-400 uppercase">FREE</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between text-sm font-black text-white">
                  <span>Total Due</span>
                  <span className="text-[#F27D26]">{formatPrice(cartTotalUSD)}</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-4 bg-[#F27D26] hover:bg-orange-500 text-black text-xs font-extrabold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full py-3 bg-zinc-900 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10"
                >
                  ← Edit Cart Items
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
