import React, { useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  BuyerUser,
  SellerUser,
  BuyerRequest,
  OrderConfirmation,
  ProductCategory,
} from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_BUYER_REQUESTS,
  DEMO_SELLER_USER,
} from './data/sampleProducts';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductMarketplace } from './components/ProductMarketplace';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { CheckoutModal } from './components/CheckoutModal';
import { BuyerAuthModal } from './components/BuyerAuthModal';
import { SellerAuthModal } from './components/SellerAuthModal';
import { SellerDashboard } from './components/SellerDashboard';
import { CampusCartAI } from './components/CampusCartAI';
import { HomepageSections } from './components/HomepageSections';

export default function App() {
  // Safe LocalStorage Initializers
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('campuscart_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('campuscart_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse cart from localStorage', e);
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('campuscart_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse wishlist from localStorage', e);
    }
    return [];
  });

  const [currentUser, setCurrentUser] = useState<BuyerUser | null>(() => {
    try {
      const saved = localStorage.getItem('campuscart_buyer_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse buyer from localStorage', e);
    }
    return null;
  });

  const [currentSeller, setCurrentSeller] = useState<SellerUser | null>(() => {
    try {
      const saved = localStorage.getItem('campuscart_seller_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse seller from localStorage', e);
    }
    return null;
  });

  const [buyerRequests, setBuyerRequests] = useState<BuyerRequest[]>(() => {
    try {
      const saved = localStorage.getItem('campuscart_buyer_requests');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse buyer requests from localStorage', e);
    }
    return INITIAL_BUYER_REQUESTS;
  });

  // Modal / Drawer visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [buyerAuthModal, setBuyerAuthModal] = useState<{
    isOpen: boolean;
    mode: 'login' | 'register';
  }>({ isOpen: false, mode: 'login' });
  const [isSellerAuthOpen, setIsSellerAuthOpen] = useState(false);
  const [isSellerDashboardOpen, setIsSellerDashboardOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Flash toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Synchronize non-sensitive data to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('campuscart_products', JSON.stringify(products));
    } catch (e) {
      console.warn(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('campuscart_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('campuscart_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('campuscart_buyer_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('campuscart_buyer_user');
      }
    } catch (e) {
      console.warn(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      if (currentSeller) {
        localStorage.setItem('campuscart_seller_user', JSON.stringify(currentSeller));
      } else {
        localStorage.removeItem('campuscart_seller_user');
      }
    } catch (e) {
      console.warn(e);
    }
  }, [currentSeller]);

  useEffect(() => {
    try {
      localStorage.setItem('campuscart_buyer_requests', JSON.stringify(buyerRequests));
    } catch (e) {
      console.warn(e);
    }
  }, [buyerRequests]);

  // Sets for quick lookups
  const wishlistIds = new Set(wishlist.map((p) => p.id));
  const cartIds = new Set(cart.map((item) => item.product.id));

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to cart.`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist.`);
        return prev.filter((p) => p.id !== product.id);
      }
      showToast(`Saved "${product.name}" to wishlist.`);
      return [...prev, product];
    });
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  // Buy Now direct flow
  const handleBuyNow = (product: Product) => {
    // Add to cart if not already
    setCart((prev) => {
      if (!prev.some((i) => i.product.id === product.id)) {
        return [...prev, { product, quantity: 1 }];
      }
      return prev;
    });
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Purchase Request Submission
  const handleSubmitPurchaseRequest = (
    productId: string,
    offerPrice: number,
    message: string
  ) => {
    const prod = products.find((p) => p.id === productId);
    const newReq: BuyerRequest = {
      id: `req-${Date.now()}`,
      productId,
      productName: prod ? prod.name : 'College Essential',
      buyerName: currentUser ? currentUser.name : 'Campus Student',
      buyerEmail: currentUser ? currentUser.email : 'student@campus.edu',
      buyerCollege: currentUser ? currentUser.college : 'Engineering Campus',
      offeredPrice: offerPrice,
      message,
      date: 'Today, Just now',
      status: 'pending',
    };
    setBuyerRequests((prev) => [newReq, ...prev]);
  };

  // Buyer Request status update (from seller dashboard)
  const handleUpdateBuyerRequestStatus = (
    requestId: string,
    newStatus: 'accepted' | 'declined'
  ) => {
    setBuyerRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
    );
  };

  // Seller Product Operations
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  // Order Placement
  const handleOrderPlaced = (order: OrderConfirmation) => {
    setCart([]);
    showToast(`Order #${order.orderNumber} placed! Pickup confirmed.`);
  };

  // Scroll Navigation Helpers
  const scrollToMarketplace = () => {
    const elem = document.getElementById('marketplace-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCategories = () => {
    const elem = document.getElementById('categories-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    const elem = document.getElementById('how-it-works-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSellerPortal = () => {
    if (currentSeller) {
      setIsSellerDashboardOpen(true);
    } else {
      setIsSellerAuthOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col font-sans selection:bg-[#FF6A00] selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#171717] border border-[#FF6A00]/50 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce-short">
          <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Navbar
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        currentUser={currentUser}
        currentSeller={currentSeller}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBuyerLogin={() => setBuyerAuthModal({ isOpen: true, mode: 'login' })}
        onOpenBuyerRegister={() => setBuyerAuthModal({ isOpen: true, mode: 'register' })}
        onOpenSellerPortal={handleOpenSellerPortal}
        onLogoutBuyer={() => {
          setCurrentUser(null);
          showToast('Logged out of buyer account.');
        }}
        onLogoutSeller={() => {
          setCurrentSeller(null);
          setIsSellerDashboardOpen(false);
          showToast('Logged out of seller account.');
        }}
        onScrollToMarketplace={scrollToMarketplace}
        onScrollToCategories={scrollToCategories}
        onScrollToHowItWorks={scrollToHowItWorks}
        onOpenAI={() => setIsAIAssistantOpen(true)}
        onSearchClick={scrollToMarketplace}
      />

      {/* Hero Section */}
      <Hero
        onExploreProducts={scrollToMarketplace}
        onStartSelling={handleOpenSellerPortal}
        onOpenAI={() => setIsAIAssistantOpen(true)}
      />

      {/* Product Marketplace (Filters, Search, Product Grid) */}
      <ProductMarketplace
        products={products}
        wishlistIds={wishlistIds}
        cartIds={cartIds}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onViewDetails={(prod) => setSelectedProduct(prod)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Additional Homepage Sections (How It Works, Why CampusCart, Exam Hub, Future Scope, Footer) */}
      <HomepageSections
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToMarketplace();
        }}
        onStartSelling={handleOpenSellerPortal}
        onExploreProducts={scrollToMarketplace}
        onOpenAI={() => setIsAIAssistantOpen(true)}
      />

      {/* Floating CampusCart AI Assistant */}
      <CampusCartAI
        isOpen={isAIAssistantOpen}
        onToggle={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
        products={products}
        onViewProductDetails={(prod) => {
          setSelectedProduct(prod);
          setIsAIAssistantOpen(false);
        }}
        onAddToCart={handleAddToCart}
      />

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        isInCart={selectedProduct ? cartIds.has(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onSubmitPurchaseRequest={handleSubmitPurchaseRequest}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onContinueShopping={() => setIsCartOpen(false)}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveToCart}
        onViewDetails={(prod) => setSelectedProduct(prod)}
      />

      {/* Demo Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onOrderPlaced={handleOrderPlaced}
        buyerName={currentUser?.name}
        buyerEmail={currentUser?.email}
      />

      {/* Buyer Auth Modal */}
      <BuyerAuthModal
        isOpen={buyerAuthModal.isOpen}
        initialMode={buyerAuthModal.mode}
        onClose={() => setBuyerAuthModal({ isOpen: false, mode: 'login' })}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Welcome back, ${user.name}!`);
        }}
      />

      {/* Seller Auth Modal */}
      <SellerAuthModal
        isOpen={isSellerAuthOpen}
        onClose={() => setIsSellerAuthOpen(false)}
        onSellerLoginSuccess={(seller) => {
          setCurrentSeller(seller);
          setIsSellerDashboardOpen(true);
          showToast(`Welcome to Seller Portal, ${seller.name}!`);
        }}
      />

      {/* Seller Dashboard */}
      {currentSeller && isSellerDashboardOpen && (
        <SellerDashboard
          seller={currentSeller}
          products={products}
          buyerRequests={buyerRequests}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onUpdateBuyerRequestStatus={handleUpdateBuyerRequestStatus}
          onLogout={() => {
            setCurrentSeller(null);
            setIsSellerDashboardOpen(false);
            showToast('Logged out of seller portal.');
          }}
          onClose={() => setIsSellerDashboardOpen(false)}
        />
      )}

    </div>
  );
}
