import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Sparkles, AlertCircle, X } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { CATEGORIES } from '../data/sampleProducts';
import { ProductCard } from './ProductCard';

interface ProductMarketplaceProps {
  products: Product[];
  wishlistIds: Set<string>;
  cartIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

type SortOption = 'recommended' | 'price-low' | 'price-high';
type SectionTab = 'all' | 'recent' | 'budget';

export const ProductMarketplace: React.FC<ProductMarketplaceProps> = ({
  products,
  wishlistIds,
  cartIds,
  onToggleWishlist,
  onAddToCart,
  onViewDetails,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [activeTab, setActiveTab] = useState<SectionTab>('all');

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        const matchCollege = p.college.toLowerCase().includes(query);
        if (!matchName && !matchCategory && !matchDesc && !matchCollege) {
          return false;
        }
      }

      // Section tab filter
      if (activeTab === 'recent' && !p.isRecentlyListed) {
        return false;
      }
      if (activeTab === 'budget' && p.price > 200) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      // Recommended: active first, then lower id / featured
      return a.id.localeCompare(b.id);
    });
  }, [products, selectedCategory, searchQuery, activeTab, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setActiveTab('all');
    setSortBy('recommended');
  };

  return (
    <section id="marketplace-section" className="py-12 bg-[#0B0B0B] border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Marketplace Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#FF8C42] uppercase tracking-wider mb-1">
              Curated Student Catalogue
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Explore Campus Essentials
            </h2>
            <p className="text-sm text-[#A3A3A3] mt-1">
              Hand-verified items from classmates across textbooks, calculators, and lab supplies.
            </p>
          </div>

          {/* Quick Collection Segmented Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#171717] rounded-lg border border-[#2A2A2A] self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#FF6A00] text-white shadow-sm'
                  : 'text-[#A3A3A3] hover:text-white'
              }`}
            >
              All Items ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'recent'
                  ? 'bg-[#FF6A00] text-white shadow-sm'
                  : 'text-[#A3A3A3] hover:text-white'
              }`}
            >
              Recently Listed
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'budget'
                  ? 'bg-[#FF6A00] text-white shadow-sm'
                  : 'text-[#A3A3A3] hover:text-white'
              }`}
            >
              Budget Under ₹200
            </button>
          </div>
        </div>

        {/* Search, Category Bar & Sort Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, subject, author, or college..."
                className="w-full pl-10 pr-10 py-2.5 bg-[#171717] text-white placeholder-[#A3A3A3] text-sm rounded-lg border border-[#2A2A2A] focus:outline-none focus:border-[#FF6A00] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-[#171717] text-white text-xs font-medium pl-3 pr-8 py-2.5 rounded-lg border border-[#2A2A2A] focus:outline-none focus:border-[#FF6A00] cursor-pointer"
                >
                  <option value="recommended">Sort: Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-[#A3A3A3] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div id="categories-section" className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-[#FF6A00] text-white border-[#FF6A00] shadow-sm shadow-[#FF6A00]/20'
                  : 'bg-[#171717] text-[#A3A3A3] border-[#2A2A2A] hover:text-white hover:border-[#3A3A3A]'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#FF6A00] text-white border-[#FF6A00] shadow-sm shadow-[#FF6A00]/20'
                    : 'bg-[#171717] text-[#A3A3A3] border-[#2A2A2A] hover:text-white hover:border-[#3A3A3A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Active Filter feedback */}
        <div className="flex items-center justify-between text-xs text-[#A3A3A3]">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-white tabular-nums">{filteredProducts.length}</strong> items</span>
            {(selectedCategory !== 'All' || searchQuery || activeTab !== 'all') && (
              <span className="text-[#FF8C42]">· Filters active</span>
            )}
          </div>
          {(selectedCategory !== 'All' || searchQuery || activeTab !== 'all') && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-[#FF6A00] hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.has(product.id)}
                isInCart={cartIds.has(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-[#171717] rounded-xl border border-[#2A2A2A] space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#0B0B0B] border border-[#2A2A2A] flex items-center justify-center mx-auto text-[#FF6A00]">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">No products found</h3>
              <p className="text-sm text-[#A3A3A3] max-w-md mx-auto">
                We couldn&apos;t find any items matching your current filters or search query &quot;{searchQuery}&quot;. Try adjusting your keywords or category.
              </p>
            </div>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
