# AnnyFlow

Premium website for AnnyFlow: business automation, spreadsheet systems, phone systems, and outbound calling infrastructure.

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

## Free SEO setup (no domain required)

1. Deploy on Vercel (free hobby plan).
2. Create a free [Google Search Console](https://search.google.com/search-console) property for `https://annyflow.vercel.app`.
3. Add the HTML tag verification code to `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_code_here
```

4. Submit `https://annyflow.vercel.app/sitemap.xml` in Search Console.
5. Optional free form delivery: create a [Web3Forms](https://web3forms.com) access key and set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.

## Contact and social handles

Public handles are set in `.env.local`:

- Email: `mercyanny2020@gmail.com`
- Telegram: [@siptrunkinng](https://t.me/siptrunkinng)
- Discord username: `cloudof9` (click copies username)
- WhatsApp: set `NEXT_PUBLIC_WHATSAPP` (digits + country code)
- Booking: `NEXT_PUBLIC_BOOKING_URL` (Cal.com free plan works)

## Content routes

- `/` Home
- `/solutions` and `/solutions/[pillar]`
- `/portfolio`
- `/case-studies` and `/case-studies/[slug]`
- `/guides` and `/guides/[slug]`
- `/about`
- `/contact`
- `/llms.txt` and `/ai.txt` for AI crawlers

## Scripts

- `npm run dev` development server
- `npm run build` production build
- `npm start` production server
- `npm run lint` ESLint
