"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocationHash, scrollToHash } from "@/lib/hash-scroll";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = getLocationHash();

    if (hash) {
      scrollToHash(hash);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = getLocationHash();
      if (hash) scrollToHash(hash);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
