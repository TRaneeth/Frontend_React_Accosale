import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Wishlist = () => {
  const nav = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(list);
  }, []);

  // Remove from wishlist
  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated); // refresh UI
  };

  return (
    <div className="your-accounts-page">

      <div className="your-accounts-header">
        <h2>Wishlist</h2>
        <button className="go-home-btn" onClick={() => nav('/')}>
          Go Home
        </button>
      </div>

      <div className="accounts-list">

        {wishlist.length === 0 ? (
          <p className="no-posts">No items in wishlist.</p>
        ) : (
          wishlist.map((item) => (
            <div className="account-card" key={item._id}>

              {/* Image */}
              <img src={item.image} alt="wishlist" />

              {/* Info Section */}
              <div className="account-info">
                <h4>{item.type}</h4>
                <p>@{item.id}</p>

                <p>
                  {item.category?.[0]} : {item.selectedCategory}
                </p>

                <p>Price: ₹{item.price}</p>

                <p><strong>Link:</strong> {item.link}</p>

                <p><strong>About:</strong> {item.info}</p>

                {/* Remove Button */}
                <button
                  className="delpost"
                  onClick={() => removeItem(item._id)}
                >
                  Remove from wishlist
                </button>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Wishlist;
