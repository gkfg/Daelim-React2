"use client";

import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function ThemeStatus() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div style={{ display: "inline-block", marginLeft: "10px" }}>
      <button onClick={toggleTheme}>Theme: {theme}</button>
    </div>
  );
}
