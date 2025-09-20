import React from "react";

/**
 * Navbar component
 * Props:
 *  - logoUrl (string) : url of left-side logo
 *  - title (string)   : app title (default "KitPush")
 *  - streak (number)  : streak count to show inside thunder icon (optional)
 *  - username (string): username to display on right
 *  - avatarUrl (string): profile image url
 */
const Navbar = ({
  logoUrl = "https://via.placeholder.com/40", // replace with your logo
  title = "KitPush",
  streak = null,
  username = "User",
  avatarUrl = "https://via.placeholder.com/40",
}) => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    padding: "0 16px",
    borderBottom: "1px solid #e6e6e6",
    background: "#A7EBF2",
    boxSizing: "border-box",
  };

  const leftStyle = {
    display: "flex",
    alignItems: "center",
    gap: 12,
  };

  const logoStyle = {
    width: 40,
    height: 40,
    objectFit: "cover",
    borderRadius: 6,
  };

  const centerStyle = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: 10,
    pointerEvents: "none", // so clicks go to left/right normally
  };

  const titleStyle = {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 0.2,
    margin: 0,
  };

  const rightStyle = {
    display: "flex",
    alignItems: "center",
    gap: 12,
  };

  const avatarStyle = {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #eee",
  };

  const usernameStyle = {
    fontSize: 14,
    fontWeight: 600,
  };

  const thunderContainer = {
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#ffecb3",
    borderRadius: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    pointerEvents: "auto",
  };

  return (
    <header style={containerStyle}>
      {/* LEFT: logo */}
      <div style={leftStyle}>
        <img src={logoUrl} alt="logo" style={logoStyle} />
      </div>

      {/* CENTER: title + thunder (streak) icon */}
      <div style={centerStyle} aria-hidden>
        <h1 style={titleStyle}>{title}</h1>

        {/* Thunder / streak icon box */}
        <div style={thunderContainer} title={streak !== null ? `Streak: ${streak}` : "Streak"}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
            aria-hidden
          >
            <path
              d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
              fill="#ffb300"
            />
          </svg>
        </div>

        {/* optional small streak number badge */}
        {streak !== null && (
          <div
            style={{
              marginLeft: 6,
              fontSize: 12,
              fontWeight: 700,
              color: "#ff8f00",
              pointerEvents: "none",
            }}
          >
            {streak}
          </div>
        )}
      </div>

      {/* RIGHT: username + avatar */}
      <div style={rightStyle}>
        <div style={{ textAlign: "right", marginRight: 4 }}>
          <div style={usernameStyle}>{username}</div>
          <div style={{ fontSize: 12, color: "#666" }}>View profile</div>
        </div>

        <img src={avatarUrl} alt={`${username} avatar`} style={avatarStyle} />
      </div>
    </header>
  );
};

export default Navbar;
