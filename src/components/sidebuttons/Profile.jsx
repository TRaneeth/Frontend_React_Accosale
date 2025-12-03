import React, { useEffect, useState } from "react";
import { API_URL } from "../../data/ApiPath";
import { useNavigate } from "react-router-dom";
import YourAccounts from "../YourAccounts";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("loginToken");
  const userId = localStorage.getItem("userId");

  const loadUser = async () => {
    try {
      setLoadingProfile(true);
      if (!userId || !token) {
        setUser(null);
        setLoadingProfile(false);
        return;
      }
      const res = await fetch(`${API_URL}/user/single-user/${userId}`, {
        headers: { token }
      });
      if (!res.ok) {
        setUser(null);
        setLoadingProfile(false);
        return;
      }
      const data = await res.json();
      setUser(data.user);
      setUsername(data.user.username || "");
      setEmail(data.user.email || "");
    } catch (err) {
      console.error("loadUser err", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    loadUser();
    const onLogin = () => loadUser();
    window.addEventListener("userLoggedIn", onLogin);
    window.addEventListener("refreshProfile", onLogin);
    return () => {
      window.removeEventListener("userLoggedIn", onLogin);
      window.removeEventListener("refreshProfile", onLogin);
    };
    // eslint-disable-next-line
  }, []);

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    try {
      if (!token) { alert("Please login"); return; }
      const form = new FormData();
      form.append("username", username);
      form.append("email", email);
      if (avatarFile) form.append("avatar", avatarFile);

      const res = await fetch(`${API_URL}/user/update-profile`, {
        method: "POST",
        headers: { token },
        body: form
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated");
        setEditing(false);
        await loadUser();
        window.dispatchEvent(new Event("userLoggedIn"));
      } else {
        alert(data.error || data.message || "Update failed");
      }
    } catch (err) {
      console.error("submitProfile err", err);
      alert("Network error");
    }
  };

  const changePassword = async () => {
    const currentPassword = prompt("Enter current password");
    if (!currentPassword) return;
    const newPassword = prompt("Enter new password");
    if (!newPassword) return;
    try {
      const res = await fetch(`${API_URL}/user/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (res.ok) alert("Password changed");
      else alert(data.error || data.message || "Failed");
    } catch (err) {
      console.error("changePassword err", err);
      alert("Network error");
    }
  };

  const deleteAccount = async () => {
    if (!confirm("Delete account permanently? This will remove your posts.")) return;
    try {
      const res = await fetch(`${API_URL}/user/delete-account`, {
        method: "DELETE",
        headers: { token }
      });
      if (res.ok) {
        alert("Account deleted");
        localStorage.removeItem("loginToken");
        localStorage.removeItem("userId");
        navigate("/");
        window.location.reload();
      } else {
        const d = await res.json().catch(()=>({}));
        alert(d.error || d.message || "Delete failed");
      }
    } catch (err) {
      console.error("deleteAccount err", err);
      alert("Network error");
    }
  };

  if (loadingProfile) return <div style={{ padding: 20, color: "#fff" }}>Loading profile...</div>;

  if (!user) return (
    <div style={{ padding: 20, color: "#fff" }}>
      <h2>You are not logged in</h2>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          className="profile-avatar"
          src={user.avatar ? `${API_URL}/uploads/${user.avatar}` : "/mnt/data/carddddd.jpg"}
          alt="avatar"
        />

        <div className="profile-info" style={{ flex: 1 }}>
          {!editing ? (
            <>
              <h2>{user.username}</h2>
              <p>{user.email}</p>

              <div className="profile-actions" style={{ marginTop: 10 }}>
                <button onClick={() => setEditing(true)}>Edit Profile</button>
                <button onClick={changePassword}>Change Password</button>
                <button className="delete-btn" onClick={deleteAccount}>Delete Account</button>
              </div>
            </>
          ) : (
            <form className="profile-edit-form" onSubmit={submitProfile}>
              <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" />
              <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
              <div className="profile-edit-buttons" style={{ marginTop: 6 }}>
                <button className="save-btn" type="submit">Save</button>
                <button className="cancel-btn" type="button" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>

        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, opacity: 0.8 }}>Joined</p>
          <strong>{new Date(user.createdAt).toDateString()}</strong>
          <p style={{ marginTop: 8 }}>{user.post?.length || 0} posts</p>
        </div>
      </div>

      <hr className="profile-divider" />

      <h3 className="profile-subtitle">Your Accounts</h3>
      <YourAccounts />
    </div>
  );
};

export default Profile;
