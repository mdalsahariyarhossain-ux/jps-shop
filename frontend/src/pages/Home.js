import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer"; // ✅ Import Footer

const categories = [
  {
    name: "Men",
    image:
      "https://static.vecteezy.com/system/resources/previews/035/797/423/large_2x/ai-generated-male-anime-characters-anime-boy-illustration-ai-generative-free-photo.jpg",
  },
  {
    name: "Women",
    image:
      "https://m.media-amazon.com/images/I/41-xz-Sc6zS._AC_UF894,1000_QL80_.jpg",
  },
  {
    name: "Kids",
    image:
      "https://img.freepik.com/free-photo/children-playing-grass_1098-504.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Home Decor",
    image:
      "https://smart.dhgate.com/wp-content/uploads/2025/10/how-to-arrange-art-on-a-wall_5f1ef4d9-287e-47bc-b562-4b811e3cc5f8_1200x.jpg",
  },
];

export default function Home() {
  const products = useSelector((state) => state.products.items);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col ">
      {/* 🛍️ Categories Section */}
      <section className="py-2 px-2 md:px-12">
        <h2 className="w-72 border border-black rounded-3xl pl-6 pr-6 py-1 text-center text-2xl font-bold mb-4 shadow-m text-white bg-black mx-auto">
          Shop by Category
        </h2>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={`/category/${cat.name.toLowerCase()}`}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer animate-fadeInUp"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition"></div>
              <h3 className="absolute bottom-3 left-3 text-white text-lg font-semibold tracking-wide">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 🛒 Product Section */}
      <section className="px-6 md:px-12 py-12 flex-grow">
        {/* Header with "View All" */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <Link
            to="/all-products"
            className="text-black-600 hover:text-red-800 text-sm font-semibold"
          >
            View All →
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {products.slice(0, 10).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <hr className="border-t-2 border-gray-300 mt-1" />
      <Footer />
    </div>
  );
}
