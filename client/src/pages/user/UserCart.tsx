/**
 * UserCart - Shopping cart for products and booked services
 */
import UserAppLayout from "@/components/UserAppLayout";
import { Minus, Plus, Trash2, Tag, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const initialItems = [
  {
    id: 1,
    name: "Argan Oil Hair Serum",
    brand: "OGX",
    price: 14.99,
    qty: 2,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&q=80",
  },
  {
    id: 2,
    name: "Vitamin C Face Serum",
    brand: "TruSkin",
    price: 19.99,
    qty: 1,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&q=80",
  },
];

export default function UserCart() {
  const [items, setItems] = useState(initialItems);
  const [coupon, setCoupon] = useState("");

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  return (
    <UserAppLayout title="My Cart" showBack>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
          <h3 className="text-base font-semibold text-gray-700">Your cart is empty</h3>
          <p className="text-sm text-gray-400 mt-1 text-center">Add products from the shop to get started</p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="px-4 pt-4 flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3 shadow-sm">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-gray-900 truncate">{item.name}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.brand}</p>
                  <p className="text-sm font-bold text-teal-600 mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1">
                    <button onClick={() => updateQty(item.id, -1)} className="text-gray-500 hover:text-teal-600 transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold text-gray-800 w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="text-gray-500 hover:text-teal-600 transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <div className="mx-4 mt-4 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
              <Tag className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
            <button
              onClick={() => toast.success("Coupon applied!")}
              className="bg-teal-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-teal-700 transition-colors"
            >
              Apply
            </button>
          </div>

          {/* Order Summary */}
          <div className="mx-4 mt-4 bg-gray-50 rounded-xl p-3 space-y-2">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Order Summary</h4>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-bold text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="px-4 mt-4 mb-6">
            <button
              onClick={() => toast.success("Order placed successfully!")}
              className="w-full bg-teal-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </UserAppLayout>
  );
}
