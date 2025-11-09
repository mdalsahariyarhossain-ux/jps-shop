import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="rounded-lg px-6 py-2  bg-gray-100 text-gray-700 gap-0">
      <div className="max-w-9xl mx-auto px-10 py-10 grid grid-cols-1 md:grid-cols-6 gap-10 border-b border-gray-300">
        {/* Left: Logo and Info */}
        <div className="md:col-span-2">
          <div className="flex items-center mb-4">
            <img
              src="https://dynamic.design.com/preview/logodraft/6a8a5275-019d-4014-8d44-f3be6be16d54/image/large.png"
              alt="Logo"
              className="w-10 h-10 mr-3 rounded-full object-cover"
            />
            <h2 className="text-2xl font-bold text-green-600">JPS SHOP</h2>
          </div>
          <p className="text-sm leading-relaxed mb-4 text-left">
            Welcome to my MyShop, your number one source for all things 
            fashion.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              
              href="https://www.facebook.com/share/17QumuP3or/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/ig._.joy?igsh=ejE4eXY0M204cmo0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* About Us */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">ABOUT US</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">About JPS Shop</a></li>
            <li><a href="#" className="hover:text-blue-600">Our Impact</a></li>
            <li><a href="#" className="hover:text-blue-600">Careers</a></li>
            <li><a href="#" className="hover:text-blue-600">Press</a></li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">HELP & SUPPORT</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-600">Delivery Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Refund Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Become a Seller</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">LEGAL</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">GET IN TOUCH</h3>
          <p className="text-sm flex flex-col space-y-1">
            <span>📞 +91 9876543210</span>
            <span>📧 contact@myshop.com</span>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} All rights reserved. Made with  by{" "}
        <a href="#" className="text-blue-600 font-medium hover:underline">
          MyShop
        </a>
      </div>
    </footer>
  );
}
