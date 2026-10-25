import React, { useState } from 'react';
import {
  Store,
  LayoutDashboard,
  Package,
  PlusCircle,
  MessageSquare,
  User,
  LogOut,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  Upload,
  Image as ImageIcon,
  AlertTriangle,
  X,
  TrendingUp,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Product, SellerUser, BuyerRequest, ProductCategory, ProductCondition } from '../types';
import { CATEGORIES, IMG_TEXTBOOKS } from '../data/sampleProducts';

interface SellerDashboardProps {
  seller: SellerUser;
  products: Product[];
  buyerRequests: BuyerRequest[];
  onAddProduct: (newProduct: Product) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateBuyerRequestStatus: (requestId: string, newStatus: 'accepted' | 'declined') => void;
  onLogout: () => void;
  onClose: () => void;
}

type DashboardSection = 'overview' | 'my-products' | 'add-product' | 'buyer-requests' | 'profile';

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  seller,
  products,
  buyerRequests,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateBuyerRequestStatus,
  onLogout,
  onClose,
}) => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [notification, setNotification] = useState<string | null>(null);

  // Add Product Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Textbooks');
  const [condition, setCondition] = useState<ProductCondition>('Good Condition');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [college, setCollege] = useState(seller.college);
  const [city, setCity] = useState(seller.city);
  const [description, setDescription] = useState('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([IMG_TEXTBOOKS]);
  const [formError, setFormError] = useState<string | null>(null);

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Filter seller's products (either created by this seller or sample ones)
  const sellerProducts = products.filter(
    (p) => p.sellerEmail === seller.email || p.sellerName === seller.name || p.id.startsWith('prod-0')
  );

  const activeListingsCount = sellerProducts.filter((p) => p.status === 'active').length;
  const mockEstimatedSales = sellerProducts.reduce(
    (acc, p) => acc + (p.status === 'sold' ? p.price * p.quantity : Math.round(p.price * 0.4)),
    850
  );

  const showNotificationBanner = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Image Upload Handler (Safe client-side preview via FileReader)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (imagePreviews.length + files.length > 5) {
      setFormError('Maximum 5 images allowed per product listing.');
      return;
    }

    const newPreviews: string[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setFormError('Only image files (JPEG, PNG, WebP) are supported.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFormError('Each image must be under 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreviews((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImagePreview = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Submit Add Product Form
  const handlePublishProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Product Name is required.');
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setFormError('Please enter a valid selling price greater than 0.');
      return;
    }
    if (!description.trim() || description.length < 10) {
      setFormError('Please enter a description of at least 10 characters.');
      return;
    }

    const newProduct: Product = {
      id: `prod-custom-${Date.now()}`,
      name: name.trim(),
      category,
      condition,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      quantity: Number(quantity) || 1,
      college: college.trim() || seller.college,
      city: city.trim() || seller.city,
      description: description.trim(),
      sellerName: seller.name,
      sellerEmail: seller.email,
      primaryImage: imagePreviews[0] || IMG_TEXTBOOKS,
      images: imagePreviews.length > 0 ? imagePreviews : [IMG_TEXTBOOKS],
      isRecentlyListed: true,
      isBudgetFriendly: Number(price) <= 200,
      dateListed: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    onAddProduct(newProduct);
    showNotificationBanner(`Product "${newProduct.name}" published to CampusCart marketplace!`);

    // Reset form
    setName('');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setQuantity('1');
    setImagePreviews([IMG_TEXTBOOKS]);
    setActiveSection('my-products');
  };

  // Handle Edit Product Save
  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    onUpdateProduct(editingProduct);
    setEditingProduct(null);
    showNotificationBanner(`Listing for "${editingProduct.name}" updated successfully.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-6xl bg-[#171717] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#0B0B0B] border-r border-[#2A2A2A] flex flex-col justify-between shrink-0">
          <div>
            {/* Seller Info Header */}
            <div className="p-5 border-b border-[#2A2A2A]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-[#FF6A00] flex items-center justify-center text-white font-bold text-base shadow-sm shadow-[#FF6A00]/30">
                  <Store className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">{seller.name}</h3>
                  <span className="text-[11px] text-[#A3A3A3] truncate block">{seller.college.split(' ')[0]}</span>
                </div>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="p-3 space-y-1">
              <button
                onClick={() => setActiveSection('overview')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeSection === 'overview'
                    ? 'bg-[#FF6A00] text-white'
                    : 'text-[#A3A3A3] hover:text-white hover:bg-[#171717]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveSection('my-products')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeSection === 'my-products'
                    ? 'bg-[#FF6A00] text-white'
                    : 'text-[#A3A3A3] hover:text-white hover:bg-[#171717]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>My Products</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#0B0B0B] text-white tabular-nums">
                  {sellerProducts.length}
                </span>
              </button>

              <button
                onClick={() => setActiveSection('add-product')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeSection === 'add-product'
                    ? 'bg-[#FF6A00] text-white'
                    : 'text-[#A3A3A3] hover:text-white hover:bg-[#171717]'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Product</span>
              </button>

              <button
                onClick={() => setActiveSection('buyer-requests')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeSection === 'buyer-requests'
                    ? 'bg-[#FF6A00] text-white'
                    : 'text-[#A3A3A3] hover:text-white hover:bg-[#171717]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>Buyer Requests</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FF6A00]/20 text-[#FF8C42] tabular-nums">
                  {buyerRequests.filter((r) => r.status === 'pending').length}
                </span>
              </button>

              <button
                onClick={() => setActiveSection('profile')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeSection === 'profile'
                    ? 'bg-[#FF6A00] text-white'
                    : 'text-[#A3A3A3] hover:text-white hover:bg-[#171717]'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Seller Profile</span>
              </button>
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-[#2A2A2A] space-y-2">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:bg-[#171717] rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out of Seller</span>
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 bg-[#171717] hover:bg-[#2A2A2A] text-[#A3A3A3] hover:text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Close Dashboard
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#171717]">
          
          {/* Top Bar inside Dashboard */}
          <div className="px-6 py-4 border-b border-[#2A2A2A] flex items-center justify-between bg-[#0B0B0B]/40">
            <div>
              <span className="text-xs font-semibold text-[#FF8C42] uppercase tracking-wider block">
                Seller Control Center
              </span>
              <h2 className="text-lg font-bold text-white capitalize">
                {activeSection.replace('-', ' ')}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#A3A3A3] hover:text-white hover:bg-[#2A2A2A] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Notification banner */}
          {notification && (
            <div className="bg-emerald-950/70 border-b border-emerald-500/40 px-6 py-2.5 text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {/* Tab Content Panes */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* 1. OVERVIEW */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                {/* Simulated Stats Banner */}
                <div className="p-3 bg-[#0B0B0B] border border-[#2A2A2A] rounded-xl text-xs text-[#A3A3A3] flex items-center justify-between">
                  <span>Student Community Marketplace · Illustrative Demo Figures</span>
                  <span className="text-[#FF8C42] font-semibold">Zero Commission Prototype</span>
                </div>

                {/* 4 Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] space-y-1">
                    <span className="text-xs font-medium text-[#A3A3A3]">Total Products</span>
                    <div className="text-2xl font-bold text-white tabular-nums">
                      {sellerProducts.length}
                    </div>
                    <span className="text-[11px] text-[#A3A3A3]">Listed across semesters</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] space-y-1">
                    <span className="text-xs font-medium text-[#A3A3A3]">Active Listings</span>
                    <div className="text-2xl font-bold text-emerald-400 tabular-nums">
                      {activeListingsCount}
                    </div>
                    <span className="text-[11px] text-[#A3A3A3]">Available for handoff</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] space-y-1">
                    <span className="text-xs font-medium text-[#A3A3A3]">Mock Buyer Requests</span>
                    <div className="text-2xl font-bold text-[#FF6A00] tabular-nums">
                      {buyerRequests.length}
                    </div>
                    <span className="text-[11px] text-[#A3A3A3]">
                      {buyerRequests.filter((r) => r.status === 'pending').length} pending action
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] space-y-1">
                    <span className="text-xs font-medium text-[#A3A3A3]">Estimated Sales</span>
                    <div className="text-2xl font-bold text-white tabular-nums">
                      ₹{mockEstimatedSales}
                    </div>
                    <span className="text-[11px] text-stone-400">Illustrative earnings</span>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="p-5 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">Have books or tools from last semester?</h3>
                    <p className="text-xs text-[#A3A3A3]">
                      Listing takes less than 2 minutes and helps fellow students save up to 75%.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveSection('add-product')}
                    className="px-4 py-2 bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                  >
                    + Add New Product
                  </button>
                </div>

                {/* Recent Buyer Requests preview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Recent Buyer Inquiries</h3>
                    <button
                      onClick={() => setActiveSection('buyer-requests')}
                      className="text-xs text-[#FF6A00] hover:underline cursor-pointer"
                    >
                      View all ({buyerRequests.length})
                    </button>
                  </div>
                  <div className="space-y-2">
                    {buyerRequests.slice(0, 3).map((req) => (
                      <div
                        key={req.id}
                        className="p-3 rounded-lg bg-[#0B0B0B] border border-[#2A2A2A] flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <span className="font-semibold text-white">{req.buyerName}</span>
                          <span className="text-[#A3A3A3]"> requested </span>
                          <strong className="text-stone-200">{req.productName}</strong>
                          <div className="text-[11px] text-[#A3A3A3] mt-0.5">{req.message}</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-bold text-white tabular-nums">₹{req.offeredPrice}</span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize ${
                              req.status === 'accepted'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                : req.status === 'declined'
                                ? 'bg-red-950 text-red-300 border border-red-500/30'
                                : 'bg-[#FF6A00]/20 text-[#FF8C42] border border-[#FF6A00]/30'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 2. MY PRODUCTS */}
            {activeSection === 'my-products' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Your Listed Items</h3>
                    <p className="text-xs text-[#A3A3A3]">
                      Manage, edit, or remove items you have offered for on-campus purchase.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveSection('add-product')}
                    className="px-3.5 py-1.5 bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    + Add Item
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {sellerProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.primaryImage}
                          alt={p.name}
                          className="w-14 h-14 rounded-lg object-cover bg-[#171717] border border-[#2A2A2A] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-[#FF8C42]">{p.category}</span>
                            <span className="text-xs text-[#A3A3A3]">·</span>
                            <span className="text-[11px] text-[#A3A3A3]">{p.condition}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-white">{p.name}</h4>
                          <div className="text-xs font-bold text-white mt-0.5 tabular-nums">
                            ₹{p.price}{' '}
                            <span className="font-normal text-[#A3A3A3] text-[11px]">
                              ({p.quantity} unit{p.quantity > 1 ? 's' : ''})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-md capitalize font-medium ${
                            p.status === 'active'
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                              : 'bg-[#2A2A2A] text-[#A3A3A3]'
                          }`}
                        >
                          {p.status}
                        </span>

                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-2 text-[#A3A3A3] hover:text-white hover:bg-[#171717] rounded-lg transition-colors cursor-pointer"
                          title="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${p.name}" listing?`)) {
                              onDeleteProduct(p.id);
                              showNotificationBanner(`Listing "${p.name}" deleted.`);
                            }
                          }}
                          className="p-2 text-[#A3A3A3] hover:text-red-400 hover:bg-[#171717] rounded-lg transition-colors cursor-pointer"
                          title="Delete listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. ADD PRODUCT FORM */}
            {activeSection === 'add-product' && (
              <form onSubmit={handlePublishProduct} className="space-y-5 max-w-3xl">
                <div>
                  <h3 className="text-base font-bold text-white">List an Item for Sale</h3>
                  <p className="text-xs text-[#A3A3A3]">
                    Fill in item details to publish immediately to the CampusCart student marketplace.
                  </p>
                </div>

                {formError && (
                  <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-white block mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engineering Mathematics Textbook (B.S. Grewal)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white block mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ProductCategory)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00] cursor-pointer"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white block mb-1">Condition *</label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as ProductCondition)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00] cursor-pointer"
                    >
                      <option value="Brand New">Brand New (Unused / Sealed)</option>
                      <option value="Like New">Like New (Mint Condition)</option>
                      <option value="Good Condition">Good Condition (Minor marks/creases)</option>
                      <option value="Fair">Fair (Readable / Usable)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white block mb-1">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 180"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white block mb-1">Original Retail Price (₹, Optional)</label>
                    <input
                      type="number"
                      placeholder="e.g. 650"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white block mb-1">Available Quantity *</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white block mb-1">Campus / College *</label>
                    <input
                      type="text"
                      required
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-white block mb-1">Description *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe edition, author, condition details, inclusions (e.g. CD, charts, covers)..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                </div>

                {/* Multiple Image Upload Component */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white block">
                    Product Photos (Multiple Selection Supported)
                  </label>
                  
                  <div className="flex flex-wrap gap-3 items-center">
                    {/* Previews */}
                    {imagePreviews.map((imgSrc, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#2A2A2A] group">
                        <img src={imgSrc} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImagePreview(idx)}
                          className="absolute top-1 right-1 p-1 bg-black/80 hover:bg-red-600 text-white rounded-full transition-colors cursor-pointer"
                          title="Remove image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    {/* Upload button */}
                    {imagePreviews.length < 5 && (
                      <label className="w-20 h-20 rounded-lg border-2 border-dashed border-[#2A2A2A] hover:border-[#FF6A00] flex flex-col items-center justify-center text-xs text-[#A3A3A3] hover:text-[#FF6A00] cursor-pointer transition-colors bg-[#0B0B0B]">
                        <Upload className="w-5 h-5 mb-1" />
                        <span className="text-[10px]">Upload</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <span className="text-[11px] text-[#A3A3A3] block">
                    * Up to 5 image previews kept safely in client memory. Max 5MB each.
                  </span>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveSection('my-products')}
                    className="px-4 py-2 text-xs font-medium text-[#A3A3A3] hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-bold rounded-lg shadow-md transition-colors cursor-pointer"
                  >
                    Publish Product to Marketplace
                  </button>
                </div>
              </form>
            )}

            {/* 4. BUYER REQUESTS */}
            {activeSection === 'buyer-requests' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Direct Buyer Requests</h3>
                  <p className="text-xs text-[#A3A3A3]">
                    Review offer prices and suggested campus meetup coordinates from interested classmates.
                  </p>
                </div>

                {buyerRequests.length === 0 ? (
                  <div className="text-center py-12 text-xs text-[#A3A3A3]">
                    No buyer requests recorded yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {buyerRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-4 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="text-xs font-bold text-white">{req.buyerName}</span>
                            <span className="text-xs text-[#A3A3A3]"> · {req.buyerCollege}</span>
                            <div className="text-xs text-[#FF8C42] font-semibold mt-0.5">
                              Item: {req.productName}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#A3A3A3]">Offered Price:</span>
                            <span className="text-sm font-extrabold text-white tabular-nums">
                              ₹{req.offeredPrice}
                            </span>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-[#171717] text-xs text-stone-300">
                          &quot;{req.message}&quot;
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-[#A3A3A3] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{req.date}</span>
                          </span>

                          <div className="flex items-center gap-2">
                            {req.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => {
                                    onUpdateBuyerRequestStatus(req.id, 'accepted');
                                    showNotificationBanner(`Accepted request from ${req.buyerName}!`);
                                  }}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-md flex items-center gap-1 cursor-pointer"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Accept Meetup</span>
                                </button>
                                <button
                                  onClick={() => {
                                    onUpdateBuyerRequestStatus(req.id, 'declined');
                                    showNotificationBanner(`Declined request from ${req.buyerName}.`);
                                  }}
                                  className="px-3 py-1.5 bg-[#2A2A2A] hover:bg-red-900/50 text-[#A3A3A3] hover:text-red-300 text-xs font-semibold rounded-md flex items-center gap-1 cursor-pointer"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Decline</span>
                                </button>
                              </>
                            ) : (
                              <span
                                className={`text-xs px-2.5 py-1 rounded-md capitalize font-semibold ${
                                  req.status === 'accepted'
                                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-red-950 text-red-400 border border-red-500/30'
                                }`}
                              >
                                Status: {req.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. SELLER PROFILE */}
            {activeSection === 'profile' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="text-base font-bold text-white">Seller Profile &amp; Preferences</h3>
                  <p className="text-xs text-[#A3A3A3]">
                    Your campus credentials and simulated payout settings.
                  </p>
                </div>

                {/* Prominent Warning Banner */}
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">
                      DEMO ONLY — DO NOT ENTER REAL BANK DETAILS.
                    </strong>
                    <span>
                      Transactions occur in person at campus handover. No real banking accounts or credit cards are linked or processed.
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] space-y-4 text-xs">
                  <div className="flex justify-between border-b border-[#2A2A2A] pb-3">
                    <span className="text-[#A3A3A3]">Full Name</span>
                    <span className="font-semibold text-white">{seller.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2A2A2A] pb-3">
                    <span className="text-[#A3A3A3]">College / University</span>
                    <span className="font-semibold text-white">{seller.college}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2A2A2A] pb-3">
                    <span className="text-[#A3A3A3]">Department</span>
                    <span className="font-semibold text-white">{seller.department}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2A2A2A] pb-3">
                    <span className="text-[#A3A3A3]">Year of Study</span>
                    <span className="font-semibold text-white">{seller.yearOfStudy}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2A2A2A] pb-3">
                    <span className="text-[#A3A3A3]">City</span>
                    <span className="font-semibold text-white">{seller.city}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2A2A2A] pb-3">
                    <span className="text-[#A3A3A3]">Contact Mobile (Demo)</span>
                    <span className="font-semibold text-white">{seller.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A3A3A3]">Simulated Payout Tag</span>
                    <span className="font-semibold text-[#FF8C42]">{seller.payoutPlaceholder || 'None (In-person cash)'}</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSaveEditProduct}
            className="w-full max-w-lg bg-[#171717] border border-[#2A2A2A] rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
              <h3 className="text-base font-bold text-white">Edit Product Listing</h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="text-[#A3A3A3] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-white block mb-1">Product Title</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-white block mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white block mb-1">Quantity</label>
                <input
                  type="number"
                  value={editingProduct.quantity}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      quantity: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white block mb-1">Status</label>
              <select
                value={editingProduct.status}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    status: e.target.value as 'active' | 'sold' | 'reserved',
                  })
                }
                className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs cursor-pointer"
              >
                <option value="active">Active (Available for purchase)</option>
                <option value="reserved">Reserved (Buyer meetup pending)</option>
                <option value="sold">Sold Out</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-white block mb-1">Description</label>
              <textarea
                rows={2}
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#2A2A2A]">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 text-xs text-[#A3A3A3] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
