import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { handleSuccess } from "../utils";


const Navbar = ({ brand = "MyShop", links = [], userName, onLogout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const effectiveUserName = userName ?? localStorage.getItem("name") ?? "";
  const avatarUrl = localStorage.getItem("avatarUrl") || "";
  const initials = effectiveUserName
    .split(" ")
    .filter(Boolean)
    .map((s) => s[0]?.toUpperCase())
    .slice(0, 2)
    .join("") || "U";

  const defaultLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    handleSuccess("Logout Successful");
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 200);
  };

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
      return;
    }
    defaultLogout();
  };

  const white = "#ffffff";
  const whiteMuted = "rgba(255,255,255,0.86)";
  const borderWhite = "rgba(255,255,255,0.35)";

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, width: "100%" }}>
      <div style={{ background: "linear-gradient(90deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
        {/* Full-width nav; brand flush left, actions flush right */}
        <nav style={{ width: "100%", padding: "10px 0", display: "flex", alignItems: "center" }}>
          {/* Brand - flush left */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {typeof brand === "string" ? (
              <Link to={links[0]?.to || "/"} style={{ textDecoration: "none", color: white, fontWeight: 800, fontSize: 20, letterSpacing: 0.3 }}>
                {brand}
              </Link>
            ) : (
              brand
            )}
          </div>

          {/* Middle: Centered Nav Links */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <ul style={{ display: "flex", alignItems: "center", gap: 22, listStyle: "none", margin: 0, padding: 0 }}>
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      color: isActive ? white : whiteMuted,
                      fontWeight: isActive ? 700 : 500,
                      padding: "6px 10px",
                      borderRadius: 8,
                      background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                      transition: "background 120ms ease, color 120ms ease"
                    })}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Greeting, Avatar, Visible Logout - flush right */}
          <div ref={menuRef} style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto", paddingRight: 0 }}>
            <span style={{ color: whiteMuted }}>{effectiveUserName ? `Hi, ${effectiveUserName}` : ""}</span>
            <div title={effectiveUserName || "User"} style={{
              height: 36,
              width: 36,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.22)",
              color: white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              border: `1px solid ${borderWhite}`,
              overflow: "hidden"
            }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 14px",
                background: "transparent",
                color: white,
                border: `1px solid ${borderWhite}`,
                borderRadius: 999,
                cursor: "pointer",
                outline: "none"
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
