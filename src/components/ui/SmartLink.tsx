"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentProps, type MouseEvent } from "react";
import { scrollToHash } from "@/lib/hash-scroll";

type SmartLinkProps = ComponentProps<typeof Link>;

export function SmartLink({ href, onClick, ...props }: SmartLinkProps) {
  const pathname = usePathname();
  const hrefString = typeof href === "string" ? href : "";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !hrefString.includes("#")) return;

    const [pathPart, hashPart] = hrefString.split("#");
    const targetPath = pathPart === "" ? pathname : pathPart;
    if (!hashPart) return;

    // Same-page hash: scroll without fighting App Router
    if (targetPath === pathname) {
      e.preventDefault();
      window.history.pushState(null, "", `#${hashPart}`);
      scrollToHash(hashPart);
      return;
    }

    // Cross-page hash: navigation + ScrollToTop will handle; light assist retries
    window.setTimeout(() => scrollToHash(hashPart), 150);
    window.setTimeout(() => scrollToHash(hashPart), 450);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
