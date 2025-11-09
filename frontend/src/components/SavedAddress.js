import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addAddress,
  removeAddress,
  updateAddress,
  setDefaultAddress,
} from "../store/slices/addressSlice";

export default function SavedAddress() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const userId = user?.id || "guest";
  const allAddresses = useSelector((state) => state.address.addresses || {});
  const defaultAddress = useSelector((state) => state.address.defaultAddress || {});
  const userAddresses = allAddresses[userId] || [];

  // Local states
  const [selectedIndex, setSelectedIndex] = useState(
    userAddresses.findIndex(
      (addr) =>
        JSON.stringify(addr) ===
        JSON.stringify(defaultAddress[userId] || {})
    )
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    housename: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      housename: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    });
    setIsEditing(false);
    setEditIndex(null);
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update address
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.housename ||
      !form.street ||
      !form.city ||
      !form.state ||
      !form.pincode
    )
      return;

    if (isEditing) {
      dispatch(updateAddress({ userId, index: editIndex, newAddress: form }));
    } else {
      dispatch(addAddress({ userId, address: form }));
    }

    resetForm();
    setShowForm(false);
  };

  // Edit existing address
  const handleEdit = (index) => {
    setForm(userAddresses[index]);
    setEditIndex(index);
    setIsEditing(true);
    setShowForm(true);
  };

  // Remove address
  const handleRemove = (index) => {
    dispatch(removeAddress({ userId, index }));
    if (selectedIndex === index) {
      setSelectedIndex(null);
    }
  };

  // Select one address only
  const handleSelectAddress = (index) => {
    setSelectedIndex(index);
    dispatch(setDefaultAddress({ userId, index }));
  };

  // If no user logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700">
        <h2 className="text-xl font-semibold mb-4">
          Please log in to view your saved addresses.
        </h2>
        <a
          href="/login"
          className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition"
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex flex-col lg:flex-row items-start justify-center py-10 px-6 gap-8">
      {/* LEFT SIDE — Address List */}
      <div className="w-full lg:w-1/2 bg-white shadow-2xl rounded-3xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Saved Addresses
        </h2>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition shadow-md"
          >
            Add New Address
          </button>
        </div>

        {userAddresses.length === 0 ? (
          <p className="text-center text-gray-500">No addresses saved yet.</p>
        ) : (
          <div className="grid gap-4">
            {userAddresses.map((addr, index) => (
              <div
                key={index}
                className={`border rounded-xl p-4 shadow transition relative cursor-pointer ${
                  selectedIndex === index
                    ? "border-sky-500 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-gray-50 hover:shadow-md"
                }`}
                onClick={() => handleSelectAddress(index)}
              >
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(index);
                    }}
                    className="text-blue-500 hover:text-blue-700 text-m font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(index);
                    }}
                    className="text-red-500 hover:text-red-700 text-m font-semibold"
                  >
                    Delete
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  {addr.name}
                </h3>
                <p className="text-gray-600 text-sm">{addr.phone}</p>
                <p className="text-gray-600 text-sm">{addr.housename}</p>
                <p className="text-gray-600 text-sm">{addr.street}</p>
                {addr.landmark && (
                  <p className="text-gray-600 text-sm">{addr.landmark}</p>
                )}
                <p className="text-gray-600 text-sm">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDE — Add/Edit Form */}
      <div
        className={`w-full lg:w-1/2 bg-white shadow-2xl rounded-3xl border border-gray-200 transform transition-all duration-500 p-8 ${
          showForm
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-20 pointer-events-none"
        }`}
      >
        {showForm ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {isEditing ? "Edit Address" : "Add New Address"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                "name",
                "phone",
                "housename",
                "street",
                "landmark",
                "city",
                "state",
                "pincode",
              ].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition text-gray-700"
                  required={field !== "landmark"}
                />
              ))}
              <div className="col-span-1 md:col-span-2 flex justify-center gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-sky-500 text-white px-8 py-2 rounded-lg hover:bg-sky-600 transition shadow-md"
                >
                  {isEditing ? "Update Address" : "Save Address"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="bg-gray-300 text-gray-800 px-8 py-2 rounded-lg hover:bg-gray-400 transition shadow-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 italic">
            Click “Add New Address” or “Edit” to manage addresses
          </div>
        )}
      </div>
    </div>
  );
}
