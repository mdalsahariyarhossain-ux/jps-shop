import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStore, FaUpload, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

export default function BecomeSeller() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    shopName: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    gst: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit formData to backend API
    alert("Seller registration submitted successfully!");
    navigate("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Become a Seller on <span className="text-sky-500">JPS SHOP</span>
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Join and start growing your business online. 
          List your products, manage your inventory, and reach customers.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Info Panel */}
        <div className="lg:col-span-1 bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaStore className="text-sky-500" /> Why Sell With Us?
            </h2>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-center gap-2"><FaCheckCircle className="text-sky-500" /> Reach millions of customers</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-sky-500" /> Low commission rates</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-sky-500" /> Easy inventory management</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-sky-500" /> Fast shipping support</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-sky-500" /> 24/7 seller support</li>
            </ul>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-600">Seller Registration Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Shop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter Full Nmae"
                  required
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-sky-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Shop Name</label>
                <input
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  placeholder="Enter Shop Name"
                  required
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-sky-400"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center border rounded-md p-2">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className="w-full outline-none"
                />
              </div>
              <div className="flex items-center border rounded-md p-2">
                <FaPhone className="text-gray-400 mr-2" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  required
                  className="w-full outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start border rounded-md p-2">
              <FaMapMarkerAlt className="text-gray-400 mr-2 mt-1" />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Shop Address"
                rows="2"
                required
                className="w-full outline-none resize-none"
              ></textarea>
            </div>

            {/* Description & GST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Business Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="2"
                  placeholder="What do you sell?"
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-sky-400 resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">GST / Tax ID</label>
                <input
                  type="text"
                  name="gst"
                  value={formData.gst}
                  onChange={handleChange}
                  placeholder="Enter GST Number"
                  required
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-sky-400"
                />
              </div>
            </div>

            {/* Upload Logo */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer bg-sky-100 text-sky-600 px-4 py-2 rounded-md hover:bg-sky-200 transition">
                <FaUpload /> Upload Shop Logo
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              {formData.logo && <span className="text-sm text-gray-600">{formData.logo.name}</span>}
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-sky-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-sky-600 transition"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
