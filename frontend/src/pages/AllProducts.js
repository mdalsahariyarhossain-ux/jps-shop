import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { categoryProducts } from "./Category";
import Footer from "../components/Footer";

export default function AllProducts() {
  // 🏠 All products from home + categories
  const homeProducts = useSelector((state) => state.products.items || []);
  const allCategoryProducts = Object.values(categoryProducts)
  .flat()
  .map((p) => ({
    ...p,
    title: p.title || p.name || p.productName,  
    image: p.image || p.img || p.url,    
  }));
  const allProducts = [...homeProducts, ...allCategoryProducts];

  // ⚙️ Filter + Pagination state
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 🧮 Filter logic
  const filteredProducts =
    selectedFilters.length === 0
      ? allProducts
      : allProducts.filter((p) =>
          selectedFilters.some((cat) =>
            p.category?.toLowerCase().includes(cat.toLowerCase())
          )
        );

  // 🧾 Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);

  // 🧭 Scroll to top on page change
  const gridRef = useRef(null);
  useEffect(() => {
    if (gridRef.current)
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage, selectedFilters]);

  // 🧮 Compact pagination pages (with ellipsis)
  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);
    if (left > 2) pages.push("left-ellipsis");
    for (let p = left; p <= right; p++) pages.push(p);
    if (right < totalPages - 1) pages.push("right-ellipsis");
    pages.push(totalPages);
    return pages;
  };

  const visiblePages = getVisiblePages();
  const goToPage = (p) => setCurrentPage(Math.min(Math.max(1, p), totalPages));

  // 🧩 Filter toggles
  const toggleFilter = (category) => {
    setCurrentPage(1); // reset to page 1 when filter changes
    setSelectedFilters((prev) =>
      prev.includes(category)
        ? prev.filter((f) => f !== category)
        : [...prev, category]
    );
  };

  const filterCategories = [
    "Men",
    "Women",
    "Kids",
    "Accessories",
    "Electronics",
    "Home Decor",
  ];

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-10 py-6">
      {/* Header */}
      <h2 className="block text-m font-semibold text-gray-600 underline underline-offset-4 decoration-2 text-right mb-6">
        Total Items: {filteredProducts.length}
      </h2>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {/* ✅ Product Grid (3/4) */}
        <main className="lg:col-span-3">
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
          >
            {currentItems.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full mt-20">
                No products available.
              </p>
            ) : (
              currentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>

          {/* ✅ Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 items-center space-x-2 text-gray-700">
              {/* Prev */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-1 rounded-md border text-sm font-medium transition ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "hover:bg-gray-100 border-gray-300"
                }`}
              >
                ‹ Previous
              </button>

              {/* Page Numbers */}
              {visiblePages.map((item, idx) =>
                item === "left-ellipsis" || item === "right-ellipsis" ? (
                  <span
                    key={item + idx}
                    className="px-3 text-gray-400 select-none"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => goToPage(item)}
                    className={`px-3 py-1 rounded-md border text-sm font-medium transition ${
                      currentPage === item
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

              {/* Next */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center px-3 py-1 rounded-md border text-sm font-medium transition ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "hover:bg-gray-100 border-gray-300"
                }`}
              >
                Next ›
              </button>
            </div>
          )}
        </main>

        {/* ✅ Sidebar (1/4) */}
        <aside className="lg:col-span-1 self-start">
          <div className="sticky top-24 space-y-4">
            {/* Filters */}
            <div className="bg-white rounded-md p-4 shadow">
              <h4 className="font-semibold mb-3">Filters</h4>
              <div className="space-y-2">
                {filterCategories.map((cat) => (
                  <label key={cat} className="block text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(cat)}
                      onChange={() => toggleFilter(cat)}
                      className="mr-2 accent-black"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Sort dropdown (placeholder) */}
            <div className="bg-white rounded-md p-4 shadow">
              <h4 className="font-semibold mb-3">Sort by</h4>
              <select className="w-full border rounded p-2 text-sm">
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="new">Newest</option>
              </select>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <hr className="border-t-2 border-gray-300 mt-12" />
      <Footer />
    </div>
  );
}
