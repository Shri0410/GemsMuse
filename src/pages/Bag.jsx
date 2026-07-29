import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useCustomerAuth } from "../context/CustomerAuthContext";

const InquiryModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.full_name || "",
    email: initialData?.email || "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-surface-dark w-full max-w-md p-8 rounded-xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-serif">Inquiry Details</h3>
          <button onClick={onClose}>
            <span className="material-icons-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300"
          />

          <input
            type="email"
            required
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300"
          />

          <input
            type="tel"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 uppercase tracking-wider"
          >
            {loading ? "Processing..." : "Proceed to WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Bag = () => {
  const { bagItems, removeFromBag, updateQuantity, getCheckoutUrl } = useShop();

  const { user } = useCustomerAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInquirySubmit = async (contactData) => {
    const whatsappUrl = getCheckoutUrl();
    window.open(whatsappUrl, "_blank");

    setIsModalOpen(false);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: contactData.name,
          customer_email: contactData.email,
          customer_phone: contactData.phone,
          items: bagItems.map((item) => ({
            id: item.id,
            name: item.name,
            sku: item.sku,
            quantity: item.quantity,
          })),
        }),
      });
    } catch (error) {
      console.error("Inquiry save failed:", error);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-serif text-center mb-16">Shopping Bag</h1>

        {bagItems.length > 0 ? (
          <>
            <div className="bg-white dark:bg-surface-dark shadow-xl p-8 space-y-8">
              {bagItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row gap-8 items-center border-b pb-8 last:border-0"
                >
                  <div className="w-32 h-32 bg-gray-100 p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-xl font-serif">{item.name}</h3>
                    <p className="text-xs uppercase text-gray-500">
                      {item.collection || "Fine Jewelry"}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4 border px-4 py-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromBag(item.id)}
                      className="text-xs uppercase text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-primary text-white py-5 uppercase tracking-widest"
              >
                Proceed to Inquire
              </button>
            </div>

            <div className="text-center mt-10">
              <Link
                to="/collection"
                className="text-primary uppercase text-xs tracking-widest"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed">
            <h2 className="text-2xl font-serif mb-4">Your bag is empty</h2>
            <Link
              to="/collection"
              className="bg-primary text-white px-10 py-4 uppercase text-xs tracking-widest"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleInquirySubmit}
        initialData={user}
      />
    </div>
  );
};

export default Bag;
