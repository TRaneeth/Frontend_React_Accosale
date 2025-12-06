import React, { useEffect, useState } from "react";
import { API_URL } from "../data/ApiPath";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const YourAccounts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyPosts = async () => {
    try {
      const token = localStorage.getItem("loginToken");
      const res = await fetch(`${API_URL}/post/my-posts`, {
        headers: { token },
      });

      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    const token = localStorage.getItem("loginToken");
    if (!token) { toast("Please login"); return; }
    const ok = confirm("Are you sure want to delete this post?");
    if (!ok) return;
    const previous = posts;
    setPosts(prev => prev.filter(p => p._id !== postId));
    try {
      const res = await fetch(`${API_URL}/post/${postId}`, {
        method: "DELETE",
        headers: { token }
      });
      const data = await res.json().catch(()=>({}));
      if (!res.ok) {
        setPosts(previous);
        console.error("Delete failed:", data);
        toast(data.message || data.error || "Delete failed");
        return;
      }
      toast.success("deleted")
    } catch (err) {
      setPosts(previous);
      console.error(err);
      toast("Network error. Try again.");
    }
  };

  const editPost = (post) => {
    navigate(`/edit-post/${post._id}`, { state: { post } });
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (loading) return <div className="your-accounts-page"><h2>Loading...</h2></div>;

  return (
    <div className="your-accounts-page" style={{ padding: 20 }}>
      <button className="back-btn" onClick={() => navigate("/")}>←</button>
      <div className="your-accounts-header">
        <h2>Your Accounts</h2>
      </div>

      {posts.length === 0 ? (
        <p className="no-posts">You haven't posted anything yet.</p>
      ) : (
        <div className="accounts-list">
          {posts.map((p) => (
            <div key={p._id} className="account-card" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:12 }}>
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                {p.image && (
                  <img src={`${API_URL}/uploads/${p.image}`} alt="post"
                    style={{
                      width: 160,
                      height: 110,
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: 8
                    }}/>
                )}
                <div className="account-info">
                  <h4 style={{ margin: 0 }}>{p.type}</h4>
                  <p style={{ margin: 0 }}>{p.id}</p>
                  <p style={{ margin: 0 }}>
                    {(p.category && p.category[0]) ? `${p.category[0].replace(/^\w/, c => c.toUpperCase())} - ${p.selectedCategory}` : p.selectedCategory}
                  </p>
                  <p style={{ margin: 0 }}>Price : ₹{p.price}</p>
                  <p style={{ margin: 0 }}>Link : {p.link}</p>
                  <p style={{ margin: 0 }}>{p.info}</p>
                </div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                <button className="editpost" onClick={() => editPost(p)} style={{ padding:'8px 12px' }}>Edit</button>
                <button className="delpost" onClick={() => deletePost(p._1d || p._id)} style={{ padding:'8px 12px', background:'crimson', color:'#fff', border:0, borderRadius:6 }}>
                  Delete post
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourAccounts;
