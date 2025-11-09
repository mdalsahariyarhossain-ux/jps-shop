import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../store/slices/wishlistSlice";
import { Heart } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => String(item.id) === String(id));

  const reduxProduct = useSelector((state) =>
    state.products.items.find((p) => String(p.id) === String(id))
  );
  
  const allCategoryProducts = [
    // 👔 MEN (10)
    { id: "men-1",
      name: "Classic Denim Jacket", price: 1199, 
      image: "https://i5.walmartimages.com/seo/Dpytoraw-Men-s-Western-Spring-autumn-Lined-Denim-Jacket_6cef1fd0-f0d8-4fe9-90c4-988871bb9434.d829d57a64e41f0ea2bc1c77e9c418ba.jpeg", 
      description: "Stylish denim jacket perfect for all seasons.", 
      details: ["Material: 100% Denim", "Fit: Regular", "Color: Blue", "Brand: UrbanEdge"] 
    },
    { id: "men-2",
      name: "Formal Cotton Shirt", 
      price: 1299, 
      image: "https://filohevis.com/cdn/shop/files/Maroon_c279a8bf-d241-445c-84f7-f75b2f9beaf8.jpg?v=1728048012&width=2048", 
      description: "Comfortable and breathable cotton shirt for office wear.", 
      details: ["Material: Cotton", "Fit: Slim", "Color: Maroon", "Brand: My Store"] 
    },
    { id: "men-3", 
      name: "Casual Sneakers",
      price: 1799, 
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT4g7wKNg6hjEuoPvwotQyHbZWCuFpDG6PbcdfI1dCi-gRyOXHqBcKekdhj0cu4r0rdRSGlxDqzsZ7F64HOYFoL2XzXOu7ZagC91ATPmKA", 
      description: "Trendy sneakers for everyday comfort.", 
      details: ["Material: Synthetic", "Closure: Lace-up", "Color: White", "Brand: Campus"] },
    { id: "men-4", 
      name: "Slim Fit Jeans", 
      price: 1599, 
      image: "https://www.jackjones.in/cdn/shop/files/900793001_g0.jpg?v=1745342669&width=2048", 
      description: "Modern slim fit denim.", 
      details: ["Material: Denim", "Fit: Slim", "Wash: Dark", "Brand: Levi's"] },
    { id: "men-5", 
      name: "Men's T-Shirt", 
      price: 2499, 
      image: "https://m.media-amazon.com/images/I/61-jBuhtgZL._AC_UL480_FMwebp_QL65_.jpg", 
      description: "Classic cotton t-shirt.", 
      details: ["Material: Cotton Collar: Polo Color: Black Brand:store"] },
    { id: "men-6", 
      name: "Leather Wallet", 
      price: 999, 
      image: "https://etchcraftemporium.in/cdn/shop/products/walletetch04.jpg?v=1596002074&width=2048", 
      description: "Compact bi-fold wallet.", 
      details: ["Material: Leather", "Slots: 6", "Color: Brown", "Brand: Hidesign"] },
    { id: "men-7", 
      name: "Hooded Sweatshirt", 
      price: 1499, 
      image: "https://fitkin.in/cdn/shop/files/1_6_95341987-08cb-4eb1-b6b7-359ef96a854c.jpg?v=1750418789", 
      description: "Cozy hooded sweatshirt.", 
      details: ["Material: Fleece", "Fit: Regular", "Color: Grey", "Brand: Puma"] },
    { id: "men-8", 
      name: "Running Shoes", 
      price: 2299, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBIZYOkFjbPglqfZHwso8gW1lgkuEeQC6UHw&s", 
      description: "Lightweight running shoes.", 
      details: ["Cushioning: High", "Closure: Lace", "Color: Navy", "Brand: Nike"] },
    { id: "men-9", 
      name: "Polo T-Shirt", 
      price: 1199, 
      image: "https://assets.ajio.com/medias/sys_master/root/20240123/i1mY/65afe6bf16fd2c6e6ab8307a/-473Wx593H-410456771-blk-MODEL.jpg", 
      description: "Soft cotton polo.", 
      details: ["Material: Cotton", "Collar: Polo", "Color: Black", "Brand: U.S. Polo"] },
    { id: "men-10", 
      name: "Stylish Blazer", 
      price: 3499, 
      image: "https://5.imimg.com/data5/SELLER/Default/2024/1/381782419/RH/BB/IS/63369146/mens-blazer-500x500.jpg", 
      description: "Tailored blazer for smart events.", 
      details: ["Material: Blended", "Fit: Tailored", "Color: Charcoal", "Brand: Raymond"] },

    // 👩 WOMEN (10)
    { id: "women-1", 
      name: "Floral Summer Dress", 
      price: 899, 
      image: "https://m.media-amazon.com/images/I/71o3In3KPXL._AC_UY1100_.jpg", 
      description: "Floral summer dress.", 
      details: ["Fabric: Rayon", "Pattern: Floral", "Length: Knee", "Brand: FabAlley"] },
    { id: "women-2", 
      name: "Silk Saree", 
      price: 1599, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn0kgNpB9FMh7vNGcxIRV16iJeStIqr21FpA&s", 
      description: "Elegant silk saree.", 
      details: ["Fabric: Silk Blend", "Color: Red & Gold", "Blouse: Included", "Brand: Kanjivaram"] },
    { id: "women-3", 
      name: "Leather Handbag", 
      price: 999, 
      image: "https://img.tatacliq.com/images/i14/437Wx649H/MP000000013909444_437Wx649H_202310200243381.jpeg", 
      description: "Stylish leather handbag.", 
      details: ["Material: PU Leather", "Compartments: 3", "Color: Brown", "Brand: Lavie"] },
    { id: "women-4", 
      name: "Heeled Sandals", 
      price: 799, 
      image: "https://m.media-amazon.com/images/I/518Wx5Db3GL._AC_UY1000_.jpg", 
      description: "Comfortable heeled sandals.", 
      details: ["Heel: 3 inch", "Material: Synthetic", "Color: Beige", "Brand: Metro"] },
    { id: "women-5", 
      name: "Ethnic Kurti", 
      price: 799, 
      image: "https://wforwoman.com/cdn/shop/files/24AUW11970-222620_1.jpg?v=1727067074", 
      description: "Elegant kurti for festive wear.", 
      details: ["Fabric: Cotton", "Style: A-line", "Color: Mustard", "Brand: W for Woman"] },
    { id: "women-6", 
      name: "Casual Top", 
      price: 599, 
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/top/i/p/k/xs-18904376-levis-original-imagsseytvfmpvtw.jpeg?q=70", 
      description: "Women's denim jacket.", 
      details: ["Material: Denim", "Fit: Oversized", "Color: Light Blue", "Brand: Levi's"] },
    { id: "women-7", 
      name: "Long Skirt", 
      price: 899, 
      image: "https://image.hm.com/assets/hm/3c/04/3c04113c7c8e00ec9f6d3b41dd9eea877f0de080.jpg?imwidth=768", 
      description: "Flowy long skirt.", 
      details: ["Fabric: Viscose", "Length: Ankle", "Color: Maroon", "Brand: H&M"] },
    { id: "women-8", 
      name: "Clutch Bag", 
      price: 999, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ5gkIUvzn2KHzqn27SAaBIAeoTcMU2fwmag&s", 
      description: "Elegant clutch for evenings.", 
      details: ["Material: Satin", "Closure: Zip", "Color: Gold", "Brand: Aldo"] },
    { id: "women-9", 
      name: "Denim Jacket (Women)", 
      price: 799, 
      image: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/18594044/2025/7/26/657c1ad0-6b5a-4765-9a98-28979910218f1753536974474-MONTREZ-Women-Olive-Green-Crop-Denim-Jacket-6221753536974003-1.jpg", 
      description: "Everyday casual top.", 
      details: ["Material: Cotton", "Fit: Regular", "Color: Olive", "Brand: Zara"] },
    { id: "women-10", 
      name: "women sunglasses", 
      price: 999, 
      image: "https://images-cdn.ubuy.co.in/65f6d487cf991b53905cd6df-polarized-sunglasses-for-men-and-women.jpg", 
      description: "Fashion sunglasses for women.", 
      details: ["Lens: UV400", "Frame: Metal", "Color: Black", "Brand: Ray-Ban"] },

    // 👦 KIDS (10)
    { id: "kids-1", 
      name: "Cartoon Print T-shirt", 
      price: 499, 
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQyk2vMtlrU3x7KzUCBqpBnuKLEARsMAZ5cxFKS0YeTtVCsCFO2E4K0Vijw4HZ8hpDErAmVBlLb0zheq0vn2nZzYuBmBumQ_ep38Ekyt1H24kqU71QWcXSzRw", 
      description: "Soft cotton tee with fun cartoon prints.", 
      details: ["Material: Cotton", "Age: 3-4 yrs", "Color: Multicolor", "Brand: Disney"] },
    { id: "kids-2", 
      name: "Girls Frock", 
      price: 799, 
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTMmON1OayfGn8f6jhWKcjOpkh8ynhcTX6nf8_yJK6cbjWVJhJkFJ9WuDuivhShLhaqY0CeoTzX10xBnqn-3w7mtnwNpG-oBItRXqv5PhiCzNI1YQl1c20d5A", 
      description: "Comfortable denim shorts.", 
      details: ["Material: Denim", "Fit: Regular", "Color: Blue", "Brand: Levi's Kids"] },
    { id: "kids-3", 
      name: "Baby Romper", 
      price: 499, 
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRHJkY0NYxIuG_tjpKhCI8CIIx6zY5OGJh0AXusYtfFoXtGrRcNR_Zc61HTG3ndLwquaj3ay4Pnw3CSI9MIpbunbAuGnrifx6aNihAEn4ll5HqlqbJfQ7niOA", 
      description: "Cute baby romper.", 
      details: ["Material: Cotton", "Size: 0-6 months", "Color: Pink", "Brand: Carter's"] },
    { id: "kids-4", 
      name: "Kids Running Shoes", 
      price: 899, 
      image: "https://www.famousfootwear.com/blob/product-images/20000/43/44/9/43449_pair_feed1000.jpg", 
      description: "Lightweight running shoes for kids.", 
      details: ["Closure: Velcro", "Color: Red", "Brand: Nike Kids"] },
    { id: "kids-5", 
      name: "Toy Car", 
      price: 599, 
      image: "https://rukminim2.flixcart.com/image/480/640/xif0q/vehicle-pull-along/o/g/e/hw-exotics-6-10-92-dodge-viper-rt-10-toy-car-hot-wheels-3-original-imah3abbexbhajah.jpeg?q=90", 
      description: "Remote-controlled toy car.", 
      details: ["Battery: Rechargeable", "Age: 5+", "Color: Yellow", "Brand: HotWheels"] },
    { id: "kids-6", 
      name: "Soft Toy", 
      price: 599, 
      image: "  https://miniwhale.in/wp-content/uploads/2023/01/1-26.png", 
      description: "Huggable soft toy for toddlers.", 
      details: ["Material: Plush", "Size: 12 inch", "Color: Brown", "Brand: TeddyWorld"] },
    { id: "kids-7", 
      name: "School Backpack", 
      price: 999, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlIuh6kXyDJnKi6_bhO2nc6VhVelmt3NtY0g&s", 
      description: "Durable school backpack.", 
      details: ["Capacity: 20L", "Compartments: 4", "Color: Blue", "Brand: Wildcraft"] },
    { id: "kids-8", 
      name: "Baby Shoes", 
      price: 699, 
      image: "https://m.media-amazon.com/images/I/51Ynd117gNL._AC_UY1000_.jpg", 
      description: "Soft sole baby shoes for early walkers.", 
      details: ["Material: Cotton Blend", "Size: 3-6 months", "Color: White", "Brand: Chicco"] },
    { id: "kids-9", 
      name: "Girls Hairband", 
      price: 299, 
      image: "https://m.media-amazon.com/images/I/51FjUBlFqkL._AC_UF1000,1000_QL80_.jpg", 
      description: "Colorful hairband set.", 
      details: ["Pack: 6", "Color: Mixed", "Material: Fabric", "Brand: PrettyKids"] },
    { id: "kids-10", 
      name: "Action Figure Toy", 
      price: 999, 
      image: "https://m.media-amazon.com/images/I/51-pJ-MXizL._AC_UF894,1000_QL80_.jpg", 
      description: "Popular superhero action figure.", 
      details: ["Material: Plastic", "Age: 4+", "Includes: Accessories", "Brand: Hasbro"] },

    // 🕶 ACCESSORIES (10)
    { id: "accessories-1", 
      name: "Smart Watch", 
      price: 2999, 
      image: "https://www.jiomart.com/images/product/original/493664717/fire-bolt-unity-bsw092-smart-watch-silver-digital-o493664717-p597514268-0-202301121007.jpeg?im=Resize=(420,420)", 
      description: "Smart watch with fitness tracking and notifications.", 
      details: ["Display: AMOLED", "Battery: 7 Days", "Water Resistant", "Brand: Fire-Boltt"] },
    { id: "accessories-2", 
      name: "Sunglasses", 
      price: 499, 
      image: "https://himalayaoptical.com/cdn/shop/files/0RB0316S__901_31_030A_1200x1200.jpg?v=1690962600", 
      description: "UV-protected sunglasses.", 
      details: ["Frame: Metal", "Lens: UV400", "Color: Black", "Brand: Ray-Ban"] },
    { id: "accessories-3", 
      name: "Leather Belt", 
      price: 799, 
      image: "https://saddler-products-production.imgix.net/images/6511_2cb28f6840-774570004_01-original.jpg?q=70&fit=clip&w=800&fm=png&auto=compress,format", 
      description: "Classic leather belt.",
      details: ["Material: Leather", "Width: 1.25 inch", "Color: Brown", "Brand: H&M"] },
    { id: "accessories-4", 
      name: "Backpack", 
      price: 1499, 
      image: "https://www.yourprint.in/new-admin-ajax.php?action=resize_outer_image&cfcache=all&url=med-s3/yP-mplace/Bags/Back_Packs/YPB07CJCGM1M_3.jpg&resizeTo=600", 
      description: "Multi-pocket backpack.", 
      details: ["Capacity: 25L", "Color: Black", "Brand: American Tourister"] },
    { id: "accessories-5", 
      name: "Bracelet", 
      price: 799, 
      image: "https://fossil.scene7.com/is/image/FossilPartners/JF04465710_main?$sfcc_fos_large$", 
      description: "Fashion bracelet.", 
      details: ["Material: Alloy", "Length: Adjustable", "Color: Silver", "Brand: Fossil"] },
    { id: "accessories-6", 
      name: "Neck Chain", 
      price: 999, 
      image: "https://www.zaza-lili.com/wp-content/uploads/2024/04/N-Link-RH.jpg", 
      description: "Stylish neck chain.", 
      details: ["Material: Alloy", "Length: 20 inch", "Color: Gold", "Brand: Zaza"] },
    { id: "accessories-7", 
      name: "Cap", 
      price: 499, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-80bNZU5EOtZKoyWR1XerQXv-3pHDQ9SWQ&s", 
      description: "Cotton baseball cap.", 
      details: ["Material: Cotton", "Size: Adjustable", "Color: Navy", "Brand: Puma"] },
    { id: "accessories-8", 
      name: "Travel Pouch", 
      price: 799, 
      image: "https://m.media-amazon.com/images/I/81CRf3-1hoL._AC_UY1100_.jpg", 
      description: "Compact travel pouch.", 
      details: ["Material: Nylon", "Compartments: 3", "Color: Grey", "Brand: AmazonBasics"] },
    { id: "accessories-9", 
      name: "Wristband", 
      price: 499, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRegh58L3y8MbNbc0fNZzCWWckHTPQ1z5tr5A&s", 
      description: "Fitness wristband.", 
      details: ["Display: LED", "Battery: 10 days", "Color: Black", "Brand: Mi"] },
    { id: "accessories-10", 
      name: "Tie Set", 
      price: 999, 
      image: "https://imagescdn.vanheusenindia.com/img/app/product/9/951287-12274928.jpg?auto=format&w=390", 
      description: "Formal tie with pocket square.", 
      details: ["Material: Silk Blend", "Color: Navy", "Brand: Van Heusen"] },

    // 💻 ELECTRONICS (10)
    { id: "electronics-1", 
      name: "Bluetooth Speaker", 
      price: 1999, 
      image: "https://www.boat-lifestyle.com/cdn/shop/files/Stone_SpinXPro_1.png?v=1709717404", 
      description: "Portable speaker with deep bass.", 
      details: ["Power: 10W", "Bluetooth: 5.0", "Playback: 12 hrs", "Brand: Boat"] },
    { id: "electronics-2", 
      name: "Wireless Earbuds",
      price: 2499, 
      image: "https://www.jiomart.com/images/product/original/494410459/realme-buds-t110-with-ai-enc-for-calls-upto-38-hours-of-playback-and-fast-charging-bluetooth-headset-punk-black-true-wireless-digital-o494410459-p608763167-0-202406031602.jpeg?im=Resize=(420,420)", 
      description: "True wireless earbuds.", 
      details: ["Battery: 24 hrs", "Noise Cancellation", "Brand: Realme"] },
    { id: "electronics-3", 
      name: "Smartphone", 
      price: 25999, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31WObDKhHIYoFE8su7HbppcPge1biEK7C6w&s", 
      description: "Feature-packed smartphone.", 
      details: ["Storage: 128GB", "RAM: 6GB", "Battery: 5000mAh", "Brand: Xiaomi"] },
    { id: "electronics-4", 
      name: "Laptop", 
      price: 45999, 
      image: "https://images-cdn.ubuy.co.in/64ccb2559d908f42222b598a-hp-pavilion-13-3-fhd-intel-core-i3.jpg", 
      description: "Lightweight laptop.", 
      details: ["CPU: i5", "RAM: 8GB", "Storage: 512GB SSD", "Brand: HP"] },
    { id: "electronics-5", 
      name: "Tablet", 
      price: 20999, 
      image: "https://images.samsung.com/is/image/samsung/assets/in/tablets/galaxy-tab-s10/buy/S10-Plus_Color-Selection_Moonstone-Gray_MO_720x480.png", 
      description: "10-inch tablet.", 
      details: ["Display: 10 inch", "Storage: 64GB", "Brand: Samsung"] },
    { id: "electronics-6", 
      name: "Smartwatch", 
      price: 2999, 
      image: "https://www.gonoise.com/cdn/shop/products/4_2_grande.png?v=1676439601", 
      description: "Everyday smartwatch.", 
      details: ["Battery: 7 days", "Heart Monitor", "Brand: Noise"] },
    { id: "electronics-7", 
      name: "Gaming Mouse", 
      price: 999, 
      image: "https://rukminim2.flixcart.com/image/480/640/xif0q/mouse/k/y/e/-original-imagg7zfrjgucchw.jpeg?q=90", 
      description: "High-precision mouse.", 
      details: ["DPI: 16000", "RGB Lighting", "Brand: Logitech"] },
    { id: "electronics-8", 
      name: "Keyboard", 
      price: 1499, 
      image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Gaming/Gaming%20Accessories/Images/258381_rnmqia.png", 
      description: "Mechanical keyboard.", 
      details: ["Switch: Blue", "Layout: US", "Brand: Redragon"] },
    { id: "electronics-9", 
      name: "Power Bank", 
      price: 1199, 
      image: "https://rukminim2.flixcart.com/image/480/640/kqpj4i80/power-bank/c/y/g/power-bank-plm13zm-mi-original-imag4nuvzgmjx3dv.jpeg?q=90", 
      description: "10000mAh power bank.", 
      details: ["Capacity: 10000mAh", "Ports: 2", "Brand: Mi"] },
    { id: "electronics-10", 
      name: "Bluetooth Charger", 
      price: 2499, 
      image: "https://m.media-amazon.com/images/I/61h9pU+-7+L._SL1500_.jpg", 
      description: "Good battery earbuds.", 
      details: ["Battery: 20 hrs", "Brand: Sony"] },

    // 🏠 HOME DECOR (10)
    { id: "homedecor-1", 
      name: "Wall Art Painting", 
      price: 1599, 
      image: "https://m.media-amazon.com/images/I/71vDD2QGl-L.jpg", 
      description: "Elegant wall art.", 
      details: ["Material: Canvas", "Size: 24x36 inch", "Brand: HomeArt"] },
    { id: "homedecor-2", 
      name: "Decorative Vase", 
      price: 899, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBlUGaoP2r2CvEU07aIfFs7ufoDtGLwvYPNw&s", 
      description: "Ceramic decorative vase.", 
      details: ["Material: Ceramic", "Color: White", "Brand: DecorDen"] },
    { id: "homedecor-3", 
      name: "Table Lamp", 
      price: 1299, 
      image: "https://m.media-amazon.com/images/I/71jIfDWFmEL.jpg", 
      description: "Modern table lamp.", 
      details: ["Bulb: LED", "Color: Warm", "Brand: Philips"] },
    { id: "homedecor-4", 
      name: "Cushion Cover Set", 
      price: 799, 
      image: "https://m.media-amazon.com/images/I/810MYb1M0OL.jpg", 
      description: "Decorative cushion set.", 
      details: ["Pack: 3", "Material: Cotton", "Brand: HomeStyle"] },
    { id: "homedecor-5", 
      name: "Wall Clock", 
      price: 1199, 
      image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw6ef4a954/images/Titan/Catalog/W0046PA01_1.jpg?sw=800&sh=800", 
      description: "Modern wall clock.", 
      details: ["Diameter: 30cm", "Battery: AA", "Brand: Ajanta"] },
    { id: "homedecor-6", 
      name: "Curtain Set", 
      price: 1799, 
      image: "https://rukminim2.flixcart.com/image/480/640/xif0q/curtain/i/r/c/garden-panel-maroon-set-of-2-window-curtains-2-153-window-original-imahgckpwmxfqhuy.jpeg?q=90",
      description: "Blockout curtain set.", 
      details: ["Length: 7 feet", "Pack: 2 panels", "Brand: DrapesCo"] },
    { id: "homedecor-7", 
      name: "Indoor Plant Pot", 
      price: 699, 
      image: "https://5.imimg.com/data5/ECOM/Default/2022/5/EH/YN/QX/35101554/6137b5rou2l-sl1280-500x500.jpg", 
      description: "Decorative plant pot.", 
      details: ["Material: Ceramic", "Height: 8 inch", "Brand: Greenish"] },
    { id: "homedecor-8", 
      name: "Photo Frame", 
      price: 499, 
      image: "https://cdn.shopify.com/s/files/1/0632/2526/6422/files/1_35d56b93-1e78-40f9-ab4c-3435cb51a9cf.jpg?v=1760225873", 
      description: "Set of photo frames.", 
      details: ["Pack: 2", "Color: Black", "Brand: FrameIt"] },
    { id: "homedecor-9", 
      name: "Candle Holder", 
      price: 599, 
      image: "https://m.media-amazon.com/images/I/61DkS6aNB6L._AC_UF894,1000_QL80_.jpg", 
      description: "Stylish candle holder.", 
      details: ["Material: Metal", "Color: Bronze", "Brand: GlowHome"] },
    { id: "homedecor-10", 
      name: "Wall Shelf", 
      price: 1599, 
      image: "https://m.media-amazon.com/images/I/91TM6ASef8L._AC_UF894,1000_QL80_.jpg", 
      description: "Floating wall shelf.", 
      details: ["Material: MDF", "Size: 60x20 cm", "Brand: ShelfPro"] },
  ];
  

  // ✅ find product by ID
  const product = reduxProduct || allCategoryProducts.find((p) => String(p.id) === String(id));
  if (!product)
    return (
      <div className="text-center text-lg mt-10 text-gray-600">Product not found 😢</div>
    );

  const similar = allCategoryProducts
    .filter((p) => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);


  const toggleWishlist = () => {
    if (isInWishlist) dispatch(removeFromWishlist(product.id));
    else dispatch(addToWishlist(product));
  };

  const handleSimilarClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCheckout = () => {
    const singleProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
    };
    navigate("/checkout", { state: { product: singleProduct } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-8">
      {/* PRODUCT SECTION */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg grid md:grid-cols-2 gap-10 p-8">
        {/* LEFT SIDE - IMAGE + HEART */}
        <div className="relative flex flex-col items-center justify-center">
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:scale-110 transition"
          >
            <Heart
              size={26}
              className={isInWishlist ? "text-red-500 fill-red-500" : "text-gray-400"}
            />
          </button>

          <img
            src={product.image}
            alt={product.name}
            className="w-70 h-80 object-contain rounded-lg shadow-md"
          />
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-black-700 mb-2">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            <p className="text-yellow-500 text-lg mb-4">⭐⭐⭐⭐☆ (1204 reviews)</p>

            <p className="text-gray-700 leading-relaxed mb-4 text-base">
              {product.description}
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Details</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 text-base">
              {product.details?.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg text-lg hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleCheckout}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {similar.length > 0 ? (
            similar.map((sp) => (
              <div
                key={sp.id}
                onClick={() => handleSimilarClick(sp.id)} // ✅ FIXED HERE
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer p-4"
              >
                <img
                  src={sp.image}
                  alt={sp.name}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h4 className="font-semibold text-gray-700 text-sm mb-1">{sp.name}</h4>
                <p className="text-black-600 font-medium text-sm">
                  ₹{sp.price.toLocaleString("en-IN")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-black-600 text-center col-span-4">
              No similar products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
