# Lead Intake

An internal lead capture form for a personal injury law firm's answering agents. Used while on a call with a caller to log case type, contact details, accident information, and injured people in one place.

## Stack

- Next.js (App Router) with TypeScript
- Tailwind CSS v4
- Lucide for icons
- Cloudflare Turnstile for bot protection

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

- `src/app` — root layout, metadata, and the single page
- `src/components` — the form itself (`LeadForm.tsx`) and shared pieces under `ui/` (fields, section cards, the phone input, the mobile dropdown, Turnstile)
- `src/lib` — form data types, the US state list, and the mapping from case type to section title

## Things to know

- There is no backend yet. Submitting the form just shows a confirmation screen — nothing is emailed or saved anywhere yet.
- Cloudflare Turnstile is currently wired up with Cloudflare's public test key (`1x00000000000000000000AA`), which always passes and shows a "for testing only" notice. Swap in the real site key from the Cloudflare dashboard once one exists for the deployed domain.
- On mobile, the dropdown fields (case type, attorney, phone country code, mailing state, accident time) use a custom dropdown instead of the phone's native one, since iOS Safari can render native dropdowns in the wrong position. Desktop and tablet still use the native dropdown.
