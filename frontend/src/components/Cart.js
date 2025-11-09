import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, changeQty, clearCart } from "../store/slices/cartSlice";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const { token } = useSelector((state) => state.auth); // 👈 check login
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSingleCheckout = (product) => {
    if (!token) {
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: { product } });
  };

  const handleFullCheckout = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-sky-700">
        Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          Your cart is empty.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-start bg-white rounded-3xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Left: Image + Title + Quantity */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-2/3">
                <img
                  src={item.image}
                  alt={item.name || item.title}
                  className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-xl shadow"
                />
                <div className="flex flex-col flex-1">
                  <div className="font-semibold text-gray-800 text-lg">
                    {item.name || item.title}
                  </div>

                  <div className="text-gray-600 text-md font-bold mb-2">
                    ₹{item.price.toFixed(2)}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        dispatch(changeQty({ id: item.id, qty: item.qty - 1 }))
                      }
                      disabled={item.qty <= 1}
                      className="text-gray-600 hover:text-sky-600 transition p-2 border rounded-lg"
                    >
                      <FaMinus />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          changeQty({
                            id: item.id,
                            qty: parseInt(e.target.value) || 1,
                          })
                        )
                      }
                      className="w-14 text-center border rounded-lg outline-none"
                    />
                    <button
                      onClick={() =>
                        dispatch(changeQty({ id: item.id, qty: item.qty + 1 }))
                      }
                      className="text-gray-600 hover:text-sky-600 transition p-2 border rounded-lg"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Price + Checkout + Remove */}
              <div className="flex flex-col items-end mt-4 md:mt-0 gap-2">
                <div className="text-lg font-bold text-gray-900">
                  ₹{(item.price * item.qty).toFixed(2)}
                </div>

                {/* Single Product Checkout */}
                <button
                  onClick={() => handleSingleCheckout(item)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                    token
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <FaShoppingCart /> {token ? "Checkout" : "Login to Checkout"}
                </button>

                {/* Remove Button */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}

          {/* ✅ Total & Checkout All */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-xl mt-6">
            <div className="text-2xl font-bold text-gray-800">
              Total: ₹{total.toFixed(2)}
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button
                onClick={() => dispatch(clearCart())}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-xl font-semibold transition"
              >
                Clear Cart
              </button>

              <button
                onClick={handleFullCheckout}
                className={`px-6 py-2 rounded-xl font-semibold transition flex items-center gap-2 ${
                  token
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {token ? (
                  <>
                    <FaShoppingCart /> Checkout All
                  </>
                ) : (
                  <>
                    <FaLock /> Login to Checkout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
