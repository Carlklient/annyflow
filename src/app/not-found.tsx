import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 pt-20 text-center">
      <LogoMark size={56} />
      <p className="mt-6 font-display text-sm font-semibold tracking-wide text-primary uppercase">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-dark sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Go home</Button>
        <Button href="/contact" variant="secondary">
          Contact us
        </Button>
      </div>
      <Link href="/solutions" className="mt-6 text-sm text-muted transition-colors hover:text-primary">
        Or browse solutions →
      </Link>
    </div>
  );
}
