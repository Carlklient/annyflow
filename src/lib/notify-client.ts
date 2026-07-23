export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  interest?: string;
  message: string;
};

/** Silent browser → Web3Forms (no page open). Needs NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY. */
export async function sendViaWeb3FormsClient(
  payload: ContactPayload,
): Promise<{ ok: boolean; error?: string }> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    return { ok: false, error: "missing_web3forms_key" };
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `AnnyFlow inquiry from ${payload.name}`,
      from_name: "AnnyFlow Website",
      name: payload.name,
      email: payload.email,
      company: payload.company || "N/A",
      interest: payload.interest || "N/A",
      message: payload.message,
      botcheck: "",
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };

  if (!res.ok || !data.success) {
    return { ok: false, error: data.message || "web3forms_failed" };
  }

  return { ok: true };
}

/** Silent browser → FormSubmit (no page open). May need one email activation. */
export async function sendViaFormSubmitClient(
  payload: ContactPayload,
): Promise<{ ok: boolean }> {
  const to = process.env.NEXT_PUBLIC_EMAIL?.trim() || "mercyanny2020@gmail.com";
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(to)}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      company: payload.company || "N/A",
      interest: payload.interest || "N/A",
      message: payload.message,
      _subject: `AnnyFlow inquiry from ${payload.name}`,
      _template: "table",
      _captcha: "false",
    }),
  });

  if (!res.ok) return { ok: false };
  const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
  const ok = data.success === "true" || data.success === true;
  return { ok };
}
