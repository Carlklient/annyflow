import { NextResponse } from "next/server";
import { SITE } from "@/lib/constants";
import { notifyLeadAlerts, notifyOwner } from "@/lib/notify";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const company = String(body.company || "").trim();
    const interest = String(body.interest || "").trim();
    const message = String(body.message || "").trim();
    const alertsOnly = Boolean(body.alertsOnly);

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const payload = { name, email, company, interest, message };

    // Email already sent from the browser ,  only fire Telegram/Discord
    if (alertsOnly) {
      await notifyLeadAlerts(payload);
      return NextResponse.json({ ok: true, alerts: true });
    }

    const notified = await notifyOwner(payload);

    return NextResponse.json({
      ok: notified.email,
      to: SITE.email,
      emailSent: notified.email,
      provider: notified.provider,
      error: notified.email ? undefined : notified.error,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to process your message. Please try again." },
      { status: 500 },
    );
  }
}
