"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CheckCircle2, MapPin, Send, Loader2, Mail, Calendar, MessageCircle } from "lucide-react";
import { FAQ_ITEMS } from "@/data/content";
import { CONTACT_CHANNELS, SITE } from "@/lib/constants";
import {
  sendViaFormSubmitClient,
  sendViaWeb3FormsClient,
} from "@/lib/notify-client";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactPills } from "@/components/ui/ContactPills";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-text transition-all placeholder:text-muted/70 focus:border-primary/50 focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-primary/15";

const hasWeb3FormsKey = Boolean(
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim(),
);

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      interest: String(data.get("interest") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError("Please fill in your name, email, and message.");
      setSending(false);
      return;
    }

    let delivered = false;

    // 1) Silent Web3Forms (browser) — no page open
    try {
      const w3 = await sendViaWeb3FormsClient(payload);
      if (w3.ok) delivered = true;
    } catch {
      /* continue */
    }

    // 2) Silent FormSubmit (browser)
    if (!delivered) {
      try {
        const fs = await sendViaFormSubmitClient(payload);
        if (fs.ok) delivered = true;
      } catch {
        /* continue */
      }
    }

    // 3) Server API (Resend / Web3Forms)
    if (!delivered) {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = (await res.json()) as { ok?: boolean; emailSent?: boolean };
        if (res.ok && (json.ok || json.emailSent)) delivered = true;
      } catch {
        /* continue */
      }
    }

    setSending(false);

    if (!delivered) {
      setError(
        hasWeb3FormsKey
          ? "Could not deliver automatically. Please try again in a moment."
          : "Auto-send is not set up yet. Add a free Web3Forms access key (see setup note), then messages send silently with no pages opening.",
      );
      return;
    }

    // Fire Telegram/Discord alerts even when email was sent from the browser
    void fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, alertsOnly: true }),
    }).catch(() => undefined);

    setSubmitted(true);
    form.reset();
  };

  const whatsapp = CONTACT_CHANNELS.find((c) => c.id === "whatsapp");
  const bookingUrl = SITE.bookingUrl;

  return (
    <div className="pt-24 pb-24 sm:pt-28 sm:pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build your next system"
          description="Share a bit about your stack and goals—we'll respond with a clear next step."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <FadeIn className="lg:col-span-3">
            <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-soft sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <CheckCircle2 className="size-12 text-primary" />
                  <h2 className="mt-4 font-display text-2xl font-semibold text-dark">
                    Message sent — here&apos;s what happens next
                  </h2>
                  <ol className="mt-4 max-w-md space-y-2 text-left text-sm text-muted">
                    <li>
                      <span className="font-medium text-dark">1.</span> We review your note
                      (usually within one business day).
                    </li>
                    <li>
                      <span className="font-medium text-dark">2.</span> Prefer a call now? Book a
                      free discovery slot below.
                    </li>
                    <li>
                      <span className="font-medium text-dark">3.</span> Or chat us instantly on
                      WhatsApp.
                    </li>
                  </ol>

                  <div className="mt-6 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-dark">
                    <Mail className="size-4 text-primary" />
                    <span>Delivered to {SITE.email}</span>
                  </div>

                  <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
                    {bookingUrl ? (
                      <Button href={bookingUrl} external size="lg" className="w-full sm:w-auto">
                        <Calendar className="size-4" />
                        Book a free call
                      </Button>
                    ) : null}
                    {whatsapp ? (
                      <Button
                        href={whatsapp.href}
                        external
                        variant={bookingUrl ? "secondary" : "primary"}
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        <MessageCircle className="size-4" />
                        Chat on WhatsApp
                      </Button>
                    ) : null}
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" id="name" required>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className={fieldClass}
                        placeholder="Alex Morgan"
                      />
                    </Field>
                    <Field label="Email" id="email" required>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={fieldClass}
                        placeholder="alex@company.com"
                      />
                    </Field>
                  </div>
                  <Field label="Company" id="company">
                    <input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      className={fieldClass}
                      placeholder="Acme Inc."
                    />
                  </Field>
                  <Field label="Interest" id="interest" required>
                    <select
                      id="interest"
                      name="interest"
                      className={fieldClass}
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select a focus area
                      </option>
                      <option value="automation">Business Automation</option>
                      <option value="phone">Business Phone Systems</option>
                      <option value="outbound">Outbound Calling Infrastructure</option>
                      <option value="other">Something else</option>
                    </select>
                  </Field>
                  <Field label="Message" id="message" required>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className={`${fieldClass} resize-y`}
                      placeholder="Tell us about your current tools and what you want to improve..."
                    />
                  </Field>

                  {error && (
                    <p
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full min-h-12 sm:w-auto"
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="size-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-6 lg:col-span-2">
            <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-soft sm:p-7">
              <h2 className="font-display text-lg font-semibold text-dark">
                Direct channels
              </h2>
              <p className="mt-2 text-sm text-muted">
                Prefer chat? Reach AnnyBest on any of these.
              </p>
              <ContactPills className="mt-5" />
              {bookingUrl ? (
                <Button href={bookingUrl} external className="mt-5 w-full" variant="secondary">
                  <Calendar className="size-4" />
                  Book a free discovery call
                </Button>
              ) : null}
              <a
                href={`mailto:${SITE.email}`}
                className="mt-5 inline-block text-sm font-medium text-primary transition-colors hover:underline"
              >
                {SITE.email}
              </a>
              {SITE.phoneDisplay ? (
                <a
                  href={`tel:+${SITE.whatsappNumber}`}
                  className="mt-2 block text-sm text-muted transition-colors hover:text-primary"
                >
                  {SITE.phoneDisplay}
                </a>
              ) : null}
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-soft">
              <div className="relative bg-gradient-to-br from-background via-white to-primary/10 p-6 sm:p-7">
                <div className="absolute inset-0 opacity-40" aria-hidden>
                  <svg className="h-full w-full">
                    <defs>
                      <pattern
                        id="grid"
                        width="32"
                        height="32"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M32 0H0V32"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Calendar className="size-6" />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold text-dark">
                    Book a discovery call
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Remote-first with clients worldwide. Pick a 30-minute slot and
                    we&apos;ll map your automation or calling stack.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-dark">
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>Online meetings · on-site by request</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>Usually replies within 1 business day</span>
                    </li>
                  </ul>
                  {bookingUrl ? (
                    <Button href={bookingUrl} external className="mt-5 w-full">
                      <Calendar className="size-4" />
                      Choose a time
                    </Button>
                  ) : (
                    <Button href="/contact" className="mt-5 w-full">
                      Send a message first
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {CONTACT_CHANNELS.length > 0 && (
              <div className="rounded-[1.75rem] border border-border bg-dark p-6 text-white shadow-soft sm:p-7">
                <h2 className="font-display text-lg font-semibold">Prefer a quick chat?</h2>
                <p className="mt-2 text-sm text-white/60">
                  Message {SITE.founder} directly on your preferred channel.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  {CONTACT_CHANNELS.map((c) =>
                    c.copyValue ? (
                      <button
                        key={c.id}
                        type="button"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(c.copyValue!);
                          } catch {
                            /* ignore */
                          }
                          window.open(
                            "https://discord.com/app",
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/10"
                      >
                        Discord · {c.copyValue}
                      </button>
                    ) : (
                      <a
                        key={c.id}
                        href={c.href}
                        target={c.id === "email" ? undefined : "_blank"}
                        rel={c.id === "email" ? undefined : "noopener noreferrer"}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/10"
                      >
                        {c.label}
                        {c.id === "telegram" ? ` · @${SITE.telegram}` : ""}
                        {c.id === "email" ? ` · ${SITE.email}` : ""}
                      </a>
                    )
                  )}
                </div>
              </div>
            )}
          </FadeIn>
        </div>

        <div className="mx-auto mt-24 max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            description="Quick answers about how we work and what to expect."
          />
          <div className="mt-10 space-y-3">
            {FAQ_ITEMS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-ring"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    <span className="font-medium text-dark">{item.question}</span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-muted transition-transform duration-300",
                        open && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-1.5 block text-sm font-medium text-dark">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {children}
    </label>
  );
}
