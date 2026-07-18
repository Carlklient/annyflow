# AnnyFlow

Premium enterprise website for AnnyFlow — Business Automation, Business Phone Systems, and Outbound Calling Infrastructure.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide Icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact & social handles

Public handles are set in `.env.local`:

- Email: `mercyanny2020@gmail.com`
- Telegram: [@siptrunkinng](https://t.me/siptrunkinng)
- Discord username: `cloudof9` (click copies username)
- WhatsApp: set `NEXT_PUBLIC_WHATSAPP` (digits + country code)

### Form notifications

Contact form submissions are delivered **by email only** to `NEXT_PUBLIC_EMAIL`
(via FormSubmit). Confirm the first activation email once, then restart isn’t needed
for that step.

Social pills (Telegram / Discord / WhatsApp) remain for direct chat — they are not
used for form delivery.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm start` — production server
- `npm run lint` — ESLint
