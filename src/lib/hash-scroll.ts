/** Smooth-scroll to an element by id, with short retries for late-mounted UI. */
export function scrollToHash(
  id: string,
  options?: { behavior?: ScrollBehavior; retries?: number[] },
) {
  if (!id || typeof document === "undefined") return;

  const behavior = options?.behavior ?? "smooth";
  const retries = options?.retries ?? [0, 100, 280, 560];

  const attempt = (delay: number) => {
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const headerOffset = 88;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, top), behavior });
    }, delay);
  };

  retries.forEach(attempt);
}

export function getLocationHash() {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace(/^#/, "");
}
