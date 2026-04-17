"use client";

import { useEffect } from "react";

export default function FrontendSecurity() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Block Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element Inspect)
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")
      ) {
        e.preventDefault();
        return false;
      }

      // Block Ctrl+U (Windows) or Cmd+Option+U (Mac) (View Source)
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "U" || e.key === "u")
      ) {
        e.preventDefault();
        return false;
      }

      // Block Mac DevTools shortcuts (Cmd+Option+I / Cmd+Option+J / Cmd+Option+C)
      if (
        e.metaKey &&
        e.altKey &&
        (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Attach listener for Keyboard DevTools shortcuts only.
    // We intentionally leave standard Left/Right click active so ZERO user functionality is compromised.
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
