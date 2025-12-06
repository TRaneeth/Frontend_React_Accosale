import React, { useEffect } from "react";
import { FaHome, FaUser, FaPlus, FaInfoCircle, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideDrawer = ({ open, onClose, showAddProductHandler, logoutHandler }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  useEffect(() => {
    if (open) document.body.classList.add("drawer-open");
    else document.body.classList.remove("drawer-open");
  }, [open]);

  const goTo = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <>
      <div className={`sd-backdrop ${open ? "sd-show" : ""}`} onClick={onClose} />

      <aside className={`side-drawer ${open ? "sd-open" : ""}`}>
        <div className="sd-header">
          <div className="sd-title">Accosale Menu</div>
          <button className="sd-close" onClick={onClose}>×</button>
        </div>

        <div className="sd-items">
          <button className="sd-item" onClick={() => goTo("/")}>
            <FaHome /><span>Home</span>
          </button>

          <button className="sd-item" onClick={() => goTo("/profile")}>
            <FaUser /><span>Profile</span>
          </button>

          <button className="sd-item" onClick={() => { onClose(); showAddProductHandler(); }}>
            <FaPlus /><span>Add +</span>
          </button>

          <button className="sd-item" onClick={() => goTo("/aboutus")}>
            <FaInfoCircle /><span>About us</span>
          </button>

          <button className="sd-item" onClick={() => goTo("/help")}>
            <FaQuestionCircle /><span>Help</span>
          </button>
        </div>

        <button className="sd-logout" onClick={() => { onClose(); logoutHandler(); }}>
          <FaSignOutAlt /><span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default SideDrawer;
