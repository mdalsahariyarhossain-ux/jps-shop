import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../store/slices/wishlistSlice";
import { FaHeart } from "react-icons/fa";
import Footer from "../components/Footer";

export const categoryProducts = {
    men: [
    { id: "men-1",
      name: "Classic Denim Jacket", 
      price: 1199, 
      image: "https://i5.walmartimages.com/seo/Dpytoraw-Men-s-Western-Spring-autumn-Lined-Denim-Jacket_6cef1fd0-f0d8-4fe9-90c4-988871bb9434.d829d57a64e41f0ea2bc1c77e9c418ba.jpeg", 
      },
    { id: "men-2",
      name: "Formal Cotton Shirt", 
      price: 1299, 
      image: "https://filohevis.com/cdn/shop/files/Maroon_c279a8bf-d241-445c-84f7-f75b2f9beaf8.jpg?v=1728048012&width=2048",  
      },
    { id: "men-3", 
      name: "Casual Sneakers",
      price: 1799, 
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT4g7wKNg6hjEuoPvwotQyHbZWCuFpDG6PbcdfI1dCi-gRyOXHqBcKekdhj0cu4r0rdRSGlxDqzsZ7F64HOYFoL2XzXOu7ZagC91ATPmKA", 
      },
    { id: "men-4", 
      name: "Slim Fit Jeans", 
      price: 1599, 
      image: "https://www.jackjones.in/cdn/shop/files/900793001_g0.jpg?v=1745342669&width=2048", 
      },
    { id: "men-5", 
      name: "Men's T-Shirt", 
      price: 2499, 
      image: "https://m.media-amazon.com/images/I/61-jBuhtgZL._AC_UL480_FMwebp_QL65_.jpg", 
      },
    { id: "men-6", 
      name: "Leather Wallet", 
      price: 999, 
      image: "https://etchcraftemporium.in/cdn/shop/products/walletetch04.jpg?v=1596002074&width=2048", 
      },
    { id: "men-7", 
      name: "Hooded Sweatshirt", 
      price: 1499, 
      image: "https://fitkin.in/cdn/shop/files/1_6_95341987-08cb-4eb1-b6b7-359ef96a854c.jpg?v=1750418789", 
      },
    { id: "men-8", 
      name: "Running Shoes", 
      price: 2299, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBIZYOkFjbPglqfZHwso8gW1lgkuEeQC6UHw&s", 
      },
    { id: "men-9", 
      name: "Polo T-Shirt", 
      price: 1199, 
      image: "https://assets.ajio.com/medias/sys_master/root/20240123/i1mY/65afe6bf16fd2c6e6ab8307a/-473Wx593H-410456771-blk-MODEL.jpg", 
      },
    { id: "men-10", 
      name: "Stylish Blazer", 
      price: 3499, 
      image: "https://5.imimg.com/data5/SELLER/Default/2024/1/381782419/RH/BB/IS/63369146/mens-blazer-500x500.jpg", 
      },
    ],

    women: [
    { id: "women-1", 
      name: "Floral Summer Dress", 
      price: 899, 
      image: "https://m.media-amazon.com/images/I/71o3In3KPXL._AC_UY1100_.jpg", 
     },
    { id: "women-2", 
      name: "Silk Saree", 
      price: 1599, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn0kgNpB9FMh7vNGcxIRV16iJeStIqr21FpA&s", 
      },
    { id: "women-3", 
      name: "Leather Handbag", 
      price: 999, 
      image: "https://img.tatacliq.com/images/i14/437Wx649H/MP000000013909444_437Wx649H_202310200243381.jpeg", 
      },
    { id: "women-4", 
      name: "Heeled Sandals", 
      price: 799, 
      image: "https://m.media-amazon.com/images/I/518Wx5Db3GL._AC_UY1000_.jpg", 
      },
    { id: "women-5", 
      name: "Ethnic Kurti", 
      price: 799, 
      image: "https://wforwoman.com/cdn/shop/files/24AUW11970-222620_1.jpg?v=1727067074", 
      },
    { id: "women-6", 
      name: "Casual Top", 
      price: 599, 
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/top/i/p/k/xs-18904376-levis-original-imagsseytvfmpvtw.jpeg?q=70", 
      },
    { id: "women-7", 
      name: "Long Skirt", 
      price: 899, 
      image: "https://image.hm.com/assets/hm/3c/04/3c04113c7c8e00ec9f6d3b41dd9eea877f0de080.jpg?imwidth=768", 
      },
    { id: "women-8", 
      name: "Clutch Bag", 
      price: 999, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ5gkIUvzn2KHzqn27SAaBIAeoTcMU2fwmag&s", 
      },
    { id: "women-9", 
      name: "Denim Jacket (Women)", 
      price: 799, 
      image: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/18594044/2025/7/26/657c1ad0-6b5a-4765-9a98-28979910218f1753536974474-MONTREZ-Women-Olive-Green-Crop-Denim-Jacket-6221753536974003-1.jpg", 
    },
    { id: "women-10", 
      name: "women sunglasses", 
      price: 999, 
      image: "https://images-cdn.ubuy.co.in/65f6d487cf991b53905cd6df-polarized-sunglasses-for-men-and-women.jpg",
    },
    ],

    kids: [
      { id: "kids-1", 
      name: "Cartoon Print T-shirt", 
      price: 499, 
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQyk2vMtlrU3x7KzUCBqpBnuKLEARsMAZ5cxFKS0YeTtVCsCFO2E4K0Vijw4HZ8hpDErAmVBlLb0zheq0vn2nZzYuBmBumQ_ep38Ekyt1H24kqU71QWcXSzRw", },
    { id: "kids-2", 
      name: "Girls Frock", 
      price: 799, 
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTMmON1OayfGn8f6jhWKcjOpkh8ynhcTX6nf8_yJK6cbjWVJhJkFJ9WuDuivhShLhaqY0CeoTzX10xBnqn-3w7mtnwNpG-oBItRXqv5PhiCzNI1YQl1c20d5A", },
    { id: "kids-3", 
      name: "Baby Romper", 
      price: 499, 
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRHJkY0NYxIuG_tjpKhCI8CIIx6zY5OGJh0AXusYtfFoXtGrRcNR_Zc61HTG3ndLwquaj3ay4Pnw3CSI9MIpbunbAuGnrifx6aNihAEn4ll5HqlqbJfQ7niOA", },
    { id: "kids-4", 
      name: "Kids Running Shoes", 
      price: 899, 
      image: "https://www.famousfootwear.com/blob/product-images/20000/43/44/9/43449_pair_feed1000.jpg",},
    { id: "kids-5", 
      name: "Toy Car", 
      price: 599, 
      image: "https://rukminim2.flixcart.com/image/480/640/xif0q/vehicle-pull-along/o/g/e/hw-exotics-6-10-92-dodge-viper-rt-10-toy-car-hot-wheels-3-original-imah3abbexbhajah.jpeg?q=90", },
    { id: "kids-6", 
      name: "Soft Toy", 
      price: 599, 
      image: "  https://miniwhale.in/wp-content/uploads/2023/01/1-26.png", },
    { id: "kids-7", 
      name: "School Backpack", 
      price: 999, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlIuh6kXyDJnKi6_bhO2nc6VhVelmt3NtY0g&s",},
    { id: "kids-8", 
      name: "Baby Shoes", 
      price: 699, 
      image: "https://m.media-amazon.com/images/I/51Ynd117gNL._AC_UY1000_.jpg", },
    { id: "kids-9", 
      name: "Girls Hairband", 
      price: 299, 
      image: "https://m.media-amazon.com/images/I/51FjUBlFqkL._AC_UF1000,1000_QL80_.jpg", },
    { id: "kids-10", 
      name: "Action Figure Toy", 
      price: 999, 
      image: "https://m.media-amazon.com/images/I/51-pJ-MXizL._AC_UF894,1000_QL80_.jpg",},
    ],
    accessories: [
      { id: "accessories-1", 
      name: "Smart Watch", 
      price: 2999, 
      image: "https://www.jiomart.com/images/product/original/493664717/fire-bolt-unity-bsw092-smart-watch-silver-digital-o493664717-p597514268-0-202301121007.jpeg?im=Resize=(420,420)", 
      },
    { id: "accessories-2", 
      name: "Sunglasses", 
      price: 499, 
      image: "https://himalayaoptical.com/cdn/shop/files/0RB0316S__901_31_030A_1200x1200.jpg?v=1690962600", 
     },
    { id: "accessories-3", 
      name: "Leather Belt", 
      price: 799, 
      image: "https://saddler-products-production.imgix.net/images/6511_2cb28f6840-774570004_01-original.jpg?q=70&fit=clip&w=800&fm=png&auto=compress,format", 
      },
    { id: "accessories-4", 
      name: "Backpack", 
      price: 1499, 
      image: "https://www.yourprint.in/new-admin-ajax.php?action=resize_outer_image&cfcache=all&url=med-s3/yP-mplace/Bags/Back_Packs/YPB07CJCGM1M_3.jpg&resizeTo=600", 
    },
    { id: "accessories-5", 
      name: "Bracelet", 
      price: 799, 
      image: "https://fossil.scene7.com/is/image/FossilPartners/JF04465710_main?$sfcc_fos_large$", 
      },
    { id: "accessories-6", 
      name: "Neck Chain", 
      price: 999, 
      image: "https://www.zaza-lili.com/wp-content/uploads/2024/04/N-Link-RH.jpg", 
      },
    { id: "accessories-7", 
      name: "Cap", 
      price: 499, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-80bNZU5EOtZKoyWR1XerQXv-3pHDQ9SWQ&s", 
     },
    { id: "accessories-8", 
      name: "Travel Pouch", 
      price: 799, 
      image: "https://m.media-amazon.com/images/I/81CRf3-1hoL._AC_UY1100_.jpg", 
      },
    { id: "accessories-9", 
      name: "Wristband", 
      price: 499, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRegh58L3y8MbNbc0fNZzCWWckHTPQ1z5tr5A&s", 
      },
    { id: "accessories-10", 
      name: "Tie Set", 
      price: 999, 
      image: "https://imagescdn.vanheusenindia.com/img/app/product/9/951287-12274928.jpg?auto=format&w=390", 
      },
    ],  

    electronics: [
      { id: "electronics-1", 
      name: "Bluetooth Speaker", 
      price: 1999, 
      image: "https://www.boat-lifestyle.com/cdn/shop/files/Stone_SpinXPro_1.png?v=1709717404", 
      },
    { id: "electronics-2", 
      name: "Wireless Earbuds",
      price: 2499, 
      image: "https://www.jiomart.com/images/product/original/494410459/realme-buds-t110-with-ai-enc-for-calls-upto-38-hours-of-playback-and-fast-charging-bluetooth-headset-punk-black-true-wireless-digital-o494410459-p608763167-0-202406031602.jpeg?im=Resize=(420,420)", 
      },
    { id: "electronics-3", 
      name: "Smartphone", 
      price: 25999, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31WObDKhHIYoFE8su7HbppcPge1biEK7C6w&s", 
      },
    { id: "electronics-4", 
      name: "Laptop", 
      price: 45999, 
      image: "https://images-cdn.ubuy.co.in/64ccb2559d908f42222b598a-hp-pavilion-13-3-fhd-intel-core-i3.jpg", 
      },
    { id: "electronics-5", 
      name: "Tablet", 
      price: 20999, 
      image: "https://images.samsung.com/is/image/samsung/assets/in/tablets/galaxy-tab-s10/buy/S10-Plus_Color-Selection_Moonstone-Gray_MO_720x480.png", 
      },
    { id: "electronics-6", 
      name: "Smartwatch", 
      price: 2999, 
      image: "https://www.gonoise.com/cdn/shop/products/4_2_grande.png?v=1676439601", 
      },
    { id: "electronics-7", 
      name: "Gaming Mouse", 
      price: 999, 
      image: "https://rukminim2.flixcart.com/image/480/640/xif0q/mouse/k/y/e/-original-imagg7zfrjgucchw.jpeg?q=90", 
      },
    { id: "electronics-8", 
      name: "Keyboard", 
      price: 1499, 
      image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Gaming/Gaming%20Accessories/Images/258381_rnmqia.png", 
      },
    { id: "electronics-9", 
      name: "Power Bank", 
      price: 1199, 
      image: "https://rukminim2.flixcart.com/image/480/640/kqpj4i80/power-bank/c/y/g/power-bank-plm13zm-mi-original-imag4nuvzgmjx3dv.jpeg?q=90", 
      },
    { id: "electronics-10", 
      name: "Bluetooth Charger", 
      price: 2499, 
      image: "https://m.media-amazon.com/images/I/61h9pU+-7+L._SL1500_.jpg", 
      },
    ],

    "home decor": [
      { id: "home-1", 
        name: "Wall Art Painting", 
        price: 1599, 
        image: "https://m.media-amazon.com/images/I/71vDD2QGl-L.jpg" },
      { id: "home-2", 
        name: "Decorative Vase", 
        price: 899, 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBlUGaoP2r2CvEU07aIfFs7ufoDtGLwvYPNw&s" },
      { id: "home-3", 
        name: "Table Lamp", 
        price: 1299, 
        image: "https://m.media-amazon.com/images/I/71jIfDWFmEL.jpg" },
      { id: "home-4", 
        name: "Cushion Cover Set", 
        price: 799, 
        image: "https://m.media-amazon.com/images/I/810MYb1M0OL.jpg" },
      { id: "home-5", 
        name: "Wall Clock", 
        price: 1199, 
        image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw6ef4a954/images/Titan/Catalog/W0046PA01_1.jpg?sw=800&sh=800" },
      { id: "home-6", 
        name: "Curtain Set",
        price: 1799, 
        image: "https://rukminim2.flixcart.com/image/480/640/xif0q/curtain/i/r/c/garden-panel-maroon-set-of-2-window-curtains-2-153-window-original-imahgckpwmxfqhuy.jpeg?q=90" },
      { id: "home-7", 
        name: "Indoor Plant Pot", 
        price: 699, 
        image: "https://5.imimg.com/data5/ECOM/Default/2022/5/EH/YN/QX/35101554/6137b5rou2l-sl1280-500x500.jpg" },
      { id: "home-8", 
        name: "Photo Frame", 
        price: 499, 
        image: "https://cdn.shopify.com/s/files/1/0632/2526/6422/files/1_35d56b93-1e78-40f9-ab4c-3435cb51a9cf.jpg?v=1760225873" },
      { id: "home-9", 
        name: "Candle Holder", 
        price: 599, 
        image: "https://m.media-amazon.com/images/I/61DkS6aNB6L._AC_UF894,1000_QL80_.jpg" },
      { id: "home-10", 
        name: "Wall Shelf", 
        price: 1599, 
        image: "https://m.media-amazon.com/images/I/91TM6ASef8L._AC_UF894,1000_QL80_.jpg" },
    ],
  };

export default function Category() {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const filteredProducts = categoryProducts[name?.toLowerCase()] || [];

  const addToCartHandler = (product) => dispatch(addToCart(product));
  const checkoutHandler = (product) => navigate("/checkout", { state: { product } });

  const handleWishlist = (e, product) => {
    e.stopPropagation();
    const isWishlisted = wishlist.some((item) => item.id === product.id);
    if (isWishlisted) dispatch(removeFromWishlist(product.id));
    else dispatch(addToWishlist(product));
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-12 py-4 text-center">
      <h2 className="inline-block border border-black px-8 py-1 rounded-3xl text-center text-3xl   font-bold mb-4 capitalize text-white bg-black">
        {name} Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlist.some((item) => item.id === product.id);
          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden group relative"
            >
              <button
                onClick={(e) => handleWishlist(e, product)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-sky-100 transition flex items-center justify-center"
              >
                <FaHeart
                  size={16}
                  className={isWishlisted ? "text-red-500" : "text-gray-500 hover:text-red-400"}
                />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-800 mb-1">₹{product.price}</p>
                <div className="flex justify-center gap-1">
                  <button
                    onClick={() => addToCartHandler(product)}
                    className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => checkoutHandler(product)}
                    className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 text-sm"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          No products available.
        </p>
      )}
      <Footer />
    </div>
  );
}
