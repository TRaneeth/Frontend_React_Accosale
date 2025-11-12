import React, { useState } from "react";
import { API_URL } from "../../data/ApiPath";

const AddProduct = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [type, setType] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  // Handle single category selection (Followers/Subscribers/Level)
  const handleCategoryChange = (value) => {
    setSelectedCategory(selectedCategory === value ? "" : value);
  };

  // Image Upload
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.error("User not authenticated");
        alert("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("type", type);
      formData.append("id", id);

      // backend expects array of lowercase category names
      formData.append(
        "category",
        JSON.stringify([selectedCategory.toLowerCase()])
      );

      // backend expects selectedCategory (required)
      formData.append("selectedCategory", categoryValue);

      formData.append("price", price);
      formData.append("link", link);
      formData.append("image", file);
      formData.append("info", info);

      const response = await fetch(`${API_URL}/post/dopost`, {
        method: "POST",
        headers: {
          token: `${loginToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        alert("Posted successfully");
        setType("")
        setId("")
        setCategoryValue("")
        setSelectedCategory("")
        setPrice("")
        setLink("")
        setFile("")
        setInfo("")
      } else {
        alert(data.message || "Failed to post");
      }
    } catch (error) {
      console.error("Failed to post", error);
      alert("Failed to post");
    }
  };

  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <button type="button" className="close-btn" onClick={onClose}>
          x
        </button>
        <h2>Add an Account</h2>

        <label htmlFor="type">Type</label>
        <input
          type="text"
          id="type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="eg. Instagram, YouTube"
        />

        <label htmlFor="id">ID</label>
        <input
          type="text"
          id="id"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="eg. @alluarjunonline"
        />

        <label>Category</label>
        <div className="checkbox-group">
          {["followers", "subscribers", "level"].map((cat) => (
            <label key={cat}>
              <input
                type="checkbox"
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={() => handleCategoryChange(cat)}
              />
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </label>
          ))}
        </div>

        <label htmlFor="categoryInput">Selected Category</label>
        <input
          type="text"
          id="categoryInput"
          name="selectedCategory"
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
          placeholder={
            selectedCategory
              ? `${selectedCategory} count`
              : "Select Category"
          }
        />

        <label htmlFor="price">Price (₹)</label>
        <input
          type="text"
          id="price"
          name="price"
          value={price}
          placeholder="Enter price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="link">Account Link</label>
        <input
          type="text"
          id="link"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter account link"
        />

        <label htmlFor="file">Upload File</label>
        <input type="file" id="file" name="image" onChange={handleImageUpload} />

        <label className="additional-info">Additional Info</label>
        <textarea
          name="info"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          placeholder="Enter description"
        ></textarea>

        <button type="submit" className="submit-btn">
          Post
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
