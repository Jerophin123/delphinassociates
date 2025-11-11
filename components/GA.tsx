"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const MEASUREMENT_ID = "G-2JT8PG47WJ";

export default function GA() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const url = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`;
    // Send a page_view on route changes (App Router SPA behavior)
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}





