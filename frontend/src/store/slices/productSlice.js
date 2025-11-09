import { createSlice } from "@reduxjs/toolkit";

// 🧾 All products (You can later add categories like "Home", "Men", "Women", etc.)
const initialProducts = [
  {
    id: "p1",
    title: "Leather Jacket",
    category: "Men",
    price: 1199.0,
    description:
      "Premium faux leather jacket with a sleek modern design. Features soft inner lining, durable zippers, and a slim fit perfect for all seasons. Ideal for casual or biker style.",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRPs_bsdr6aIF95sVLDSJK1RDx0wYl8248BYTghD2hr1ZL7D1blD0tK7HPXmyIfr1UUJzl5xH7MMrLNMcQcE25zwJ0bzUYCH639tIpmRJww7mkecsVl4CU9",
    specs: [
      "Material: Faux Leather",
      "Fit: Slim",
      "Lining: Soft cotton blend",
      "Color: Black",
    ],
  },
  {
    id: "p2",
    title: "Noise-Cancelling Headphones",
    category: "Electronics",
    price: 1999.0,
    description:
      "Experience immersive sound with active noise cancellation and long battery life up to 35 hours. Comfortable over-ear design with built-in mic for calls and wireless Bluetooth connectivity.",
    image:
      "https://canyon.eu/blog/wp-content/uploads/2023/10/19572scr_7bc84362e44362e.jpg",
    specs: [
      "Bluetooth: 5.0",
      "Battery: 35 hrs",
      "Noise Cancel: Active",
      "Charging: Type-C",
    ],
  },
  {
    id: "p3",
    title: "Gaming Laptop",
    category: "Electronics",
    price: 89000.0,
    description:
      "High-performance gaming laptop with powerful graphics and cooling system. Perfect for gamers and professionals who need fast multitasking and high refresh-rate display.",
    image:
      "https://www.asus.com/media/Odin/Websites/global/ProductLine/20200824120842.jpg",
    specs: [
      "Processor: Intel i7",
      "Graphics: RTX 3060",
      "RAM: 16GB",
      "Storage: 1TB SSD",
    ],
  },
  {
    id: "p4",
    title: "Running Shoes",
    category: "Men",
    price: 989.0,
    description:
      "Lightweight and breathable running shoes designed for maximum comfort and performance. Flexible sole and durable traction for road and trail running.",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRZHJuelZutH10vyveLuPwNN2hEVPMnz1VSUPu5Baa3oCZ5RFnfoWXU0msXv-KZf9Rgf06SH6T_21VL9PIqDHh7Hajq2iKYVOrbeW1YG9jw6j5Sx_N-ghwrUCY1GXMQ1tAMsTSBVGU&usqp=CAc",
    specs: ["Material: Mesh", "Sole: Rubber", "Closure: Lace-up", "Color: Gray/Blue"],
  },
  {
    id: "p5",
    title: "Ceramic Mug Set",
    category: "HomeDecor",
    price: 324.0,
    description:
      "Elegant ceramic mug set of 2 with a glossy finish. Microwave and dishwasher safe. Perfect for coffee, tea, or gifting.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSutd7ySDh_9Z3LXeKxj8N7ENztmoLsxxe45w&s",
    specs: ["Material: Ceramic", "Capacity: 350ml each", "Set: 2 mugs", "Finish: Glossy"],
  },
  {
    id: "p6",
    title: "Smartwatch",
    category: "Electronics",
    price: 1549.0,
    description:
      "Fitness tracking smartwatch with heart rate monitor, step counter, sleep tracking, and customizable watch faces. IP68 water-resistant and compatible with Android and iOS.",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/best-fitness-trackers-watches-women-655defb666097.png?crop=0.329xw:0.657xh;0.00641xw,0.176xh&resize=640:*",
    specs: ["Display: AMOLED", "Battery: 10 days", "Waterproof: IP68", "Bluetooth: 5.1"],
  },
  {
    id: "p8",
    title: "Waterproof Laptop Backpack",
    category: "Accessories",
    price: 1799.0,
    description:
      "Durable 25L backpack made of water-resistant material. Includes padded laptop compartment, USB charging port, and ergonomic straps. Great for travel or work.",
    image:
      "https://zingarostore.com/wp-content/uploads/2024/05/Nyfikens-AdaptPro-Waterproof-17-inch-Business-travel-Laptop-Daily-Work-Backpack-Bags-for-men-women-135-deg-2.jpg",
    specs: ["Capacity: 25L", "Material: Waterproof nylon", "Laptop: up to 17”", "USB Port: Yes"],
  },
  {
    id: "p9",
    title: "Stainless Steel Water Bottle",
    category: "HomeDecor",
    price: 419.0,
    description:
      "Double-wall insulated stainless steel bottle keeps drinks hot for 12 hours or cold for 24 hours. Leak-proof lid and elegant design.",
    image:
      "https://good-homes.in/cdn/shop/products/SER-VCB-IND-500-STE-1_800x.jpg?v=1687589496",
    specs: ["Capacity: 500ml", "Material: Stainless steel", "Insulation: Double wall", "Leak Proof: Yes"],
  },
  {
    id: "p10",
    title: "Wireless Mouse",
    category: "Electronics",
    price: 599.0,
    description:
      "Ergonomic wireless mouse with silent clicks and adjustable DPI. Works with laptops and PCs using a USB nano receiver. Long battery life with power-saving mode.",
    image:
      "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/mouse/ms355/media-gallery/mouse-dell-ms355-bk-gallery-1.psd?qlt=90,0&op_usm=1.75,0.3,2,0&resMode=sharp&pscan=auto&fmt=png-alpha&hei=500",
    specs: ["Connection: 2.4GHz USB", "DPI: 800-1600", "Battery: 12 months", "Buttons: 3"],
  },
];

const productSlice = createSlice({
  name: "products",
  initialState: { items: initialProducts },
  reducers: {},
});

// ✅ Selectors to use in your pages
export const selectProducts = (state) => state.products.items;
export const selectProductById = (id) => (state) =>
  state.products.items.find((p) => p.id === id);

export default productSlice.reducer;
