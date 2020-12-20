import React from "react";

const Header = ({ children }) => {
  const headerStyles = {
    background: "#15202b",
    borderBottom: "1px solid #38444d",
    height: "5vh",
    zIndex: 4,
    position: "sticky",
    top: 0,
  };

  return <div style={headerStyles}>{children}</div>;
};

export default Header;
