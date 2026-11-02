import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, VehicleColor } from './types';
import { Navbar } from './components/Navbar';
import { TestRideModal } from './components/TestRideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { VehicleDetailPage } from './components/VehicleDetailPage';
import { VideoReviewsSection } from './components/VideoReviewsSection';
import { FeedbackAndFAQ } from './components/FeedbackAndFAQ';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';
import { ZaloFloatingButton } from './components/ZaloFloatingButton';

// Find the X3 product
const X3_PRODUCT = PRODUCTS.find(p => p.id === 'gofold-x3') || PRODUCTS[0];

export default function App() {
  // Use only X3
  const [product] = useState<Product>(X3_PRODUCT);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gofold_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gofold_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTestRideOpen, setIsTestRideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Checkout state
  const [directCheckoutProduct, setDirectCheckoutProduct] = useState<Product | null>(null);
  const [directCheckoutQuantity, setDirectCheckoutQuantity] = useState(1);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, selectedColor?: VehicleColor, quantity: number = 1) => {
    const color = selectedColor || product.colors[0] || { name: 'Tiêu chuẩn', code: 'std', hex: '#18181b' };
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.code === color.code
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, { product, selectedColor: color, quantity }];
      }
    });
    showToast(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  const handleDirectBuy = (product: Product, _selectedColor?: VehicleColor, quantity: number = 1) => {
    setDirectCheckoutProduct(product);
    setDirectCheckoutQuantity(quantity);
    setCheckoutDiscount(0);
    setCheckoutPromoCode('');
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, colorCode: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor.code === colorCode
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, colorCode: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor.code === colorCode)
      )
    );
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const cartTotalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#00a3ff] selection:text-black">
      {/* Top Banner Notice */}
      <div className="border-b border-neutral-900 bg-neutral-950 px-3 py-1.5 text-center text-xs text-neutral-400">
        <span className="text-[#00a3ff] font-bold mr-2">GOFOLD VIETNAM:</span>
        Xe điện gấp thông minh X3 chính hãng · Hotline: <strong className="font-mono text-white font-bold">094.222.3434</strong>
      </div>

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => {}}
        onOpenTestRide={() => setIsTestRideOpen(true)}
        onNavigateSection={() => {}}
      />

      {/* Main Content Area - Just X3 */}
      <main className="flex-1 bg-black">
        <VehicleDetailPage
          product={product}
          allProducts={[product]}
          onBackToLobby={() => {}}
          onSelectOtherProduct={() => {}}
          onAddToCart={(prod, col, qty) => handleDirectBuy(prod, col, qty)}
          onBookTestRide={() => setIsTestRideOpen(true)}
        />
        <VideoReviewsSection />
        <FeedbackAndFAQ />
      </main>

      {/* Corporate & Support Footer */}
      <Footer
        onNavigateSection={() => {}}
        onOpenTestRide={() => setIsTestRideOpen(true)}
      />
      <ZaloFloatingButton />

      {/* Toast Notification Container */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-4 z-50 flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/95 px-4 py-3 text-xs font-medium text-white shadow-2xl backdrop-blur-md"
        >
          <Check className="h-4 w-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </aside>
      )}

      {/* Modals & Slide-Overs */}
      <TestRideModal
        isOpen={isTestRideOpen}
        onClose={() => setIsTestRideOpen(false)}
        products={[product]}
        initialVehicleId={product.id}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={(discount, promo) => {
          setCheckoutDiscount(discount);
          setCheckoutPromoCode(promo);
          setDirectCheckoutProduct(null);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setDirectCheckoutProduct(null);
        }}
        items={cartItems}
        directProduct={directCheckoutProduct}
        directQuantity={directCheckoutQuantity}
        allProducts={[product]}
        discount={checkoutDiscount}
        promoCode={checkoutPromoCode}
        onOrderSuccess={() => {
          setCartItems([]);
          setDirectCheckoutProduct(null);
        }}
      />
    </div>
  );
}
