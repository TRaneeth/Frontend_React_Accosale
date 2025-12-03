import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../data/ApiPath";

const EditPost = () => {
  const { id: postId } = useParams(); // actual post _id (URL)
  const location = useLocation();
  const navigate = useNavigate();
  const pre = location.state?.post || null;

  // accountHandle = the "id" field inside post (eg. @username)
  const [type, setType] = useState(pre?.type || "");
  const [accountHandle, setAccountHandle] = useState(pre?.id || ""); // <-- FIXED
  const [selectedCategory, setSelectedCategory] = useState(pre?.category?.[0] || "");
  const [categoryValue, setCategoryValue] = useState(pre?.selectedCategory || "");
  const [price, setPrice] = useState(pre?.price || "");
  const [link, setLink] = useState(pre?.link || "");
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState(pre?.info || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pre) {
      setType(pre.type || "");
      setAccountHandle(pre.id || "");
      setSelectedCategory(pre.category?.[0] || "");
      setCategoryValue(pre.selectedCategory || "");
      setPrice(pre.price || "");
      setLink(pre.link || "");
      setInfo(pre.info || "");
    }
  }, [pre]);

  const handleImageUpload = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("loginToken");
      if (!token) { alert("Please login"); return; }

      const formData = new FormData();
      formData.append("type", type);
      formData.append("id", accountHandle); // send account handle here
      formData.append("category", JSON.stringify([selectedCategory.toLowerCase()]));
      formData.append("selectedCategory", categoryValue);
      formData.append("price", price);
      formData.append("link", link);
      if (file) formData.append("image", file);
      formData.append("info", info);

      setLoading(true);
      const res = await fetch(`${API_URL}/post/${postId}`, {
        method: "PUT",
        headers: { token },
        body: formData
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        alert("Post updated");
        window.dispatchEvent(new Event("refreshChats"));
        navigate("/youraccounts");
      } else {
        alert(data.message || data.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Network error");
    }
  };

  return (
  <div className="edit-post-page">
    <h2 className="edit-post-title">Edit Post</h2>

    <form className="edit-post-form" onSubmit={handleSubmit}>

      <label>Type</label>
      <input value={type} onChange={(e)=>setType(e.target.value)} />

      <label>Account ID / Handle</label>
      <input value={accountHandle} onChange={(e)=>setAccountHandle(e.target.value)} />

      <label>Category</label>
      <select value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)}>
        <option value="">Select</option>
        <option value="followers">Followers</option>
        <option value="subscribers">Subscribers</option>
        <option value="level">Level</option>
      </select>

      <label>Selected Category (count)</label>
      <input value={categoryValue} onChange={(e)=>setCategoryValue(e.target.value)} />

      <label>Price (₹)</label>
      <input value={price} onChange={(e)=>setPrice(e.target.value)} />

      <label>Link</label>
      <input value={link} onChange={(e)=>setLink(e.target.value)} />

      <label>Replace Image (optional)</label>
      <input type="file" onChange={handleImageUpload} />

      <label>Info</label>
      <textarea value={info} onChange={(e)=>setInfo(e.target.value)} />

      <div className="edit-btns">
        <button className="save-btn" type="submit">
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button className="cancel-btn" type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </div>
    </form>
  </div>
);

};

export default EditPost;
